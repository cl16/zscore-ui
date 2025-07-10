import Api from "../../api/api.tsx";
import {useEffect, useState} from "react";
import type {IPublicationParams} from "../../api/request-interfaces.ts";
import {handleFormValue} from "../../helper/page-data.tsx";
import DataTable from "../table/DataTable.tsx";
import type {IPublication} from "../../types/interfaces.ts";

function PublicationListPage() {

    const [tableData, setTableData] = useState<IPublication[]>([]);
    const [page, setPage] = useState<number>(1);
    const [pageInput, setPageInput] = useState(String(page));
    const [totalPages, setTotalPages] = useState(0);
    const [searchKey, setSearchKey] = useState<string | null>(null);
    const [minScoreAvg, setMinScoreAvg] = useState<string | null>(null);
    const [maxScoreAvg, setMaxScoreAvg] = useState<string | null>(null);
    const [minScoreStd, setMinScoreStd] = useState<string | null>(null);
    const [maxScoreStd, setMaxScoreStd] = useState<string | null>(null);
    const [sortCol, setSortCol] = useState<keyof IPublication | null>(null);
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
    const DEFAULT_PAGE_STATE = {
        page: 1,
        totalPages: 0,
        searchKey: null,
        minScoreAvg: null,
        maxScoreAvg: null,
        minScoreStd: null,
        maxScoreStd: null,
        pageInput: '1'
    }

    useEffect(() => {
        requestAndSetData();
    }, [page, searchKey, minScoreAvg, maxScoreAvg, minScoreStd, maxScoreStd, sortCol, sortDir]);

    function applyUserArgs(formData: FormData) {
        const pageArg = handleFormValue(formData.get('page'));
        const searchKeyArg = handleFormValue(formData.get('search-key'))
        const minScoreAvgArg = handleFormValue(formData.get('min-score-avg'));
        const maxScoreAvgArg = handleFormValue(formData.get('max-score-avg'));
        const minScoreStdArg = handleFormValue(formData.get('min-score-std'));
        const maxScoreStdArg = handleFormValue(formData.get('max-score-std'));

        // If no user args have changed state, consider page arg only
        if (searchKeyArg === searchKey && minScoreAvgArg === minScoreAvg && maxScoreAvgArg === maxScoreAvg && minScoreStdArg === minScoreStd && maxScoreStdArg === maxScoreStd) {
            const pageValueToSet = (pageArg === '' || pageArg === '0' || !pageArg || Number(pageArg) > totalPages) ? 1 : Number(pageArg);
            setPageMaster(pageValueToSet);
        }
        // If any user arg has changed state, re-set page to first page and apply new user-requested state
        else {
            setPageMaster(1);
            setSearchKey(searchKeyArg);
            setMinScoreAvg(minScoreAvgArg);
            setMaxScoreAvg(maxScoreAvgArg);
            setMinScoreStd(minScoreStdArg);
            setMaxScoreStd(maxScoreStdArg);
            setSortCol(null);
        }
    }

    function buildParams() : IPublicationParams {
        const params: IPublicationParams = {};
        if (page) {
            params.page = page - 1; // pagination 0-indexed in API
        }
        if (sortCol) {
            params.sort = `${sortCol},${sortDir}`;
        }
        if (searchKey) {
            params.nameContains = searchKey;
        }
        if (minScoreAvg) {
            params.minScoreAvg = minScoreAvg;
        }
        if (maxScoreAvg) {
            params.maxScoreAvg = maxScoreAvg;
        }
        if (minScoreStd) {
            params.minScoreStd = minScoreStd;
        }
        if (maxScoreStd) {
            params.maxScoreStd = maxScoreStd;
        }
        return params;
    }

    function requestAndSetData() {
        const params: IPublicationParams = buildParams();
        Api.getPublicationsByParams(params)
            .then(response => response.json())
            .then(async (data) => {
                console.log(`response data length: ${data.content.length}`);
                setTableData(data.content);
                setTotalPages(data.totalPages);
            })
            .catch(error => console.log(error));
    }

    function resetPageState() {
        setPage(DEFAULT_PAGE_STATE.page);
        setSearchKey(DEFAULT_PAGE_STATE.searchKey);
        setMinScoreAvg(DEFAULT_PAGE_STATE.minScoreAvg);
        setMaxScoreAvg(DEFAULT_PAGE_STATE.maxScoreAvg);
        setMinScoreStd(DEFAULT_PAGE_STATE.minScoreStd);
        setMaxScoreStd(DEFAULT_PAGE_STATE.maxScoreStd);
        setPageInput(DEFAULT_PAGE_STATE.pageInput);
        setSortCol(null);
    }

    function nextPage() {
        const current = Number(page);
        const total = Number(totalPages);
        if (current < total) {
            setPageMaster(current + 1);
        }
    }

    function prevPage() {
        const current = Number(page);
        if (current > 1) {
            setPageMaster(current - 1);
        }
    }

    function setPageMaster(n: number) {
        setPage(n);
        setPageInput(String(n));
    }

    function sortByColumn(column: keyof IPublication | null) {
        if (sortCol != column) {
            setSortCol(column as keyof IPublication | null);
            setSortDir('asc');
        } else if (sortDir === 'asc') {
            toggleSortDir();
        } else {
            setSortCol(null);
        }
        setPageMaster(1);
    }

    function toggleSortDir() {
        if (sortDir === 'asc') {
            setSortDir('desc');
        } else {
            setSortDir('asc');
        }
    }

    return (
        <>
            <div className={'page-body-main'}>

                <form action={applyUserArgs}>
                    <div className={'search-filter-container page-tl-container'}>
                        <div className={'search-container page-ml-container'}>
                            <label htmlFor={'pub-list-search'}>Search</label>
                            <input id={'pub-list-search'} name={'search-key'} className={'text-input'} type={'textbox'} defaultValue={searchKey || undefined}/>
                        </div>
                        <div className={'filter-container page-ml-container'}>

                            <label htmlFor={'pub-list-min-score-avg'}>Min Score Avg</label>
                            <input id={'pub-list-min-score-avg'} name={'min-score-avg'} className={'text-input'} type={'textbox'} defaultValue={minScoreAvg || undefined}/>

                            <label htmlFor={'pub-list-max-score-avg'}>Max Score Avg</label>
                            <input id={'pub-list-max-score-avg'} name={'max-score-avg'} className={'text-input'} type={'textbox'} defaultValue={maxScoreAvg || undefined}/>

                            <label htmlFor={'pub-list-min-score-std'}>Min Score Std Dev</label>
                            <input id={'pub-list-min-score-std'} name={'min-score-std'} className={'text-input'} type={'textbox'} defaultValue={minScoreStd || undefined}/>

                            <label htmlFor={'pub-list-max-score-std'}>Max Score Std Dev</label>
                            <input id={'pub-list-max-score-std'} name={'max-score-std'} className={'text-input'} type={'textbox'} defaultValue={maxScoreStd || undefined}/>

                        </div>
                        <button type={'submit'}>Apply</button>
                        <button type={'reset'} onClick={resetPageState}>Clear</button>
                    </div>
                    <div className={'pagination-container'}>
                        <span>Page </span>
                        <input id={'pub-list-page-number'} name={'page'} className={'text-input'} type={'textbox'} value={pageInput} onChange={e => setPageInput(e.target.value)}/>
                        <span> of </span>
                        <span className={'total-page-number'}>{totalPages}</span>
                        <button type={'button'} onClick={prevPage}>Prev</button>
                        <button type={'button'} onClick={nextPage}>Next</button>
                    </div>
                </form>

                <div className={'table-container page-tl-container'}>
                    <DataTable<IPublication> content={tableData} config={{
                        columns: [
                            {key: 'name', external: 'Name'},
                            {key: 'scoreAvg', external: 'Score Average'},
                            {key: 'scoreStd', external: 'Score Standard Deviation'}
                        ],
                        idString: 'pubId',
                        sortConfig: {
                            sortCol: sortCol,
                            sortDir: sortDir,
                            toggleSortCol: sortByColumn
                        }
                    }}/>
                </div>
            </div>
        </>
    )
}

export default PublicationListPage;