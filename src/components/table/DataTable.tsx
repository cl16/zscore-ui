import type {IDataTableConfig} from "../../types/interfaces.ts";
import type {NestedEntity} from "../../types/types.ts";

function access_nested(obj: NestedEntity, key: string, ...rest: string[]) {
    if (rest.length === 0) {
        return obj[key];
    } else if (typeof obj[key] == 'string' || typeof obj[key] == 'number') {
        return obj[key];
    } else {
        const [nextKey, ...remaining] = rest;
        return access_nested(obj[key], nextKey, ...remaining);
    }
}

function DataTable<T>(
    {content, config} : {
        content: T[],
        config: IDataTableConfig<T>
    }) {

    const headerClassStandard = 'data-table-header data-table-cell';
    const headerClassSorted = 'data-table-header-sorted data-table-header data-table-cell';
    const cellClassStandard = 'data-table-data data-table-cell';
    const cellClassSorted = 'data-table-col-sorted data-table-data data-table-cell';

    const columnLabels: string[] = [];
    const headerClasses: string[] = [];
    const cellClasses: string[] = [];
    config.columns.map((col, i) => {
        if (config.sortConfig.sortCol === String(col.accessor)) {
            columnLabels.push(`${config.columns[i].label} ${config.sortConfig.sortDir === 'asc' ? ' ↑' : ' ↓'}`);
            headerClasses.push(headerClassSorted);
            cellClasses.push(cellClassSorted);
        } else {
            columnLabels.push(config.columns[i].label);
            headerClasses.push(headerClassStandard);
            cellClasses.push(cellClassStandard);
        }
    });

    return (
        <table className={'data-table'}>
            <thead className={'data-table-head'}>
                <tr className={'data-table-head-row'}>
                    {config.columns.map((col, i) => {
                        return (
                            <th key={String(col.accessor)} className={headerClasses[i]}>
                                <button className={'data-table-col-sort-button'} onClick={() => config.sortConfig.toggleSortCol(col.accessor)}>{columnLabels[i]}</button>
                            </th>
                        )
                    })}
                </tr>
            </thead>
            <tbody className={'data-table-body tbody-scrollable'}>
                {content.map((row, i) => {
                    return (
                        <tr key={i} className={'data-table-row'}>
                            {config.columns.map((col, i) => {

                                const [key, ...rest] = col.accessor.split('_')
                                const val = access_nested(row as NestedEntity, key, ...rest);

                                return (
                                    <td key={`${col.accessor}-${i}`} className={cellClasses[i]}>{
                                        typeof val === 'string' || typeof val === 'number' ? val : null
                                    }</td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default DataTable;