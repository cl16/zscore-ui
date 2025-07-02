export interface ITableSortConfig<T extends string | null> {
    sortCol: T;
    sortDir: 'asc' | 'desc';
    toggleSortCol: (col: T) => void;
}