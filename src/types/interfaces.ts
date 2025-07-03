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

export interface ITableSortConfig<T extends string | null> {
    sortCol: T;
    sortDir: 'asc' | 'desc';
    toggleSortCol: (col: T) => void;
}