import type {IDataTableConfig} from "../../types/interfaces.ts";


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
        if (config.sortConfig.sortCol === String(col.key)) {
            columnLabels.push(`${config.columns[i].external} ${config.sortConfig.sortDir === 'asc' ? ' ↑' : ' ↓'}`);
            headerClasses.push(headerClassSorted);
            cellClasses.push(cellClassSorted);
        } else {
            columnLabels.push(config.columns[i].external);
            headerClasses.push(headerClassStandard);
            cellClasses.push(cellClassStandard);
        }
    });

    return (
        <table className={'data-table'}>
            <thead>
                <tr>
                    {config.columns.map((col, i) => {
                        return (
                            <th key={String(col.key)} className={headerClasses[i]}>
                                <button onClick={() => config.sortConfig.toggleSortCol(col.key)}>{columnLabels[i]}</button>
                            </th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {content.map((row) => {
                    return (
                        <tr key={String(row[config.idString])} className={'data-table-row'}>
                            {config.columns.map((col, i) => {
                                return (
                                    <td key={`${row[config.idString]}-${String(col.key)}`} className={cellClasses[i]}>{
                                        String(row[col.key])
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