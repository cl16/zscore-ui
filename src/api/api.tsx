
export default class Api {

    private static baseUrl = 'http://localhost:8080';

    public static async getAllPublications(page: number, size: number) {
        return await fetch(`${this.baseUrl}/publication/all?page=${page}&size=${size}`);
    }

    public static async getAllGames(page: number, size: number) {
        return await fetch(`${this.baseUrl}/game/all?page=${page}&size=${size}`);
    }
}