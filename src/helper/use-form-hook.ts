import {type ChangeEvent, type FormEvent, useState} from "react";
import type {Entity} from "../types/types.ts";

export interface IPagingAndSortingForm {
    page: number,
    sort: string | null
}
type StringProperties<T> = { [K in keyof T]: K extends 'page' ? number : K extends 'sort' ? string | null : string }

/**
 * Use a custom hook for a form extending IPagingAndSortingForm with additional arbitrary form parameters as string
 * values. Provides functions for pagination and sort configuration.
 * @param initial
 */
export function usePagingAndSortingForm<T extends IPagingAndSortingForm & StringProperties<T>, K extends Entity>(initial: T) {
    const [formData, setFormData] = useState(initial);
    const [queryData, setQueryData] = useState(initial);

    function handleFormDataChange(e: ChangeEvent<HTMLInputElement>) {
        const label = e.target.name as keyof T;
        setFormData({...formData, [label]: e.target.value as T[keyof T]});
    }

    function incrementPage(totalPages: number) {
        if (formData.page < totalPages) {
            const newFormData = {...formData, page: formData.page + 1};
            setFormData(newFormData);
            setQueryData(newFormData);
        }
    }

    function decrementPage() {
        if (formData.page > 1) {
            const newFormData = {...formData, page: formData.page - 1};
            setFormData(newFormData);
            setQueryData(newFormData);
        }
    }

    function submitForm(event: FormEvent) {
        event.preventDefault(); // prevent browser from reloading full page on form submission
        const newFormData = {...formData}
        if (formData.page === queryData.page) {
            newFormData.page = 1;
            newFormData.sort = null;
        }
        setFormData(newFormData);
        setQueryData(newFormData);
    }

    function resetForm() {
        setFormData(initial);
        setQueryData(initial);
    }

    function sortByColumn(column: keyof K) {
        const [sortCol, sortDir] = formData.sort ? formData.sort.split(',') : [null, null];
        if (sortCol != column) {
            const newFormData = {...formData, sort: `${column as string},asc`, page: 1}
            setFormData(newFormData);
            setQueryData(newFormData);
        } else if (sortDir === 'asc') {
            const newFormData = {...formData, sort: `${column as string},desc`, page: 1}
            setFormData(newFormData);
            setQueryData(newFormData);
        } else {
            const newFormData = {...formData, sort: null, page: 1}
            setFormData(newFormData);
            setQueryData(newFormData);
        }
    }

    return {
        formData,
        queryData,
        handleFormDataChange,
        submitForm,
        incrementPage,
        decrementPage,
        resetForm,
        sortByColumn
    };
}