package com.santa

import cats.effect._
import cats.implicits._
import com.santa.database.Database
import com.santa.matches.controllers.MatchesController
import com.santa.participants.controllers.ParticipantsController
import com.santa.sessions.controllers.SessionsController
import com.santa.config.config.Config
import com.santa.emails.EmailsService
import com.santa.matches.repositories.PostgresMatchesRepository
import com.santa.matches.services.MatchesServiceImpl
import com.santa.participants.repositories.PostgresParticipantsRepository
import com.santa.participants.services.ParticipantsServiceImpl
import com.santa.sessions.repositories.PostgresSessionsRepository
import com.santa.sessions.services.SessionsServiceImpl
import doobie.hikari.HikariTransactor
import doobie.util.ExecutionContexts
import org.http4s._
import org.http4s.client.Client
import org.http4s.client.blaze.BlazeClientBuilder
import org.http4s.implicits._
import org.http4s.server._
import org.http4s.server.blaze.BlazeServerBuilder
import org.http4s.server.middleware.CORS.DefaultCORSConfig
import org.http4s.server.middleware.{CORS, CORSConfig}

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.duration.DurationInt

object App extends IOApp {

  override def run(args: List[String]): IO[ExitCode] = {
    create()
  }

  def allRoutes(sessionsController: SessionsController, participantsController: ParticipantsController, matchesController: MatchesController): HttpRoutes[IO] = {
    sessionsController.sessionRoutes <+> participantsController.participantRoutes <+> matchesController.matchRoutes
  }

  def create(configFile: String = "application.conf"): IO[ExitCode] = {
    resources(configFile).use(create)
  }

  private def resources(configFile: String): Resource[IO, Resources] = {
    for {
      config <- Config.load(configFile)
      ec <- ExecutionContexts.fixedThreadPool[IO](config.database.threadPoolSize)
      transactor <- Database.transactor(config.database, ec)
      httpClient <- BlazeClientBuilder[IO](global).resource
    } yield Resources(transactor, config, httpClient)
  }

  private def create(resources: Resources): IO[ExitCode] = {

    for {
      _ <- Database.initialize(resources.transactor)
      matchesRepository = new PostgresMatchesRepository(resources.transactor)
      matchesService = new MatchesServiceImpl(matchesRepository)
      matchesController = new MatchesController(matchesService)
      participantsRepository = new PostgresParticipantsRepository(resources.transactor)
      participantsService = new ParticipantsServiceImpl(participantsRepository)
      participantsController = new ParticipantsController(participantsService)
      sessionsRepository = new PostgresSessionsRepository(resources.transactor)
      sessionsService = new SessionsServiceImpl(
        resources.config.mail,
        sessionsRepository,
        participantsService,
        matchesService,
        new EmailsService(resources.config.mail, resources.httpClient)
      )
      sessionsController = new SessionsController(sessionsService)
      apis = CORS(Router(
        "/api" -> allRoutes(sessionsController, participantsController, matchesController),
      ).orNotFound, DefaultCORSConfig.copy(
        anyOrigin = false,
        allowedOrigins = Set("https://shush-santa.ch")
      ))
      exitCode <- BlazeServerBuilder[IO](runtime.compute)
        .bindHttp(resources.config.server.port, resources.config.server.host)
        .withHttpApp(apis)
        .resource
        .use(_ => IO.never)
        .as(ExitCode.Success)
    } yield exitCode
  }

  case class Resources(transactor: HikariTransactor[IO], config: Config, httpClient: Client[IO])
}
