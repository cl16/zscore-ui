import {useParams} from "react-router-dom";
import type {IStatReviewParams} from "../../api/request-interfaces.ts";
import {usePagingAndSortingForm} from "../../helper/use-form-hook.ts";
import type {IPublication, IStatReview} from "../../types/interfaces.ts";
import {extractPatterns, type FormPatternSet, InputValidation} from "../../helper/input-validation-patterns.ts";
import {useGetStatReviewsByParams} from "../../api/use-api-hook.ts";
import DataTable from "../table/DataTable.tsx";
import DataTableContainer from "../table/DataTableContainer.tsx";

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

    const { pubId } = useParams<PublicationUrlParams>();

    const formPatterns : FormPatternSet<Omit<IPublicationPageForm, 'pubId' | 'gameId' | 'pubNameContains'>> = {
        gameTitleContains: InputValidation.ANY,
        minScore: InputValidation.NUMBER_ZERO_TO_ONE_HUNDRED,
        maxScore: InputValidation.NUMBER_ZERO_TO_ONE_HUNDRED,
        minZscore: InputValidation.NUMBER,
        maxZscore: InputValidation.NUMBER
    };

    const DEFAULT_FORM : IPublicationPageForm = {
        pubId: pubId || '',  // TODO: handle pubId being undefined differently?
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

    return (
        <>
            <div className={'table-container page-tl-container'}>
                <DataTableContainer isLoading={isLoading} isError={isError} pageData={pageData} dataTableConfig={{
                    columns: [
                        {accessor: 'game_title', label: 'Title'},
                        {accessor: 'date', label: 'Date'},
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
        </>

    )
}

export default PublicationPage;