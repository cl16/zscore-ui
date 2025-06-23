import type {IPublication} from "./publication.ts";
import type {IGame} from "./game.ts";

export interface IStatReview {
    'id': {
        'gameId': number,
        'pubId': number
    },
    'game': IGame,
    'publication': IPublication,
    'date': string,
    'score': number,
    'zscore': number
}