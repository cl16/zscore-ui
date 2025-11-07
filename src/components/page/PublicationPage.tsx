import {useParams} from "react-router-dom";
import type {IStatReviewParams} from "../../api/request-interfaces.ts";
import {usePagingAndSortingForm} from "../../helper/use-form-hook.ts";
import type {IPublication, IStatReview} from "../../types/interfaces.ts";
import {extractPatterns, type FormPatternSet, InputValidation} from "../../helper/input-validation-patterns.ts";
import {useGetStatReviewsByParams} from "../../api/use-api-hook.ts";

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

    let DEFAULT_FORM : IPublicationPageForm;
    const formPatterns : FormPatternSet<Omit<IPublicationPageForm, 'pubId' | 'gameId' | 'pubNameContains'>> = {
        gameTitleContains: InputValidation.ANY,
        minScore: InputValidation.NUMBER_ZERO_TO_ONE_HUNDRED,
        maxScore: InputValidation.NUMBER_ZERO_TO_ONE_HUNDRED,
        minZscore: InputValidation.NUMBER,
        maxZscore: InputValidation.NUMBER
    };

    DEFAULT_FORM = {
        pubId: pubId || '',
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
            <div className={'page-body-main'}>This is the PublicationPage component with pubId: {pubId}</div>
            <div>
                {pageData?.content.map((col, i) => {
                    return (
                        <div>{col.game.title}</div>
                    )
                })}
            </div>
        </>


    )
}

export default PublicationPage;