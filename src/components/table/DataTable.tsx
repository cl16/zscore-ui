import type {Entity} from "../../types/types.ts";
import type {IDataTableConfig} from "../../types/interfaces.ts";


function DataTable(
    {content, config} : {
        content: Entity[],
        config: IDataTableConfig
    }) {

    const headerClassStandard = 'data-table-header data-table-cell';
    const headerClassSorted = 'data-table-header-sorted data-table-header data-table-cell';
    const cellClassStandard = 'data-table-data data-table-cell';
    const cellClassSorted = 'data-table-col-sorted data-table-data data-table-cell';

    const columnLabels: string[] = [];
    const headerClasses: string[] = [];
    const cellClasses: string[] = [];
    config.columnsInternal.map((col, i) => {
        if (config.sortConfig.sortCol === col) {
            columnLabels.push(`${config.columnsExternal[i]} ${config.sortConfig.sortDir === 'asc' ? ' ↑' : ' ↓'}`);
            headerClasses.push(headerClassSorted);
            cellClasses.push(cellClassSorted);
        } else {
            columnLabels.push(config.columnsExternal[i]);
            headerClasses.push(headerClassStandard);
            cellClasses.push(cellClassStandard);
        }
    });

    return (
        <table className={'data-table'}>
            <thead>
                <tr>
                    {config.columnsInternal.map((col, i) => {
                        return (
                            <th key={col} className={headerClasses[i]}>
                                <button onClick={() => config.sortConfig.toggleSortCol(col)}>{columnLabels[i]}</button>
                            </th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {content.map((row) => {
                    return (
                        <tr key={row[config.idString]} className={'data-table-row'}>
                            {config.columnsInternal.map((col, i) => {
                                return (
                                    <td key={`${row[config.idString]}-${col}`} className={cellClasses[i]}>{row[col]}</td>
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