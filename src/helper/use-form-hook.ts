import {type ChangeEvent, useState} from "react";

export function useFormData(initial: {[key: string]: string}) {
    const [formData, setFormData] = useState(initial);

    function handleFormDataChange(e: ChangeEvent<HTMLInputElement>) {
        const label = e.target.name;
        const newFormData = {...formData};
        newFormData[label] = e.target.value;
        setFormData(newFormData);
    }

    return {formData, handleFormDataChange};
}