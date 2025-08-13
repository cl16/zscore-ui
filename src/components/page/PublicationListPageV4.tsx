import {useGetPublicationsByParams} from "../../api/use-api-hook.ts";
import {type IPaginatingFormData, usePaginatingFormData} from "../../helper/use-form-hook.ts";
import DataTable from "../table/DataTable.tsx";
import type {IPublication} from "../../types/interfaces.ts";

interface IPublicationListPageForm extends IPaginatingFormData {
    nameContains: string,
    minScoreAvg: string,
    maxScoreAvg: string,
    minScoreStd: string,
    maxScoreStd: string,
}

export function PublicationListPageV4() {

    const DEFAULT_FORM = {
        nameContains: '',
        minScoreAvg: '',
        maxScoreAvg: '',
        minScoreStd: '',
        maxScoreStd: '',
        page: 1,
        sort: ''
    };

    const {
        formData,
        queryData,
        handleFormDataChange,
        submitForm,
        incrementPage,
        decrementPage,
        resetForm,
        sortByColumn
    } = usePaginatingFormData<IPublicationListPageForm, IPublication>(DEFAULT_FORM);
    const {data: pageData, isLoading, error: isError} = useGetPublicationsByParams(queryData);

    return (
        <>
            <div className={'page-body-main'}>
                <form onSubmit={submitForm}>
                    <div>
                        <label>Name Contains</label>
                        <input name={'nameContains'} className={'text-input'} type={'textbox'} value={formData.nameContains} onChange={handleFormDataChange}/>
                        <label>Min Score Avg</label>
                        <input name={'minScoreAvg'} className={'text-input'} type={'textbox'} value={formData.minScoreAvg} onChange={handleFormDataChange}/>
                        <label>Max Score Avg</label>
                        <input name={'maxScoreAvg'} className={'text-input'} type={'textbox'} value={formData.maxScoreAvg} onChange={handleFormDataChange}/>
                        <label>Min Score Std Dev</label>
                        <input name={'minScoreStd'} className={'text-input'} type={'textbox'} value={formData.minScoreStd} onChange={handleFormDataChange}/>
                        <label>Max Score Std Dev</label>
                        <input name={'maxScoreStd'} className={'text-input'} type={'textbox'} value={formData.maxScoreStd} onChange={handleFormDataChange}/>
                    </div>
                    <button type={'submit'}>Submit</button>
                    <button type={'button'} onClick={resetForm}>Reset</button>
                    <div>
                        <span>Page </span>
                        <input name={'page'} className={'text-input'} type={'textbox'} value={formData.page} onChange={handleFormDataChange}/>
                        <span> of {pageData?.totalPages || 1}</span>
                        <button onClick={decrementPage} type={'button'}>Prev</button>
                        <button onClick={() => incrementPage(pageData?.totalPages || 1)} type={'button'}>Next</button>
                    </div>
                </form>
                <div>
                    {
                        isLoading ? 'Loading...' :
                            isError ? 'An error occurred!' :
                                pageData === null || pageData.content.length === 0 ? 'No matching results ...' :
                                    <div className={'table-container page-tl-container'}>
                                        <DataTable<IPublication> content={pageData.content} config={{
                                            columns: [
                                                {key: 'name', external: 'Name'},
                                                {key: 'scoreAvg', external: 'Score Average'},
                                                {key: 'scoreStd', external: 'Score Standard Deviation'}
                                            ],
                                            idString: 'pubId',
                                            sortConfig: {
                                                sortCol: formData.sort ? formData.sort.split(',')[0] as keyof IPublication : null,
                                                sortDir: !(['', null].includes(formData.sort)) ? formData.sort.split(',')[1] === 'desc' ? 'desc' : 'asc' : 'asc',
                                                toggleSortCol: sortByColumn
                                            }
                                        }}/>
                                    </div>
                    }
                </div>
            </div>
        </>
    )
}