import React from "react";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { NumberInput } from "../NumberInput"
import "./barraLateral.css"

const BarraLateral = ({ onFontSize, onResult = () => {}}) => {
    const [size, setSize] = useState(15)
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
        <nav className="barraLateral" id={recolher == true ? "expanted" : ""}>
            <div id="icon" onClick={changeRecolher}>
                <div className="bar" />
                <div className="bar" />
                <div className="bar" />
            </div>
            {recolher == true ? <div className="barraMenu" style={{ height: `100%` }}>
                <h1 id='barraLateralTitulo'>Config</h1>
                <NumberInput onValue={FontCallback} textI={'Tamanho da fonte (pixels)'} />
                <p />
                <NumberInput onValue={ResultCallback} textI={'Numero de Moves (20)'} posicao={30} />
                <Link to={`/`}>
                    <h2>Home Page</h2>
                </Link>
                <Link to={`/Moves`}>
                    <h2>Moves</h2>
                </Link>
                <Link to={`/Habilidades`}>
                    <h2>Habilidades</h2>
                </Link>
                <Link to={`/Natures`}>
                    <h2>Naturesas</h2>
                </Link>
            </div> : ''}



        </nav>
    )
}

export { BarraLateral }