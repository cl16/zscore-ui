import type {IGame, IPublication, IStatReview} from "./interfaces.ts";

export type SortDir = 'asc' | 'desc';

export type Entity =
    | IPublication
    | IGame
    | IStatReview;
