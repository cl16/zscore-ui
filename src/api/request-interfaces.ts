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