import {type ChangeEvent, type FormEvent, useEffect, useState} from "react";
import {makeQuery} from "../../api/use-api-hook.ts";
import type {IPublication} from "../../types/interfaces.ts";
import type {IApiResponseJson} from "../../api/request-interfaces.ts";

interface IFormData {
    [key: string]: string | number;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function PublicationListPageV3() {

    const DEFAULT_FORM = {
        nameContains: '',
        page: 1
    };

    const [formData, setFormData] = useState<IFormData>(DEFAULT_FORM);
    const [queryForm, setQueryForm] = useState<IFormData>(DEFAULT_FORM)
    const [pageData, setPageData] = useState<IApiResponseJson<IPublication> | null>(null);

    useEffect(() => {
        const url = `http://localhost:8080/publication` + (queryForm ? '?' + makeQuery(queryForm) : '');
        fetch(url, {method: 'GET'})
            .then(async response => {
                setPageData(await response.json());
            })
    }, [queryForm]);

    function handleFormDataChange(e: ChangeEvent<HTMLInputElement>) {
        const label = e.target.name;
        setFormData({...formData, [label]: e.target.value});
    }

    function handleFormSubmit(event: FormEvent) {
        event.preventDefault();
        console.log('Form submitted');
        setQueryForm({...formData});
    }

    async function incrementPage(totalPages: number) {
        if (Number(formData.page) < totalPages) {
            const newFormData = {...formData, page: Number(formData.page) + 1};
            // REACT WILL BATCH THESE 2 STATE UPDATES INTO ONLY 1 RENDER
            setFormData(newFormData);
            setQueryForm(newFormData);
        }

    }

    function decrementPage() {
        if (Number(formData.page) > 1) {
            const newFormData = {...formData, page: Number(formData.page) - 1};
            setFormData(newFormData);
            setQueryForm(newFormData);
        }
    }

    console.log('component called!');
    return (
        <>
            <div className={'page-body-main'}>
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label>Name Contains</label>
                        <input name={'nameContains'} className={'text-input'} type={'textbox'} value={formData.nameContains} onChange={handleFormDataChange}/>
                    </div>
                    <button type={'submit'}>Submit</button>
                    <div>
                        <input name={'page'} className={'text-input'} type={'textbox'} value={formData.page} onChange={handleFormDataChange}/>
                        <button onClick={decrementPage} type={'button'}>Prev</button>
                        <button onClick={() => incrementPage(pageData?.totalPages || 1)} type={'button'}>Next</button>
                    </div>
                </form>
                <div>
                    {
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