import type {IPublication, ITableSortConfig} from "./interfaces.ts";
import type {IGame} from "./interfaces.ts";
import type {IStatReview} from "./interfaces.ts";

export type Entity =
    | IPublication
    | IGame
    | IStatReview

/**
 * Each group represents the possible strings of column names for an entity data table.
 */
export type ColumnGroup =
    | ('name' | 'scoreAvg' | 'scoreStd')

/**
 * Type for combining the sort configuration scopes for a table of each entity data table. Columns correspond to possible
 * sort-columns on each entity, or null for no sort-column.
 */
export type SortConfig =
    | ITableSortConfig<ColumnGroup | null>