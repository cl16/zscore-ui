import {type ChangeEvent, type FormEvent, useState} from "react";

export interface IPaginatingFormData { page: number; }
type StringProperties<T> = { [K in keyof T]: K extends 'page' ? number : string }

export function usePaginatingFormData<T extends IPaginatingFormData & StringProperties<T>>(initial: T) {
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

    return {
        formData,
        queryData,
        handleFormDataChange,
        submitForm,
        incrementPage,
        decrementPage,
        resetForm,
    };
}