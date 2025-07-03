import type {IPublication} from "../../types/interfaces.ts";
import type {ITableSortConfig} from "../../types/interfaces.ts";


function PublicationListTable(
    {content, sortConfig} : {
        content: IPublication[],
        sortConfig: ITableSortConfig<'name' | 'scoreAvg' | 'scoreStd' | null>
    }) {

    const headerClassStandard = 'data-table-header data-table-cell';
    const headerClassSorted = 'data-table-header-sorted data-table-header data-table-cell';
    const dataCellClassStandard = 'data-table-data data-table-cell';
    const dataCellClassSorted = 'data-table-col-sorted data-table-data data-table-cell';

    let nameColText;
    if (sortConfig.sortCol === 'name') {
        if (sortConfig.sortDir === 'asc') {
            nameColText = 'Name ↑';
        } else {
            nameColText = 'Name ↓';
        }
    } else {
        nameColText = 'Name';
    }

    let scoreAvgColText;
    if (sortConfig.sortCol === 'scoreAvg') {
        if (sortConfig.sortDir === 'asc') {
            scoreAvgColText = 'Score Avg ↑';
        } else {
            scoreAvgColText = 'Score Avg ↓';
        }
    } else {
        scoreAvgColText = 'Score Avg';
    }

    let scoreStdColText;
    if (sortConfig.sortCol === 'scoreStd') {
        if (sortConfig.sortDir === 'asc') {
            scoreStdColText = 'Score Std Dev ↑';
        } else {
            scoreStdColText = 'Score Std Dev ↓';
        }
    } else {
        scoreStdColText = 'Score Std Dev';
    }

    return (
        <table className={'data-table'}>
            <thead>
                <tr>
                    <th className={sortConfig.sortCol === 'name' ? headerClassSorted : headerClassStandard}>
                        <button onClick={() => sortConfig.toggleSortCol('name')}>{nameColText}</button>
                    </th>
                    <th className={sortConfig.sortCol === 'scoreAvg' ? headerClassSorted : headerClassStandard}>
                        <button onClick={() => sortConfig.toggleSortCol('scoreAvg')}>{scoreAvgColText}</button>
                    </th>
                    <th className={sortConfig.sortCol === 'scoreStd' ? headerClassSorted : headerClassStandard}>
                        <button onClick={() => sortConfig.toggleSortCol('scoreStd')}>{scoreStdColText}</button>
                    </th>
                </tr>
            </thead>
            <tbody>
            {content.map((row) => {
                return (
                    <tr key={row.pubId} className={'data-table-row'}>
                        <td className={sortConfig.sortCol === 'name' ? dataCellClassSorted : dataCellClassStandard}>{row.name}</td>
                        <td className={sortConfig.sortCol === 'scoreAvg' ? dataCellClassSorted : dataCellClassStandard}>{row.scoreAvg}</td>
                        <td className={sortConfig.sortCol === 'scoreStd' ? dataCellClassSorted : dataCellClassStandard}>{row.scoreStd}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

export default PublicationListTable;