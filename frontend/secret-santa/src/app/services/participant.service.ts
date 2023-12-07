import { APIService } from './api.service';

export default class ParticipantService {

    apiService = new APIService('participants');
   
    async get(id: string) {
        return this.apiService.get(id);
    }

    async createParticipants(id: string, participants: any) {
        return Promise.all(participants.map((participant: any) => this.apiService.post('', participant)));
    }

    async updateParticipant(id: string, participant: any) {
        return this.apiService.put(id, participant);
    }
}