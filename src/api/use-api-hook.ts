import {useState} from "react";

type UseApiProps = {
    url: string;
    method: 'GET' | 'POST';
}

export function useApi<T> ({url, method}: UseApiProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<T | null>(null);

    const makeRequest = async ()=> {
        setIsLoading(true);
        const response = await fetch(
            url,
            {method}
        )
        const responseData = await response.json();
        setIsLoading(false);
        setData(responseData);
    }

    return {makeRequest, isLoading, data};
}