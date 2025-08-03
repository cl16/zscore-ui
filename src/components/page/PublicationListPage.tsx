import {useGetAllPublications} from "../../api/use-api-hook.ts";


function PublicationListPage() {
    const {makeRequest, isLoading, data} = useGetAllPublications();

    async function requestData() {
        await makeRequest({
            page: 1
        })
    }

    return (
        <>
            <div className={'page-body-main'}>
                <div>PublicationListPage Test</div>

                <button onClick={requestData}>Request Data</button>

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