import type {IGameParams, IPublicationParams} from "./request-interfaces.ts";
import type {UrlParams} from "./request-types.ts";

export default class Api {

    private static baseUrl = 'http://localhost:8080';

    private static async makeRequest(url: string) {
        console.log(`Request: ${url}`);
        return fetch(url).then(async response => this.handleResponse(response));
    }

    private static async handleResponse(response: Response) {
        const status = response.status;
        if (status === 200 || status === 404) {
            console.log(`Response status: ${status}`);
            return await response.json();
        } else {
            console.log(`Response status: ${status}, message: ${await response.text()}`);
            throw new Error(`Response ${status} received`);
        }
    }

    private static buildUrlParams(params: UrlParams) : string {
        return Object.entries(params).map(param => `${param[0]}=${param[1]}`).join('&');
    }

    public static async getAllPublications(page: number, size: number) {
        return await fetch(`${this.baseUrl}/publication/all?page=${page}&size=${size}`);
    }

    public static async getAllGames(page: number, size: number) {
        return await fetch(`${this.baseUrl}/game/all?page=${page}&size=${size}`);
    }

    public static async getPublicationsByParams(params: IPublicationParams) {
        const urlParams = this.buildUrlParams(params);
        const subStr = urlParams === '' ? '' : `?${urlParams}`;
        console.log(`getPublicationsByParams:  ${subStr}`);
        return await fetch(`${this.baseUrl}/publication${subStr}`);
    }

    public static async getGamesByParams(params: IGameParams) {
        const urlParams = this.buildUrlParams(params);
        const subStr = urlParams === '' ? '' : `?${urlParams}`;
        return await this.makeRequest(`${this.baseUrl}/game${subStr}`);
    }
}