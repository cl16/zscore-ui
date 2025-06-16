import {useParams} from "react-router-dom";

function PublicationPage() {

    const { pubId } = useParams();

    return (
        <div className={'page-body-main'}>This is the PublicationPage component with pubId: {pubId}</div>
    )
}

export default PublicationPage;