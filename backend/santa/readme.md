# Scala microservice backend

### Deployment:
- deployed on heroku using builpacks:   
    - https://github.com/timanovsky/subdir-heroku-buildpack  
    - heroku/scala
- ~~deployment happens automatically on pushing to the repository~~ deployment happens on manual trigger from heroku

**subdir-heroku-buildpack** needed because of the project repo being a monorepo and we need to deploy from a subdirectory. Requires setting the *PROJECT_PATH* 

### Running the project locally

Run postgres db instance locally and connect to it via this url:
- postgresql://postgres:dev-pwd@localhost/postgres?statusColor=686B6F&env=local&name=dev-secret-santa&tLSMode=0&usePrivateKey=false&safeModeLevel=0&advancedSafeModeLevel=0&driverVersion=0&lazyload=false



## Backend API:

### Sessions
- GET: /api/sessions/<session_id> - get session by id
- POST: /api/sessions - create session  
body: 
```
  {
    name: String,
    passphrase: String
  }
```
- PUT: /api/sessions/<session_id> - update session  
body: - all fields are optional
```
  {
    name: String,
    sessionScrambled: Boolean,
    emailsSent: Boolean
  }
```
- POST: /api/sessions/<session_id>/scramble - scramble a session (generates the matches between participants) 


### Participants
- GET: /api/participants/session/<session_id> - get all participants in a session
- GET: /api/participants/<participant_id> - get participant
- POST: /api/participants - create participant  
body: - participates and comment fields are optional
```
  {
    sessionId: String,
    firstName: String,
    lastName: String,
    email: String,
    participates: Boolean,
    comment: String
  }
```
- PUT: /api/participants/<participant_id> - update participant  
body: - all fields are optional
```
  {
    firstName: String,
    lastName: String,
    email: String,
    participates: Boolean,
    comment: String
  }
```

### Matches
- GET: /api/matches/session/<session_id> - get all matches in a session
- GET: /api/matches/<match_id> - get match  
