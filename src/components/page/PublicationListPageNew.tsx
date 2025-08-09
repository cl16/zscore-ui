import {useFormData} from "../../helper/use-form-hook.ts";
import {useGetPublicationsByParams} from "../../api/use-api-hook.ts";
import {type FormEvent, useState} from "react";

export function PublicationListPageNew() {

    const DEFAULT_FORM = {
        nameContains: '',
        minScoreAvg: '',
        maxScoreAvg: ''
    };

    const [isPreQuery, setIsPreQuery] = useState(true);

    const {formData, handleFormDataChange} = useFormData(DEFAULT_FORM);

    const {makeRequest, isLoading, data: pageData, error: isError} = useGetPublicationsByParams();

    async function handleFormSubmit(event: FormEvent) {
        // must stop the browser from reloading the page on form submit
        event.preventDefault();
        setIsPreQuery(false);
        const entries = Object.entries(formData);
        for (const entry of entries) {
            console.log(`${entry[0]}: ${entry[1]}`);
        }
        await makeRequest(formData);
    }

    return (
        <>
            <div className={'page-body-main'}>

                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label>Search</label>
                        <input id={'searchString'} name={'nameContains'} className={'text-input'} type={'textbox'} value={formData.searchString} onChange={handleFormDataChange}/>
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
                </form>

                <div>
                    {
                        isPreQuery ? 'Choose query parameters' :
                        isLoading ? 'Loading ...' : (
                            isError ? 'An error occurred. Please modify query or try again.' : (
                            pageData === null || pageData.length === 0 ? 'No matching results ...' :
                                pageData.map(row => {
                                    return <div key={row.pubId}>{row.name}</div>
                                })
                        ))
                    }
                </div>
            </div>
        </>
    )
}