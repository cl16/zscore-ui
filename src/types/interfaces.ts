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

export interface ITableSortConfig<T> {
    sortCol: keyof T | null;
    sortDir: 'asc' | 'desc' | null;
    toggleSortCol: (col: string) => void;
}

export interface IDataTableConfig<T> {
    columns: ITableColumn[];
    idString: keyof T;
    sortConfig: ITableSortConfig<T>;
}

export interface ITableColumn {
    accessor: string;
    label: string;
}