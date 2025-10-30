import {type ChangeEvent, type FormEvent, useState} from "react";
import type {Entity} from "../types/types.ts";

export interface IPagingAndSortingForm {
    page: number,
    sort: string | null
}
type StringProperties<T> = { [K in keyof T]: K extends 'page' ? number : K extends 'sort' ? string | null : string }

function reduceFormToQuery(formData) {
    return Object.fromEntries(
        Object.keys(formData).map(key => [key, formData[key]['value']])
    )
}

function validate(pattern: string, value: string) {
    return new RegExp(pattern).test(value);
}

/**
 * Use a custom hook for a form extending IPagingAndSortingForm with additional arbitrary form parameters as string
 * values. Provides functions for pagination and sort configuration.
 * @param baseForm
 */
export function usePagingAndSortingForm<T extends StringProperties<T>, K extends Entity>(baseForm: T) {
    const initial = {
        ...Object.fromEntries(
            Object.entries(baseForm).map(([key, val]) => [
                key,
                {value: val.defaultValue, valid: true}
            ])
        ),
        page: {value: 1, valid: true},
        sort: {value: null, valid: true}
    };
    const [formData, setFormData] = useState(initial);
    const [queryData, setQueryData] = useState(reduceFormToQuery(initial));

    function handleFormDataChange(e: ChangeEvent<HTMLInputElement>) {
        const label = e.target.name as keyof T;
        const newValue = e.target.value as StringProperties<T>[keyof T];
        const validationPattern = baseForm[label]['validationPattern'];
        const newData = {...formData, [label]: {value: newValue, valid: validate(validationPattern, newValue)}};
        setFormData(newData);
    }

    function incrementPage(totalPages: number) {
        const formDataPageNum = Number(formData.page.value);
        if (formDataPageNum < totalPages) {
            const newFormData = {...formData, page: {value: formDataPageNum + 1, valid: true}};
            setFormData(newFormData);
            setQueryData(reduceFormToQuery(newFormData));
        }
    }

    function decrementPage() {
        if (formData.page.value > 1) {
            const newFormData = {...formData, page: {value: formData.page.value - 1, valid: true}};
            setFormData(newFormData);
            setQueryData(reduceFormToQuery(newFormData));
        }
    }

    function submitForm(event: FormEvent) {
        event.preventDefault(); // prevent browser from reloading full page on form submission
        const newFormData = {...formData}
        if (formData.page.value === queryData.page) {
            newFormData.page.value = 1;
            newFormData.sort.value = null;
        }
        setFormData(newFormData);
        setQueryData(reduceFormToQuery(newFormData));
    }

    function resetForm() {
        setFormData(initial);
        setQueryData(reduceFormToQuery(initial));
    }

    function sortByColumn(column: keyof K) {
        const [sortCol, sortDir] = formData.sort.value ? formData.sort.value.split(',') : [null, null];
        if (sortCol != column) {
            const newFormData = {...formData, sort: {value: `${column as string},asc`, valid: true}, page: {value: 1, valid: true}}
            setFormData(newFormData);
            setQueryData(reduceFormToQuery(newFormData));
        } else if (sortDir === 'asc') {
            const newFormData = {...formData, sort: `${column as string},desc`, page: 1}
            setFormData(newFormData);
            setQueryData(reduceFormToQuery(newFormData));
        } else {
            const newFormData = {...formData, sort: null, page: 1}
            setFormData(newFormData);
            setQueryData(reduceFormToQuery(newFormData));
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