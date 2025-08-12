import {usePaginatingFormData} from "../../helper/use-form-hook.ts";
import {type FormEvent} from "react";
import {useGetPublicationsByParams} from "../../api/use-api-hook.ts";

export function PublicationListPageNew() {

    const DEFAULT_FORM = {
        nameContains: '',
        minScoreAvg: '',
        maxScoreAvg: '',
        page: '1'
    };

    const {
        formData,
        handleFormDataChange,
        incrementPage,
        decrementPage
    } = usePaginatingFormData(DEFAULT_FORM);

    const {isLoading, data: pageData, error: isError} = useGetPublicationsByParams(formData);

    function handleFormSubmit(event: FormEvent) {
        // must stop the browser from reloading the page on form submit
        event.preventDefault();
        const entries = Object.entries(formData);
        for (const entry of entries) {
            console.log(`${entry[0]}: ${entry[1]}`);
        }
        // setParams(formData);
    }

    // replace this in the onClick for next page button: () => incrementPage(pageData?.totalPages || 1)
    function testPageIncr(event: FormEvent) {
        console.log(`non-updated page value would be: ${Number(formData.page) - 1}`);
        const newFormData = {...formData, page: Number(formData.page) + 1};

        // setParams(newFormData);
        // incrementPage(pageData?.totalPages || 1);
        // handleFormSubmit(event)
    }


    return (
        <>
            <div className={'page-body-main'}>

                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label>Search</label>
                        <input id={'searchString'} name={'nameContains'} className={'text-input'} type={'textbox'} value={formData.nameContains} onChange={handleFormDataChange}/>
                    </div>
                    <div>
                        <label>Min Score Avg</label>
                        <input id={'minScoreAvg'} name={'minScoreAvg'} className={'text-input'} type={'textbox'} value={formData.minScoreAvg} onChange={handleFormDataChange}/>
                    </div>
                    <div>
                        <label>Max Score Avg</label>
                        <input id={'maxScoreAvg'} name={'maxScoreAvg'} className={'text-input'} type={'textbox'} value={formData.maxScoreAvg} onChange={handleFormDataChange}/>
                    </div>
                    <button type={'submit'}>Apply</button>
                    <div>
                        <span>Page</span>
                        <input id={'page'} name={'page'} className={'text-input'} type={'textbox'} value={formData.page} onChange={handleFormDataChange}/>
                        <span>of {pageData?.totalPages || '1'}</span>
                        <button onClick={decrementPage} type={'button'}>Prev</button>
                        <button onClick={() => incrementPage(pageData?.totalPages || 1)} type={'button'}>Next</button>
                    </div>
                </form>

                <div>
                    {
                        isLoading ? 'Loading ...' : (
                            isError ? 'An error occurred. Please modify query or try again.' : (
                                pageData === null || pageData.content.length === 0 ? 'No matching results ...' :
                                    pageData.content.map(row => {
                                        return <div key={row.pubId}>{row.name}</div>
                                    })
                            )
                        )
                    }
                </div>
            </div>
        </>
    )
}