import type {IGame, IPublication} from "./interfaces.ts";

export type SortDir = 'asc' | 'desc';

export type Entity =
    | IPublication
    | IGame
