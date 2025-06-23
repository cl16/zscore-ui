import Api from "../../api/api.tsx";
import {useEffect, useState} from "react";
import PublicationListTable from "../table/PublicationListTable.tsx";

function PublicationListPage() {

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        Api.getAllPublications(0, 20).then(async (result) => {
            const content = (await result.json())['content'];
            setTableData(content);
        });
    });

    return (
        <>
            <div className={'page-body-main'}>
                <div className={'search-filter-container page-tl-container'}>
                    <div className={'search-container page-ml-container'}>
                        <label htmlFor={'pub-list-search'}>Search</label>
                        <input id={'pub-list-search'} className={'text-input'} type={'textbox'}/>
                    </div>
                    <div className={'filter-container page-ml-container'}>

                        <label htmlFor={'pub-list-min-score-avg'}>Min Score Avg</label>
                        <input id={'pub-list-min-score-avg'} className={'text-input'} type={'textbox'}/>

                        <label htmlFor={'pub-list-max-score-avg'}>Max Score Avg</label>
                        <input id={'pub-list-max-score-avg'} className={'text-input'} type={'textbox'}/>

                        <label htmlFor={'pub-list-min-score-std'}>Min Score Std Dev</label>
                        <input id={'pub-list-min-score-std'} className={'text-input'} type={'textbox'}/>

                        <label htmlFor={'pub-list-max-score-std'}>Max Score Std Dev</label>
                        <input id={'pub-list-max-score-std'} className={'text-input'} type={'textbox'}/>
                    </div>
                </div>
                <div className={'table-container page-tl-container'}>
                    <PublicationListTable content={tableData}/>
                </div>
            </div>
        </>
    )
}

export default PublicationListPage;