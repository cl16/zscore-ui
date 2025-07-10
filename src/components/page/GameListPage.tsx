import {useEffect, useState} from "react";
import Api from "../../api/api.tsx";
import type {IGame} from "../../types/interfaces.ts";
import type {SortDir} from "../../types/types.ts";
import type {IGameParams} from "../../api/request-interfaces.ts";
import DataTable from "../table/DataTable.tsx";
import {handleFormValue} from "../../helper/page-data.tsx";

function GameListPage() {

    const [tableData, setTableData] = useState<IGame[]>([]);
    const [page, setPage] = useState<number>(1);
    const [pageInput, setPageInput] = useState(String(page));
    const [totalPages, setTotalPages] = useState(0);
    const [searchKey, setSearchKey] = useState<string | null>(null);
    const [sortCol, setSortCol] = useState<keyof IGame | null>(null);
    const [sortDir, setSortDir] = useState<SortDir>('asc');
    const [requestError, setRequestError] = useState<boolean>(false);
    const DEFAULT_PAGE_STATE = {
        page: 1,
        totalPages: 0,
        searchKey: null,
        pageInput: '1',
        requestError: false
    }

    useEffect(() => {
        requestAndSetData();
    }, [page, searchKey, sortCol, sortDir, requestError]);

    function applyUserArgs(formData: FormData) {
        const pageArg = handleFormValue(formData.get('page'));
        const searchKeyArg = handleFormValue(formData.get('search-key'))

        // If no user args have changed state, consider page arg only
        if (searchKeyArg === searchKey) {
            const pageValueToSet = (pageArg === '' || pageArg === '0' || !pageArg || Number(pageArg) > totalPages) ? 1 : Number(pageArg);
            setPageMaster(pageValueToSet);
        }
        // If any user arg has changed state, re-set page to first page and apply new user-requested state
        else {
            setPageMaster(1);
            setSearchKey(searchKeyArg);
            setSortCol(null);
        }
    }

    function buildParams() : IGameParams {
        const params: IGameParams = {};
        if (page) {
            params.page = page - 1; // pagination 0-indexed in API
        }
        if (sortCol) {
            params.sort = `${sortCol},${sortDir}`;
        }
        if (searchKey) {
            params.titleContains = searchKey;
        }
        return params;
    }

    function requestAndSetData() {
        const params: IGameParams = buildParams();
        Api.getGamesByParams(params)
            .then(async (data) => {
                console.log(`Data length: ${data.content.length}`);
                setRequestError(false);
                setTableData(data.content);
                setTotalPages(data.totalPages);
            })
            .catch(error => {
                console.log('RENDER PAGE ERROR MSG', error)
                setRequestError(true);
            });
    }

    function resetPageState() {
        setPage(DEFAULT_PAGE_STATE.page);
        setSearchKey(DEFAULT_PAGE_STATE.searchKey);
        setPageInput(DEFAULT_PAGE_STATE.pageInput);
        setSortCol(null);
        setRequestError(false);
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

    function sortByColumn(column: keyof IGame | null) {
        if (sortCol != column) {
            setSortCol(column as keyof IGame | null);
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
                            <label htmlFor={'game-list-search'}>Search</label>
                            <input id={'game-list-search'} name={'search-key'} className={'text-input'} type={'textbox'} defaultValue={searchKey || undefined}/>
                            <button type={'submit'}>Apply</button>
                            <button type={'reset'} onClick={resetPageState}>Clear</button>
                        </div>
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
                    {requestError ? 'An error occurred' : tableData.length === 0 ? 'No results' : <DataTable<IGame> content={tableData} config={{
                                                                    columns: [
                                                                        {key: 'title', external: 'Title'}
                                                                    ],
                                                                    idString: 'gameId',
                                                                    sortConfig: {
                                                                        sortCol: sortCol,
                                                                        sortDir: sortDir,
                                                                        toggleSortCol: sortByColumn
                                                                    }
                                                                }}/>
                    }
                </div>
            </div>
        </>

    )
}

export default GameListPage;