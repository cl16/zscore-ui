import {useState} from "react";


function useInputState() {
    const [value, setValue] = useState('');

    function handleValueChange(e) {
        setValue(e.target.value);
    }

    return {value, handleValueChange}
}

export function PublicationListPageNew() {

    const {value: searchString, handleValueChange: handleSearchStringChange} = useInputState();
    const {value: other, handleValueChange: handleOtherChange} = useInputState();

    function handleFormSubmit() {
        console.log('FORM');
        console.log(`searchString: ${searchString}`);
        console.log(`other: ${other}`);
    }

    return (
        <>
            <div className={'page-body-main'}>

                <form action={handleFormSubmit}>
                    <div>
                        <label>Search</label>
                        <input id={'search-string'} name={'search-string'} className={'text-input'} type={'textbox'} value={searchString} onChange={handleSearchStringChange}/>
                    </div>
                    <div>
                        <label>Other</label>
                        <input id={'other'} name={'other'} className={'text-input'} type={'textbox'} value={other} onChange={handleOtherChange}/>
                    </div>
                    <button type={'submit'}>Apply</button>
                </form>
            </div>
        </>
    )
}