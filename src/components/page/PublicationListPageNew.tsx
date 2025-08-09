import {useFormData} from "../../helper/use-form-hook.ts";

export function PublicationListPageNew() {

    const {formData, handleFormDataChange} = useFormData({
        searchString: '',
        minScoreAvg: '',
        maxScoreAvg: ''
    });

    function handleFormSubmit() {
        const entries = Object.entries(formData);
        for (const entry of entries) {
            console.log(`${entry[0]}: ${entry[1]}`);
        }
    }

    return (
        <>
            <div className={'page-body-main'}>

                <form action={handleFormSubmit}>
                    <div>
                        <label>Search</label>
                        <input id={'searchString'} name={'searchString'} className={'text-input'} type={'textbox'} value={formData.searchString} onChange={handleFormDataChange}/>
                    </div>
                    <div>
                        <label>Min Score Avg</label>
                        <input id={'minScoreAvg'} name={'minScoreAvg'} className={'text-input'} type={'textbox'} value={formData.minScoreAvg} onChange={handleFormDataChange}/>
                    </div>
                    <div>
                        <label>Max Score Avg</label>
                        <input id={'maxScoreAvg'} name={'maxScoreAvg'} className={'text-input'} type={'textbox'} value={formData.maxScoreAvg} onChange={handleFormDataChange}/>
                    </div>
                    <button type={'submit'}>Apply</button>
                </form>

            </div>
        </>
    )
}