import {useState} from "react";
import type {IPublication} from "../types/interfaces.ts";
import type {UrlParams} from "./request-types.ts";

const BASE_URL = 'http://localhost:8080';

type UseApiProps = {
    endpoint: string;
    method: 'GET' | 'POST';
}

function makeQuery(params: UrlParams) {
    return Object.entries(params)
        .map(obj => `${obj[0]}=${obj[1]}`)
        .join('&')
}

export function useApi<T> ({endpoint, method}: UseApiProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<T | null>(null);

    const makeRequest = async (params?: UrlParams)=> {
        setIsLoading(true);
        const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        await sleep(6000);
        const url = endpoint + (params ? '?' + makeQuery(params) : '');
        console.log(`REQUEST: ${url}`);

        const response = await fetch(url, {method});
        const responseData = (await response.json()).content;

        setIsLoading(false);
        setData(responseData);
    }

    return {makeRequest, isLoading, data};
}

export function useGetAllPublications() {
    const {makeRequest, isLoading, data} = useApi<IPublication[]>({
        endpoint: `${BASE_URL}/publication`,
        method: 'GET'
    });
    return {makeRequest, isLoading, data};
}