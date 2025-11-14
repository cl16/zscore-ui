export interface IPagingAndSortingParams {
    page: string | number; // TODO: make just number once everything made consistent
    size?: number;
    sort: string | null;
}

export interface IPublicationParams extends IPagingAndSortingParams {
    minScoreStd: string;
    maxScoreStd: string;
    minScoreAvg: string;
    maxScoreAvg: string;
    name?: string;  // TODO: determine if really ever used - probably not, remove?
    nameContains: string;
}

export interface IGameParams extends IPagingAndSortingParams {
    titleContains?: string;
}

export interface IStatReviewParams extends IPagingAndSortingParams {
    pubId: string | number;
    gameId: string | number;
    pubNameContains: string;
    gameTitleContains: string;
    minScore: string;
    maxScore: string;
    minZscore: string;
    maxZscore: string;
}

interface IApiResponsePageable {
    pageNumber: number,
    pageSize: number,
    sort: {
        empty: boolean,
        sorted: boolean,
        unsorted: boolean
    },
    offset: number,
    paged: true,
    unpaged: false
}

export interface IApiResponsePagingAndSorting<T> {
    content: T[];
    pageable: IApiResponsePageable,
    last: boolean,
    totalPages: number,
    totalElements: number,
    size: number,
    number: number,
    sort: {
        empty: boolean,
        sorted: boolean,
        unsorted: boolean
    },
    first: boolean,
    numberOfElements: number,
    empty: boolean
}