import {type ChangeEvent, useState} from "react";

interface IPaginatingFormData {
    page: string;
}

interface StringFormData {
    [key: string]: string;
}

// the type T needs to have "page" property but also explicitly match StringFormData so no narrowing is possible (?)
export function usePaginatingFormData<T extends IPaginatingFormData & StringFormData>(initial: T) {
    const [formData, setFormData] = useState(initial);

    function handleFormDataChange(e: ChangeEvent<HTMLInputElement>) {
        const label = e.target.name as keyof T;
        setFormData({...formData, [label]: e.target.value as T[keyof T]});
    }

    function incrementPage(totalPages: number) {
        let pageAsNumber = Number(formData.page);
        if (pageAsNumber < totalPages) {
            pageAsNumber += 1;
            setFormData({...formData, page: String(pageAsNumber)});
        }
    }

    function decrementPage() {
        let pageAsNumber = Number(formData.page);
        if (pageAsNumber > 1) {
            pageAsNumber -= 1;
            setFormData({...formData, page: String(pageAsNumber)});
        }
    }

    return {
        formData,
        handleFormDataChange,
        incrementPage,
        decrementPage
    };
}