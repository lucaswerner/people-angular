export default class Config {

    private _host: string;

    constructor() {
        this._host = 'http://localhost:8080';
    }

    get host(): string {
        return this._host;
    }
}
