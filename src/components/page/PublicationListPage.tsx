import {useGetPublicationsByParams} from "../../api/use-api-hook.ts";
import {usePagingAndSortingForm} from "../../helper/use-form-hook.ts";
import DataTable from "../table/DataTable.tsx";
import type {IPublication} from "../../types/interfaces.ts";
import {extractPatterns, InputValidation} from "../../helper/input-validation-patterns.ts";

interface IPublicationListPageForm {
    nameContains: string,
    minScoreAvg: string,
    maxScoreAvg: string,
    minScoreStd: string,
    maxScoreStd: string,
}

function PublicationListPage() {

    const DEFAULT_FORM = {
        nameContains: '',
        minScoreAvg: '',
        maxScoreAvg: '',
        minScoreStd: '',
        maxScoreStd: ''
    };

    const formPatterns = {
        nameContains: InputValidation.ANY,
        minScoreAvg: InputValidation.NUMBER,
        maxScoreAvg: InputValidation.NUMBER,
        minScoreStd: InputValidation.NUMBER,
        maxScoreStd: InputValidation.NUMBER
    }

    const {
        formData,
        formValidity,
        queryData,
        handleFormDataChange,
        submitForm,
        incrementPage,
        decrementPage,
        resetForm,
        sortByColumn
    } = usePagingAndSortingForm<IPublicationListPageForm, IPublication>(
        DEFAULT_FORM,
        extractPatterns(formPatterns)
    );
    const {data: pageData, isLoading, error: isError} = useGetPublicationsByParams(queryData);

    return (
        <>
            <div className={'page-body-main'}>
                <form onSubmit={submitForm}>
                    <div>
                        <div>
                            <label>Name Contains</label>
                            <input name={'nameContains'} className={formValidity.nameContains ? 'text-input' : 'text-input-invalid'} type={'textbox'} value={formData.nameContains} onChange={handleFormDataChange}/>
                            {formValidity.nameContains ? null : <span>formPatterns.nameContains</span>}
                        </div>
                        <div>
                            <label>Min Score Avg</label>
                            <input name={'minScoreAvg'} className={formValidity.minScoreAvg ? 'text-input' : 'text-input-invalid'} type={'textbox'} value={formData.minScoreAvg} onChange={handleFormDataChange}/>
                            {formValidity.minScoreAvg ? null: <span>{formPatterns.minScoreAvg.desc}</span>}
                        </div>
                        <div>
                            <label>Max Score Avg</label>
                            <input name={'maxScoreAvg'} className={formValidity.maxScoreAvg ? 'text-input' : 'text-input-invalid'} type={'textbox'} value={formData.maxScoreAvg} onChange={handleFormDataChange}/>
                            {formValidity.maxScoreAvg ? null: <span>{formPatterns.maxScoreAvg.desc}</span>}
                        </div>
                        <div>
                            <label>Min Score Std Dev</label>
                            <input name={'minScoreStd'} className={formValidity.minScoreStd ? 'text-input' : 'text-input-invalid'} type={'textbox'} value={formData.minScoreStd} onChange={handleFormDataChange}/>
                            {formValidity.minScoreStd ? null: <span>{formPatterns.minScoreStd.desc}</span>}
                        </div>
                        <div>
                            <label>Max Score Std Dev</label>
                            <input name={'maxScoreStd'} className={formValidity.maxScoreStd ? 'text-input' : 'text-input-invalid'} type={'textbox'} value={formData.maxScoreStd} onChange={handleFormDataChange}/>
                            {formValidity.maxScoreStd ? null: <span>{formPatterns.maxScoreStd.desc}</span>}
                        </div>
                    </div>
                    <button type={'submit'} disabled={Object.values(formValidity).some((valid) => !valid)}>Submit</button>
                    <button type={'button'} onClick={resetForm}>Reset</button>
                    <div>
                        <span>Page </span>
                        <input name={'page'} className={'text-input'} type={'textbox'} value={formData.page} onChange={handleFormDataChange}/>
                        <span> of {pageData?.totalPages || 1}</span>
                        <button type={'button'} onClick={decrementPage}>Prev</button>
                        <button type={'button'} onClick={() => incrementPage(pageData?.totalPages || 1)}>Next</button>
                        <span> {pageData?.totalElements || 0} total results</span>
                    </div>
                </form>
                <div>
                    <div className={'table-container page-tl-container'}>
                        {
                            isLoading ? <div>Loading ...</div> :
                                isError ? <div>An error occurred! Please try again or try another query.</div> :
                                    pageData === null || pageData.content.length === 0 ? <div>Nothing to see here ...</div> :

                                            <DataTable<IPublication> content={pageData.content} config={{
                                                columns: [
                                                    {key: 'name', external: 'Name'},
                                                    {key: 'scoreAvg', external: 'Score Average'},
                                                    {key: 'scoreStd', external: 'Score Standard Deviation'}
                                                ],
                                                idString: 'pubId',
                                                sortConfig: {
                                                    sortCol: formData.sort ? formData.sort.split(',')[0] as keyof IPublication : null,
                                                    sortDir: formData.sort ? formData.sort.split(',')[1] as 'asc' | 'desc' : null,
                                                    toggleSortCol: sortByColumn
                                                }
                                            }}/>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default PublicationListPage;