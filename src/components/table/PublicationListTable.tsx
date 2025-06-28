import type {IPublication} from "../entity/publication.ts";


function PublicationListTable({content} : {content: IPublication[]}) {

    return (
        <table className={'data-table'}>
            <thead>
                <tr>
                    <th className={'data-table-header data-table-cell'}>
                        <span>Name</span>
                        <button>Sort</button>
                    </th>
                    <th className={'data-table-header data-table-cell'}>
                        <span>Score Average</span>
                        <button>Sort</button>
                    </th>
                    <th className={'data-table-header data-table-cell'}>
                        <span>Score Standard Deviation</span>
                        <button>Sort</button>
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