import Api from "../../api/api.tsx";
import {useEffect, useState} from "react";
import PublicationListTable from "../table/PublicationListTable.tsx";
import type {IPublicationParams} from "../../api/request-interfaces.ts";

export interface ITableSortConfig {
    sortCol: 'name' | 'scoreAvg' | 'scoreStd' | null;
    sortDir: 'asc' | 'desc';
    toggleName: () => void;
    toggleScoreAvg: () => void;
    toggleScoreStd: () => void;
}

function PublicationListPage() {

    const [tableData, setTableData] = useState([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchKey, setSearchKey] = useState<string | null>(null);
    const [minScoreAvg, setMinScoreAvg] = useState<string | null>(null);
    const [maxScoreAvg, setMaxScoreAvg] = useState<string | null>(null);
    const [minScoreStd, setMinScoreStd] = useState<string | null>(null);
    const [maxScoreStd, setMaxScoreStd] = useState<string | null>(null);
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

    // state for table sort
    const [sortCol, setSortCol] = useState<'name' | 'scoreAvg' | 'scoreStd' | null>(null);
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

    // state for page input value
    const [pageInput, setPageInput] = useState(String(page));


    useEffect(() => {
        requestAndSetData();
    }, [page, searchKey, minScoreAvg, maxScoreAvg, minScoreStd, maxScoreStd, sortCol, sortDir]);

    function handleFormValue(arg: FormDataEntryValue | null) {
        if (arg) {
            if (arg === '') {
                return null;
            } else {
                return arg.toString();
            }
        } else {
            return null;
        }
    }

    function applyUserArgs(formData: FormData) {
        console.log('\n*** applyUserArgs called ***');

        const pageArg = handleFormValue(formData.get('page'));
        const searchKeyArg = handleFormValue(formData.get('search-key'))
        const minScoreAvgArg = handleFormValue(formData.get('min-score-avg'));
        const maxScoreAvgArg = handleFormValue(formData.get('max-score-avg'));
        const minScoreStdArg = handleFormValue(formData.get('min-score-std'));
        const maxScoreStdArg = handleFormValue(formData.get('max-score-std'));

        console.log(`Current state vals... \npage: ${page}\nsearchKey ${searchKey}\nminScoreAvg: ${minScoreAvg}\nmaxScoreAvg: ${maxScoreAvg}\nminScoreStd: ${minScoreStd}\nmaxScoreStd: ${maxScoreStd}`);
        console.log(`Page's user args... \npageArg: ${pageArg} (${Number(pageArg)})\nsearchKeyArg ${searchKeyArg}\nminScoreAvgArg: ${minScoreAvgArg}\nmaxScoreAvgArg: ${maxScoreAvgArg}\nminScoreStdArg: ${minScoreStdArg}\nmaxScoreStdArg: ${maxScoreStdArg}`);
        console.log(`User changing state...\npageArg: ${!(Number(pageArg) === page)}\nsearchKeyArg ${!(searchKeyArg === searchKey)}\nminScoreAvgArg: ${!(minScoreAvgArg === minScoreAvg)}\nmaxScoreAvgArg: ${!(maxScoreAvgArg === maxScoreAvg)}\nminScoreStdArg: ${!(minScoreStdArg === minScoreStd)}\nmaxScoreStdArg: ${!(maxScoreStdArg === maxScoreStd)}`);

        // if no user args have changed state, consider page only
        if (searchKeyArg === searchKey && minScoreAvgArg === minScoreAvg && maxScoreAvgArg === maxScoreAvg && minScoreStdArg === minScoreStd && maxScoreStdArg === maxScoreStd) {
            const pageValueToSet = (pageArg === '' || pageArg === '0' || !pageArg || Number(pageArg) > totalPages) ? 1 : Number(pageArg);
            tempSetPage(pageValueToSet);
            setPageInput(String(pageValueToSet));
        }
        // but if anything else on page has changed from its current state, re-set page to first page and apply that new state
        else {
            tempSetPage(DEFAULT_PAGE_STATE.page);
            setSearchKey(searchKeyArg);
            setMinScoreAvg(minScoreAvgArg);
            setMaxScoreAvg(maxScoreAvgArg);
            setMinScoreStd(minScoreStdArg);
            setMaxScoreStd(maxScoreStdArg);
        }
    }

    function tempSetPage(n: number) {
        console.log(`setPage called with arg: ${n}`);
        setPage(n);
    }

    function buildParams() : IPublicationParams {
        const params: IPublicationParams = {
        };

        console.log(`Page val is: ${page}`);
        if (page) {
            params.page = page - 1; // pagination 0-indexed in API
        }

        if (sortCol) {
            params.sort = `${sortCol},${sortDir}`
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
        console.log(params);
        Api.getPublicationsByParams(params)
            .then(response => response.json())
            .then(async (data) => {
                setTableData(data.content);
                setTotalPages(data.totalPages);
            })
            .catch(error => console.log(error));
    }

    function resetPageState() {
        tempSetPage(DEFAULT_PAGE_STATE.page);
        setSearchKey(DEFAULT_PAGE_STATE.searchKey);
        setMinScoreAvg(DEFAULT_PAGE_STATE.minScoreAvg);
        setMaxScoreAvg(DEFAULT_PAGE_STATE.maxScoreAvg);
        setMinScoreStd(DEFAULT_PAGE_STATE.minScoreStd);
        setMaxScoreStd(DEFAULT_PAGE_STATE.maxScoreStd);
        setPageInput(DEFAULT_PAGE_STATE.pageInput);
    }

    function nextPage() {
        console.log('nextPage called');
        const current = Number(page);
        const total = Number(totalPages);
        if (current < total) {
            const next = current + 1;
            console.log(`nextPage: ${current} to ${next}`);
            tempSetPage(next);
            setPageInput(String(next));
        }
    }

    function prevPage() {
        console.log('prevPage called');
        const current = Number(page);
        if (current > 1) {
            tempSetPage(current - 1);
            setPageInput(String(current - 1));
        }
    }

    function sortByName() {
        console.log('sortByName clicked');
        if (sortCol != 'name') {
            setSortCol('name');
            setSortDir('asc');
        } else if (sortDir === 'asc') {
            toggleSortDir();
        } else {
            setSortCol(null);
        }
    }

    function sortByScoreAvg() {
        console.log('sortByScoreAvg clicked');
        if (sortCol != 'scoreAvg') {
            setSortCol('scoreAvg');
            setSortDir('asc');
        } else if (sortDir === 'asc') {
            toggleSortDir();
        } else {
            setSortCol(null);
        }
    }

    function sortByScoreStd() {
        console.log('sortByScoreStd clicked');
        if (sortCol != 'scoreStd') {
            setSortCol('scoreStd');
            setSortDir('asc');
        } else if (sortDir === 'asc') {
            toggleSortDir();
        } else {
            setSortCol(null);
        }
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
                    <PublicationListTable content={tableData} sortConfig={{
                        sortCol: sortCol,
                        sortDir: sortDir,
                        toggleName: sortByName,
                        toggleScoreAvg: sortByScoreAvg,
                        toggleScoreStd: sortByScoreStd
                    }}/>
                </div>
            </div>
        </>
    )
}

export default PublicationListPage;