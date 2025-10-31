import {type ChangeEvent, type FormEvent, useState} from "react";
import type {Entity} from "../types/types.ts";

export interface IPagingAndSortingForm {
    page: number,
    sort: string | null
}
type StringProperties<T> = { [K in keyof T]: string }

function validate(pattern: string, value: string) {
    return new RegExp(pattern).test(value);
}

function newFormValidity<T extends StringProperties<T>>(initial: T) {
    return Object.fromEntries(Object.keys(initial).map(key => [key, true]))
}

/**
 * Use a custom hook for a form extending IPagingAndSortingForm with additional arbitrary form parameters as string
 * values. Provides functions for pagination and sort configuration.
 * @param
 */
export function usePagingAndSortingForm<T extends StringProperties<T>, K extends Entity>(initial: T, patterns: T) {
    const initialFormData: IPagingAndSortingForm & StringProperties<T> = {...initial, page: 1, sort: null};
    const [formData, setFormData] = useState(initialFormData);
    const [formValidity, setFormValidity] = useState(newFormValidity(initial));
    const [queryData, setQueryData] = useState(formData);

    function handleFormDataChange(e: ChangeEvent<HTMLInputElement>) {
        const label = e.target.name as keyof T;
        const newValue = e.target.value as StringProperties<T>[keyof T];
        setFormData({...formData, [label]: newValue});
        setFormValidity({...formValidity, [label]: validate(patterns[label], newValue)})
    }

    function incrementPage(totalPages: number) {
        const formDataPageNum = Number(formData.page);
        if (formDataPageNum < totalPages) {
            const newFormData = {...formData, page: formDataPageNum + 1};
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
        setFormData(initialFormData);
        setFormValidity(newFormValidity(initial));
        setQueryData(initialFormData); // initialFormData adds page/sort to initial, must be formData
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
        formValidity,
        queryData,
        handleFormDataChange,
        submitForm,
        incrementPage,
        decrementPage,
        resetForm,
        sortByColumn
    };
}