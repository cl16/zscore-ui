import type {IPublication} from "../entity/publication.ts";
import type {ITableSortConfig} from "../page/PublicationListPage.tsx";


function PublicationListTable({content, sortConfig} : {content: IPublication[], sortConfig: ITableSortConfig}) {

    const headerClassStandard = 'data-table-header data-table-cell';
    const headerClassSorted = 'data-table-header-sorted data-table-header data-table-cell';

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
    if (sortConfig.sortCol === 'score-avg') {
        if (sortConfig.sortDir === 'asc') {
            scoreAvgColText = 'Score Avg ↑';
        } else {
            scoreAvgColText = 'Score Avg ↓';
        }
    } else {
        scoreAvgColText = 'Score Avg';
    }

    let scoreStdColText;
    if (sortConfig.sortCol === 'score-std') {
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
                        <button onClick={sortConfig.toggleName}>{nameColText}</button>
                    </th>
                    <th className={sortConfig.sortCol === 'score-avg' ? headerClassSorted : headerClassStandard}>
                        <button onClick={sortConfig.toggleScoreAvg}>{scoreAvgColText}</button>
                    </th>
                    <th className={sortConfig.sortCol === 'score-std' ? headerClassSorted : headerClassStandard}>
                        <button onClick={sortConfig.toggleScoreStd}>{scoreStdColText}</button>
                    </th>
                </tr>
            </thead>
            <tbody>
            {content.map((row) => {
                return (
                    <tr className={'data-table-row'}>
                        <td className={'data-table-data data-table-cell'}>{row.name}</td>
                        <td className={'data-table-data data-table-cell'}>{row.scoreAvg}</td>
                        <td className={'data-table-data data-table-cell'}>{row.scoreStd}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

export default PublicationListTable;