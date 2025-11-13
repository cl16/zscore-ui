import type {IApiResponseJson} from "../api/request-interfaces.ts";

export interface IPublication {
    'pubId': number,
    'name': string,
    'scoreAvg': number,
    'scoreStd': number,
}

export interface IGame {
    'gameId': number,
    'title': string
}

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

export interface IDataTableContainerConfig<T> {
    isLoading: boolean;
    isError: boolean;
    pageData: IApiResponseJson<T> | null;
    dataTableConfig: IDataTableConfig<T>;
}

export interface IDataTableConfig<T> {
    columns: ITableColumn[];
    idString: keyof T;
    sortConfig: ITableSortConfig;
}

export interface ITableSortConfig {
    sort: string | null;
    toggleSortCol: (col: string) => void;
}

export interface ITableColumn {
    accessor: string;
    label: string;
    modifier?: (arg: string) => string;
}