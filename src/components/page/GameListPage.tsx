import type {IGame} from "../../types/interfaces.ts";
import DataTable from "../table/DataTable.tsx";
import {usePagingAndSortingForm} from "../../helper/use-form-hook.ts";
import {useGetGamesByParams} from "../../api/use-api-hook.ts";
import {extractPatterns, InputValidation} from "../../helper/input-validation-patterns.ts";
import {useEffect} from "react";
import Select from "../Select.tsx";

interface IGameListPageForm {
    titleContains: string;
}

function GameListPage() {

    const DEFAULT_FORM = {
        titleContains: '',
    }

    const formPatterns = {
        titleContains: InputValidation.ANY,
    }

    const {
        formData,
        formValidity,
        queryData,
        handleFormDataChange,
        submitForm,
        incrementPage,
        decrementPage,
        setMaxPage,
        resetForm,
        sortByColumn
    } = usePagingAndSortingForm<IGameListPageForm, IGame>(
        DEFAULT_FORM,
        extractPatterns(formPatterns)
    );

    const {data: pageData, isLoading, error: isError} = useGetGamesByParams(queryData);

    useEffect(() => {
        setMaxPage(pageData?.totalPages || 1);
    }, [pageData?.totalPages, setMaxPage])

    return (
        <>
            <div className={'page-body-main'}>

                <form onSubmit={submitForm}>
                    <div className={'search-filter-container page-tl-container'}>
                        <div className={'search-container page-ml-container'}>
                            <div>
                                <label>Title Contains</label>
                                <input name={'titleContains'} className={formValidity.titleContains ? 'text-input' : 'text-input-invalid'} type={'textbox'} value={formData.titleContains} onChange={handleFormDataChange}/>
                                {formValidity.titleContains ? null: <span>{formPatterns.titleContains.desc}</span>}
                            </div>
                            <button type={'submit'} disabled={Object.values(formValidity).some((valid) => !valid)}>Submit</button>
                            <button type={'reset'} onClick={resetForm}>Reset</button>
                        </div>
                    </div>
                    <div className={'pagination-container'}>
                        <span>Page </span>
                        <input name={'page'} className={formValidity.page ? 'text-input' : 'text-input-invalid'} type={'textbox'} value={formData.page} onChange={handleFormDataChange}/>
                        <span> of {pageData?.totalPages || 1}</span>
                        <button type={'button'} onClick={decrementPage}>Prev</button>
                        <button type={'button'} onClick={() => incrementPage(pageData?.totalPages || 1)}>Next</button>
                        <span> {pageData?.totalElements || 0} total results</span>
                    </div>

                    <Select values={[20, 50, 100]} defaultValue={formData?.size || 20} onChangeFunc={handleFormDataChange}/>

                    <div>
                        <span>Showing </span>
                        <span>{((queryData?.page - 1) * queryData?.size) + 1} - {Math.min((queryData?.page * queryData?.size), pageData?.totalElements || 0)}</span>
                        <span> of </span>
                        <span>{pageData?.totalElements}</span>
                        <span> results</span>
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