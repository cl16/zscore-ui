import {type ChangeEvent, type FormEvent, useState} from "react";
import type {Entity} from "../types/types.ts";

export interface IPaginatingFormData {
    page: number,
    sort: string
}
type StringProperties<T> = { [K in keyof T]: K extends 'page' ? number : string }

export function usePaginatingFormData<T extends IPaginatingFormData & StringProperties<T>, K extends Entity>(initial: T) {
    const [formData, setFormData] = useState(initial);
    const [queryData, setQueryData] = useState(initial);
    const [sortCol, setSortCol] = useState<keyof K | null>(null);
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

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
        event.preventDefault();
        const newFormData = {...formData}
        if (formData.page === queryData.page) {
            newFormData.page = 1;
        }
        setFormData(newFormData);
        setQueryData(newFormData);
    }

    function resetForm() {
        setFormData(initial);
        setQueryData(initial);
    }

    function sortByColumn(column: keyof K) {
        if (sortCol != column) {
            const newFormData = {...formData, sort: `${column as string},asc`, page: 1}
            setSortCol(column);
            setSortDir('asc');
            setFormData(newFormData);
            setQueryData(newFormData);
        } else if (sortDir === 'asc') {
            const newFormData = {...formData, sort: `${column as string},desc`, page: 1}
            setSortDir('desc');
            setFormData(newFormData);
            setQueryData(newFormData);
        } else {
            const newFormData = {...formData, sort: null, page: 1}
            setSortCol(null);
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