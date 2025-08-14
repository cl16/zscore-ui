import type {UrlParams} from "./request-types.ts";
import {useEffect, useState} from "react";
import type {IApiResponseJson} from "./request-interfaces.ts";
import type {IGame, IPublication} from "../types/interfaces.ts";

// TODO: remove this sleep, used only for testing states set by useApi()
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

type UseApiProps = {
    endpoint: string;
    method: 'GET' | 'POST';
}

export function buildUrlQuery(params: UrlParams) {
    // make copy and convert 1-indexed page value to 0-indexed value as API format
    const copiedParams = {...params};
    if (copiedParams.page) {
        copiedParams.page = String(Number(copiedParams.page) - 1);
    }
    return Object.entries(copiedParams)
        .filter(obj => obj[1] && obj[1] != null && obj[1] != '')
        .map(obj => `${obj[0]}=${obj[1]}`)
        .join('&')
}

function useApi<T>({endpoint, method}: UseApiProps, params: UrlParams) {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<IApiResponseJson<T> | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(false);
        setIsLoading(true);
        sleep(500).then(() => {
            const url = import.meta.env.VITE_API_BASE_URL + endpoint + (params ? '?' + buildUrlQuery(params) : '');
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

    return {data, isLoading, error};
}

export function useGetPublicationsByParams(initialParams: UrlParams) {
    const {data, isLoading, error} = useApi<IPublication>({
        endpoint: `publication`,
        method: 'GET'
    }, initialParams);
    return {data, isLoading, error};
}

export function useGetGamesByParams(initialParams: UrlParams) {
    const {isLoading, data, error} = useApi<IGame>({
        endpoint: `game`,
        method: 'GET'
    }, initialParams);
    return {data, isLoading, error};
}