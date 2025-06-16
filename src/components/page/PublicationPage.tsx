import {useParams} from "react-router-dom";

function PublicationPage() {

    const { pubId } = useParams();

    return (
        <div>This is the PublicationPage component with pubId: {pubId}</div>
    )
}

export default PublicationPage;