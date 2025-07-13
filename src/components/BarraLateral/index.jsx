import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { NumberInput } from "../NumberInput"
import "./barraLateral.css"

const BarraLateral = ({ onFontSize, onResult }) => {
    const [size, setSize] = useState(10)
    const [result, setResult] = useState(20)
    const [recolher, setRecolher] = useState(false)

    useEffect(() => {
        onFontSize(size)
        onResult(result)
    }, [size, result])

    const FontCallback = (font) => {
        setSize(font)
    }

    const ResultCallback = (quant) => {
        setResult(quant)
    }

    const changeRecolher = () => {
        setRecolher(!recolher)
    }

    return (
        <nav id="barraLateral">
            <div id="icon" onClick={changeRecolher}>
                <div className="bar" />
                <div className="bar" />
                <div className="bar" />
            </div>
            {recolher == true ? <div>
                <h1 id='barraLateralTitulo'>config</h1>
                <NumberInput onValue={FontCallback} textI={'Tamanho da fonte (pixels)'} />
                <p/>
                <NumberInput onValue={ResultCallback} textI={'Numero de Moves (20)'} posicao={30} />
                <p>Pagina inicial/Moves</p>
                <Link to={`/`}>moves</Link>
                <p>Habilidades</p>
                <Link to={`/Habilidades`}>Habilidades</Link>
            </div> : ''}
            


        </nav>
    )
}

export { BarraLateral }