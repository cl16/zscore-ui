export interface IPagingAndSortingParams {
    page?: string;
    size?: string;
    sort?: ISortParams;
}

interface ISortParams {
    key: string;
    dir: 'asc' | 'desc';
}

export interface IPublicationParams extends IPagingAndSortingParams {
    minScoreStd?: string;
    maxScoreStd?: string;
    minScoreAvg?: string;
    maxScoreAvg?: string;
    name?: string;
    nameContains?: string;
}