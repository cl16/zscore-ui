import {useParams} from "react-router-dom";
import {usePagingAndSortingForm} from "../../helper/use-form-hook.ts";
import type {IStatReview} from "../../types/interfaces.ts";
import {extractPatterns, type FormPatternSet, InputValidation} from "../../helper/input-validation-patterns.ts";
import {useGetPublicationById, useGetStatReviewsByParams} from "../../api/use-api-hook.ts";
import DataTableContainer from "../table/DataTableContainer.tsx";
import {useEffect} from "react";
import Select from "../Select.tsx";

type PublicationUrlParams = {
    pubId: string;
    [key: string]: string;
}

interface IPublicationPageForm {
    pubId: string,
    gameId: string,
    pubNameContains: string,
    gameTitleContains: string,
    minScore: string,
    maxScore: string,
    minZscore: string,
    maxZscore: string
}

function PublicationPage() {

    let { pubId } = useParams<PublicationUrlParams>();

    pubId = pubId ? pubId : '';

    const {data: publicationDetails, isLoading: publicationDetailsIsLoading, error: publicationDetailsIsError} = useGetPublicationById(pubId); // TODO: How should an undefined pubID be handled here and on this page overall?

    const formPatterns : FormPatternSet<Omit<IPublicationPageForm, 'pubId' | 'gameId' | 'pubNameContains'>> = {
        gameTitleContains: InputValidation.ANY,
        minScore: InputValidation.NUMBER_ZERO_TO_ONE_HUNDRED,
        maxScore: InputValidation.NUMBER_ZERO_TO_ONE_HUNDRED,
        minZscore: InputValidation.NUMBER,
        maxZscore: InputValidation.NUMBER
    };

    const DEFAULT_FORM : IPublicationPageForm = {
        pubId: pubId,
        gameId: '',
        pubNameContains: '',
        gameTitleContains: '',
        minScore: '',
        maxScore: '',
        minZscore: '',
        maxZscore: ''
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
    } = usePagingAndSortingForm<IPublicationPageForm, IStatReview>(
        DEFAULT_FORM,
        extractPatterns(formPatterns)
    );

    const {data: pageData, isLoading, error: isError} = useGetStatReviewsByParams(queryData);

    useEffect(() => {
        setMaxPage(pageData?.totalPages || 1);
    }, [pageData?.totalPages, setMaxPage])

    return (
        <>
            <div className={'page-body-main'}>
                <div className={'publication-detail-section'}>
                    {
                        publicationDetailsIsLoading ? <div>Loading ...</div> :
                            publicationDetailsIsError ? <div>An error occurred!</div> :
                                publicationDetails === null ? <div>No results to display ...</div> :
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Publication</th>
                                                <th>Score Avg</th>
                                                <th>Score Std Dev</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{publicationDetails.name}</td>
                                                <td>{publicationDetails.scoreAvg}</td>
                                                <td>{publicationDetails.scoreStd}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                    }
                </div>
                <form onSubmit={submitForm}>
                    <div>
                        <div>
                            <label>Game Title Contains</label>
                            <input name={'gameTitleContains'} className={formValidity.gameTitleContains ? 'text-input' : 'text-input-invalid'} type={'textbox'} value={formData.gameTitleContains} onChange={handleFormDataChange}/>
                            {formValidity.gameTitleContains ? null : <span>formPatterns.gameTitleContains</span>}
                        </div>
                        <div>
                            <label>Min Score</label>
                            <input name={'minScore'} className={formValidity.minScore ? 'text-input' : 'text-input-invalid'} type={'textbox'} value={formData.minScore} onChange={handleFormDataChange}/>
                            {formValidity.minScore ? null : <span>formPatterns.minScore</span>}
                        </div>
                        <div>
                            <label>Max Score</label>
                            <input name={'maxScore'} className={formValidity.maxScore ? 'text-input' : 'text-input-invalid'} type={'textbox'} value={formData.maxScore} onChange={handleFormDataChange}/>
                            {formValidity.maxScore ? null : <span>formPatterns.maxScore</span>}
                        </div>
                        <div>
                            <label>Min Z-Score</label>
                            <input name={'minZscore'} className={formValidity.minZscore ? 'text-input' : 'text-input-invalid'} type={'textbox'} value={formData.minZscore} onChange={handleFormDataChange}/>
                            {formValidity.minZscore ? null : <span>formPatterns.minZscore</span>}
                        </div>
                        <div>
                            <label>Max Z-Score</label>
                            <input name={'maxZscore'} className={formValidity.maxZscore ? 'text-input' : 'text-input-invalid'} type={'textbox'} value={formData.maxZscore} onChange={handleFormDataChange}/>
                            {formValidity.maxZscore ? null : <span>formPatterns.maxZscore</span>}
                        </div>
                    </div>
                    <button type={'submit'} disabled={Object.values(formValidity).some((valid) => !valid)}>Submit</button>
                    <button type={'button'} onClick={resetForm}>Reset</button>
                    <div>
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
                    <DataTableContainer isLoading={isLoading} isError={isError} pageData={pageData} dataTableConfig={{
                        columns: [
                            {accessor: 'game_title', label: 'Title'},
                            {accessor: 'date', label: 'Date', modifier: (val: string) => val.split('T')[0]},
                            {accessor: 'score', label: 'Score'},
                            {accessor: 'zscore', label: 'Z-Score'}
                        ],
                        idString: 'id',
                        sortConfig: {
                            sort: formData.sort,
                            toggleSortCol: sortByColumn
                        }
                    }}/>
                </div>
            </div>
        </>

    )
}

export default PublicationPage;