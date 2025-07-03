import type {ColumnGroup, Entity, SortConfig} from "../../types/types.ts";


function DataTable(
    {content, columns, sortConfig} : {
        content: Entity[],
        columns: ColumnGroup[],
        sortConfig: SortConfig
    }) {

    const headerClassStandard = 'data-table-header data-table-cell';
    const headerClassSorted = 'data-table-header-sorted data-table-header data-table-cell';
    const cellClassStandard = 'data-table-data data-table-cell';
    const cellClassSorted = 'data-table-col-sorted data-table-data data-table-cell';

    const columnLabels: string[] = [];
    const headerClasses: string[] = [];
    const cellClasses: string[] = [];
    for (const col of columns) {
        if (sortConfig.sortCol === col) {
            columnLabels.push(`${col} ${sortConfig.sortDir === 'asc' ? ' ↑' : ' ↓'}`);
            headerClasses.push(headerClassSorted);
            cellClasses.push(cellClassSorted);
        } else {
            columnLabels.push(col);
            headerClasses.push(headerClassStandard);
            cellClasses.push(cellClassStandard);
        }
    }

    return (
        <table className={'data-table'}>
            <thead>
                <tr>
                    {columns.map((col, i) => {
                        return (
                            <th className={headerClasses[i]}>
                                <button onClick={() => sortConfig.toggleSortCol(col)}>{columnLabels[i]}</button>
                            </th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {content.map((row) => {
                    return (
                        <tr className={'data-table-row'}>
                            {columns.map((col, i) => {
                                return (
                                    <td className={cellClasses[i]}>{row[col]}</td>
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