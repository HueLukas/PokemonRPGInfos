import { useState } from "react";
import "./NumberInput.css"

const NumberInput = ({onValue, minimo = 15, textI, posicao = 0}) => {
    const [inputValue, setInputValue] = useState('')

    const handleChange = (event) => {
        const value = event.target.value;
        setInputValue(value);

        const numberValue = parseInt(value, 10);

        if (!isNaN(numberValue)) {
            onValue(numberValue);
        } else {
            onValue(minimo);
        }

    }

    return (
        <input type="number" id='fontSizeInput' value={inputValue} onChange={handleChange} placeholder={textI} style={{ top: `${posicao}px`}}></input>
    )
}

export { NumberInput }