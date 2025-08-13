import {useGetPublicationsByParams} from "../../api/use-api-hook.ts";
import {type IPaginatingFormData, usePaginatingFormData} from "../../helper/use-form-hook.ts";

interface IPublicationListPageForm extends IPaginatingFormData {
    nameContains: string,
    minScoreAvg: string,
    maxScoreAvg: string,
}

export function PublicationListPageV4() {

    const DEFAULT_FORM = {
        nameContains: '',
        minScoreAvg: '',
        maxScoreAvg: '',
        page: 1
    };

    const {
        formData,
        queryData,
        handleFormDataChange,
        submitForm,
        incrementPage,
        decrementPage,
        resetForm
    } = usePaginatingFormData<IPublicationListPageForm>(DEFAULT_FORM);
    const {data: pageData, isLoading, error: isError} = useGetPublicationsByParams(queryData);

    console.log('component called!');
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
                            pageData.content.map(row => {
                                return <div key={row.pubId}>{row.name}</div>
                            })
                    }
                </div>
            </div>
        </>
    )
}