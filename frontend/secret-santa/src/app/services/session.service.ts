import { APIService } from './api.service';

export default class SessionService {

    apiService = new APIService('sessions');

    async createSession(name: string) {
        return this.apiService.post(null, {name, passphrase: ''});
    }

    async getSession(id: string) {
        return this.apiService.get(id);
    }

    async sendInvitations(id: string) {
        return this.apiService.post(id + '/launch', {});
    }

    async scramble(id: string) {
        return this.apiService.post(id + '/scramble', {});
    }
}