import type {IGame} from "../../types/interfaces.ts";
import DataTable from "../table/DataTable.tsx";
import {type IPagingAndSortingForm, usePagingAndSortingForm} from "../../helper/use-form-hook.ts";
import {useGetGamesByParams} from "../../api/use-api-hook.ts";

interface IGameListPageForm extends IPagingAndSortingForm {
    titleContains: string;
}

function GameListPage() {

    const DEFAULT_FORM = {
        titleContains: '',
        page: 1,
        sort: ''
    }

    const {
        formData,
        queryData,
        handleFormDataChange,
        submitForm,
        incrementPage,
        decrementPage,
        resetForm,
        sortByColumn
    } = usePagingAndSortingForm<IGameListPageForm, IGame>(DEFAULT_FORM);
    const {data: pageData, isLoading, error: isError} = useGetGamesByParams(queryData);

    return (
        <>
            <div className={'page-body-main'}>

                <form onSubmit={submitForm}>
                    <div className={'search-filter-container page-tl-container'}>
                        <div className={'search-container page-ml-container'}>
                            <label>Title Contains</label>
                            <input name={'titleContains'} className={'text-input'} type={'textbox'} defaultValue={formData.titleContains} onChange={handleFormDataChange}/>
                            <button type={'submit'}>Submit</button>
                            <button type={'reset'} onClick={resetForm}>Reset</button>
                        </div>
                    </div>
                    <div className={'pagination-container'}>
                        <span>Page </span>
                        <input name={'page'} className={'text-input'} type={'textbox'} value={formData.page} onChange={handleFormDataChange}/>
                        <span> of {pageData?.totalPages || 1}</span>
                        <button type={'button'} onClick={decrementPage}>Prev</button>
                        <button type={'button'} onClick={() => incrementPage(pageData?.totalPages || 1)}>Next</button>
                        <span> {pageData?.totalElements || 0} total results</span>
                    </div>
                </form>

                <div className={'table-container page-tl-container'}>
                    {
                        isLoading ? <div>Loading ...</div> :
                            isError ? <div>An error occurred! Please try again or try another query.</div> :
                                pageData === null || pageData.content.length === 0 ? <div>Nothing to see here ...</div> :

                                    <DataTable<IGame> content={pageData.content} config={{
                                        columns: [
                                            {key: 'title', external: 'Title'}
                                        ],
                                        idString: 'gameId',
                                        sortConfig: {
                                            sortCol: formData.sort ? formData.sort.split(',')[0] as keyof IGame : null,
                                            sortDir: formData.sort ? formData.sort.split(',')[1] as 'asc' | 'desc' : null,
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