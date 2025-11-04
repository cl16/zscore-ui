import type {ChangeEvent} from "react";


function Select({values, defaultValue, onChangeFunc} : {values: number[], defaultValue: number, onChangeFunc: (e: ChangeEvent<HTMLSelectElement>) => void}) {

    return (
        <div>
            <label>Results per page:</label>
            <select name='size' onChange={onChangeFunc} value={defaultValue}>
                {values.map((num) => {
                    return (
                        <option key={num} value={num}>{num}</option>
                    )
                })}
            </select>
        </div>
    )
}

export default Select;