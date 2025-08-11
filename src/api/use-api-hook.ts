import type {UrlParams} from "./request-types.ts";
import {useEffect, useState} from "react";
import type {IApiResponseJson} from "./request-interfaces.ts";
import type {IGame, IPublication} from "../types/interfaces.ts";


const BASE_URL = 'http://localhost:8080';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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

function useApi<T>({endpoint, method}: UseApiProps, initialParams: UrlParams) {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<IApiResponseJson<T> | null>(null);
    const [error, setError] = useState(false);
    const [params, setParams] = useState(initialParams)

    useEffect(() => {
        setError(false);
        setIsLoading(true);

        sleep(500).then(() => {
            const url = endpoint + (params ? '?' + makeQuery(params) : '');
            console.log(`REQUEST: ${url}`);

            fetch(url, {method})
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
        });

    }, [params]);

    return {setParams, data, isLoading, error};
}

export function useGetPublicationsByParams(initialParams: UrlParams) {
    const {setParams, data, isLoading, error} = useApi<IPublication>({
        endpoint: `${BASE_URL}/publication`,
        method: 'GET'
    }, initialParams);
    return {setParams, isLoading, data, error};
}

export function useGetGamesByParams(initialParams: UrlParams) {
    const {setParams, isLoading, data, error} = useApi<IGame>({
        endpoint: `${BASE_URL}/game`,
        method: 'GET'
    }, initialParams);
    return {setParams, isLoading, data, error};
}