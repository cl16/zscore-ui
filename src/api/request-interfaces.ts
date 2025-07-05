export interface IPagingAndSortingParams {
    page?: number;
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