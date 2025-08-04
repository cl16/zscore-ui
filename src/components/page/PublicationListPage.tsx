import {useGetAllPublications} from "../../api/use-api-hook.ts";
import type {IPublication} from "../../types/interfaces.ts";
import {useState} from "react";
import {handleFormValue} from "../../helper/page-data.tsx";

interface PageState {
    page: number;
    searchString: string | null;
    minScoreAvg: string | null;
    maxScoreAvg: string | null;
    minScoreStd: string | null;
    maxScoreStd: string | null;
    sortCol: keyof IPublication | null;
    sortDir: 'asc' | 'desc';
}



function PublicationListPage() {

    const DEFAULT_PAGE_STATE: PageState = {
        page: 1,
        searchString: null,
        minScoreAvg: null,
        maxScoreAvg: null,
        minScoreStd: null,
        maxScoreStd: null,
        sortCol: null,
        sortDir: 'asc'
    }

    // form/query data that gets sent with API
    const [pageState, setPageState] = useState(DEFAULT_PAGE_STATE);

    // page data that gets sent from API to page
    const {makeRequest, isLoading, data} = useGetAllPublications();
    const [totalPages, setTotalPages] = useState(0);

    // page data that is used only for managing page/UI elements
    const [pageInput, setPageInput] = useState('1');

    // errors on form
    const pageRegex = new RegExp('[1-9][0-9]*');
    const [pageError, setPageError] = useState(false);

    function getFormData() {

    }

    async function handleStateChange(formData: FormData) {
        console.log('handleStateChanged called');
        await makeRequest({
            nameContains: handleFormValue(formData.get('search-string'))
        });
    }

    return (
        <>
            <div className={'page-body-main'}>
                <form action={handleStateChange}>
                    <div>
                        <label htmlFor={'search-string'}>Search</label>
                        <input id={'search-string'} name={'search-string'} className={'text-input'} type={'textbox'} defaultValue={pageState.searchString || undefined}/>
                    </div>
                    <div>
                        <label htmlFor={'page-number'}>Page</label>
                        {pageError ? <div>PAGE ERROR!!!</div> : ''}
                        <input id={'page-number'} name={'page'} className={'text-input'} type={'textbox'} value={pageState.page} onChange={e => {
                            console.log(`setting page value: ${e.target.value}`);
                            if (pageRegex.test(e.target.value)) {
                                setPageError(true);
                            } else {
                                const newPageState = {...pageState};
                                newPageState.page = Number(e.target.value);
                                setPageState(newPageState);
                            }
                        }}/>
                    </div>
                    <div>
                        <button type={'submit'}>Apply</button>
                    </div>
                </form>

                {isLoading ? <div>Loading data ...</div> : data === null ? <div></div> :
                    data.map(row => {
                        return (
                            <div>{row.name}</div>
                        )
                    })
                }

            </div>
        </>
    )
}

export default PublicationListPage;