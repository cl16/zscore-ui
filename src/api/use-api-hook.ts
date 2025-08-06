import {useState} from "react";
import type {IGame, IPublication} from "../types/interfaces.ts";
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

function useApi<T> ({endpoint, method}: UseApiProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState(false);

    const makeRequest = async (params?: UrlParams)=> {
        setIsLoading(true);
        const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        await sleep(2000); // sleep to test loading state

        const url = endpoint + (params ? '?' + makeQuery(params) : '');
        console.log(`REQUEST: ${url}`);

        await fetch(url, {method})
            .then(async response => {
                console.log(`RESPONSE: ${response.status}`);
                if (response.status == 200 || response.status == 404) {
                    setIsLoading(false);
                    setData((await response.json()).content);
                } else {
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
    const {makeRequest, isLoading, data, error} = useApi<IPublication[]>({
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



