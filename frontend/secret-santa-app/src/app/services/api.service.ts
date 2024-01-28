export class APIService {
    
    api = "https://verve-secret-santa.herokuapp.com/api/"
    root: string;

    constructor(root: string) {
        this.root = root
    }

    buildUrl(path: string | null) {
        if (path) {
            return this.api + this.root + '/' + path;
        } else {
            return this.api + this.root;
        }
    }

    handleResponse(response: any) {
        if (response.status >= 300) {
            return { json: null, status: response.status};
        }
        return response.json();
    }

    async get(path: string) {
        let options = {
            method: 'GET'
        }
        return fetch(this.buildUrl(path), options).then(this.handleResponse)
    }

    async post(path: string | null, data: any) {
        let options = {
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json'},
            method: 'POST'
        }
        return fetch(this.buildUrl(path), options).then(this.handleResponse)
    }

    async put(path: string, data: any) {
        let options = {
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json'},
            method: 'PUT'
        }
        return fetch(this.buildUrl(path), options).then(this.handleResponse)
    }
}