import type {IDataTableContainerConfig} from "../../types/interfaces.ts";
import DataTable from "./DataTable.tsx";


function DataTableContainer<T>({
    isLoading,
    isError,
    pageData,
    dataTableConfig
} : IDataTableContainerConfig<T>) {
    return (
        <>
            {
                isLoading ? <div>Loading ...</div> :
                    isError ? <div>An error occurred!</div> :
                        pageData === null || pageData.content.length === 0 ? <div>No results to display ...</div> :
                            <DataTable<T> content={pageData.content} config={dataTableConfig}/>
            }
        </>
    )
}

export default DataTableContainer;