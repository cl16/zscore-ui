import {useState} from "react";
import type {IGame, IPublication} from "../types/interfaces.ts";
import type {UrlParams} from "./request-types.ts";
import type {IApiResponseJson} from "./request-interfaces.ts";

const BASE_URL = 'http://localhost:8080';

type UseApiProps = {
    endpoint: string;
    method: 'GET' | 'POST';
}

function makeQuery(params: UrlParams) {
    // make copy and convert 1-indexed page value to 0-indexed value for API/db
    const copiedParams = {...params};
    if (copiedParams.page) {
        copiedParams.page = String(Number(copiedParams.page) - 1);
    }
    return Object.entries(copiedParams)
        .filter(obj => obj[1] && obj[1] != null && obj[1] != '')
        .map(obj => `${obj[0]}=${obj[1]}`)
        .join('&')
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function useApi<T> ({endpoint, method}: UseApiProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<IApiResponseJson<T> | null>(null);
    const [error, setError] = useState(false);

    const makeRequest = async (params?: UrlParams)=> {
        setError(false);
        setIsLoading(true);

        await sleep(500); // sleep to test loading state

        const url = endpoint + (params ? '?' + makeQuery(params) : '');
        console.log(`REQUEST: ${url}`);

        await fetch(url, {method})
            .then(async response => {
                console.log(`RESPONSE: ${response.status}`);
                if (response.status == 200 || response.status == 404) {
                    setIsLoading(false);
                    setData((await response.json()));
                } else {
                    setIsLoading(false);
                    setError(true);
                }
            })
            .catch(error => {
                console.log(error);
                setError(true);
            });
    }

    return {makeRequest, isLoading, data, error};
}

export function useGetPublicationsByParams() {
    const {makeRequest, isLoading, data, error} = useApi<IPublication>({
        endpoint: `${BASE_URL}/publication`,
        method: 'GET'
    });
    return {makeRequest, isLoading, data, error};
}

export function useGetGamesByParams() {
    const {makeRequest, isLoading, data, error} = useApi<IGame>({
        endpoint: `${BASE_URL}/game`,
        method: 'GET'
    });
    return {makeRequest, isLoading, data, error};
}



