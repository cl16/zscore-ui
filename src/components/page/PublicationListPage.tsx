import Api from "../../api/api.tsx";
import {useEffect, useState} from "react";
import PublicationListTable from "../table/PublicationListTable.tsx";
import type {IPublicationParams} from "../../api/request-interfaces.ts";

interface IPublicationListPageState {
    page: string | undefined;
    totalPages: number;
    searchKey: string | undefined;
    minScoreAvg: string | undefined;
    maxScoreAvg: string | undefined;
    minScoreStd: string | undefined;
    maxScoreStd: string | undefined;
}


function PublicationListPage() {

    const PAGE_SIZE = 20;
    const DEFAULT_PAGE_STATE = {
        page: '0',
        totalPages: 0,
        searchKey: undefined,
        minScoreAvg: undefined,
        maxScoreAvg: undefined,
        minScoreStd: undefined,
        maxScoreStd: undefined
    }

    // singular state variable
    const [pageState, setPageState] = useState<IPublicationListPageState>(DEFAULT_PAGE_STATE);

    function handleFormValue(arg: FormDataEntryValue | null) {
        if (arg) {
            return arg.toString();
        } else {
            return undefined;
        }
    }

    function applyUserArgs(formData: FormData) {
        setPageState({
            page: handleFormValue(formData.get('page')),
            totalPages: 0,
            searchKey: handleFormValue(formData.get('search-key')),
            minScoreAvg: handleFormValue(formData.get('min-score-avg')),
            maxScoreAvg: handleFormValue(formData.get('max-score-avg')),
            minScoreStd: handleFormValue(formData.get('min-score-std')),
            maxScoreStd: handleFormValue(formData.get('max-score-std'))
        });
    }



    const [tableData, setTableData] = useState([]);

    function buildParams() : IPublicationParams {
        const params: IPublicationParams = {
        };

        if (pageState.page) {
            params.page = pageState.page;
        }
        if (pageState.searchKey) {
            params.nameContains = pageState.searchKey;
        }
        if (pageState.minScoreAvg) {
            params.minScoreAvg = pageState.minScoreAvg;
        }
        if (pageState.maxScoreAvg) {
            params.maxScoreAvg = pageState.maxScoreAvg;
        }
        if (pageState.minScoreStd) {
            params.minScoreStd = pageState.minScoreStd;
        }
        if (pageState.maxScoreStd) {
            params.maxScoreStd = pageState.maxScoreStd;
        }

        return params;
    }

    function requestAndSetData() {
        const params: IPublicationParams = buildParams();
        console.log(params);
        Api.getPublicationsByParams(params)
            .then(response => response.json())
            .then(async (data) => {
                setTableData(data['content']);
            })
            .catch(error => console.log(error));
    }

    function resetPageState() {
        setPageState(DEFAULT_PAGE_STATE);
    }

    useEffect(() => {
        requestAndSetData();
    }, [pageState]);

    return (
        <>
            <div className={'page-body-main'}>

                <form action={applyUserArgs}>
                    <div className={'search-filter-container page-tl-container'}>
                        <div className={'search-container page-ml-container'}>
                            <label htmlFor={'pub-list-search'}>Search</label>
                            <input id={'pub-list-search'} name={'search-key'} className={'text-input'} type={'textbox'} defaultValue={pageState.searchKey || undefined}/>
                        </div>
                        <div className={'filter-container page-ml-container'}>

                            <label htmlFor={'pub-list-min-score-avg'}>Min Score Avg</label>
                            <input id={'pub-list-min-score-avg'} name={'min-score-avg'} className={'text-input'} type={'textbox'} defaultValue={pageState.minScoreAvg || undefined}/>

                            <label htmlFor={'pub-list-max-score-avg'}>Max Score Avg</label>
                            <input id={'pub-list-max-score-avg'} name={'max-score-avg'} className={'text-input'} type={'textbox'} defaultValue={pageState.maxScoreAvg || undefined}/>

                            <label htmlFor={'pub-list-min-score-std'}>Min Score Std Dev</label>
                            <input id={'pub-list-min-score-std'} name={'min-score-std'} className={'text-input'} type={'textbox'} defaultValue={pageState.minScoreStd || undefined}/>

                            <label htmlFor={'pub-list-max-score-std'}>Max Score Std Dev</label>
                            <input id={'pub-list-max-score-std'} name={'max-score-std'} className={'text-input'} type={'textbox'} defaultValue={pageState.maxScoreStd || undefined}/>

                        </div>
                        <button type={'submit'}>Apply</button>
                        <button type={'reset'} onClick={resetPageState}>Clear</button>
                    </div>
                    <div className={'pagination-container'}>
                        <span>Page </span>
                        <input id={'pub-list-page-number'} name={'page'} className={'text-input'} type={'textbox'} defaultValue={pageState.page || undefined}/>
                        <span> of </span>
                        <span className={'total-page-number'}>{pageState.totalPages}</span>
                        <button>Prev</button>
                        <button>Next</button>
                    </div>
                </form>

                <div className={'table-container page-tl-container'}>
                    <PublicationListTable content={tableData}/>
                </div>
            </div>
        </>
    )
}

export default PublicationListPage;