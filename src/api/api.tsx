import type {IPublicationParams} from "./request-interfaces.ts";
import type {UrlParams} from "./request-types.ts";

export default class Api {

    private static baseUrl = 'http://localhost:8080';

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
        return await fetch(`${this.baseUrl}/publication${subStr}`);
    }
}