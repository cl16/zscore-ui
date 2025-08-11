export interface IPagingAndSortingParams {
    page?: string | number; // TODO: make just string once everything made consistent
    size?: string;
    sort?: string;
}

export interface IPublicationParams extends IPagingAndSortingParams {
    minScoreStd?: string;
    maxScoreStd?: string;
    minScoreAvg?: string;
    maxScoreAvg?: string;
    name?: string;
    nameContains?: string;
}

export interface IGameParams extends IPagingAndSortingParams {
    titleContains?: string;
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

export interface IApiResponseJson<T> {
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