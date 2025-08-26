import React from "react";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { NumberInput } from "../NumberInput"
import "./barraLateral.css"
import { createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
    .pAdapitavel {
        font-size: ${props => `${props.fontS}px`}
    }
`;

const BarraLateral = ({ onResult = () => { } }) => {
    const [size, setSize] = useState(15)
    const [result, setResult] = useState(20)
    const [recolher, setRecolher] = useState(false)



    useEffect(() => {
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
            <GlobalStyle fontS={size}/>
            <div id="icon" onClick={changeRecolher}>
                <div className="bar" />
                <div className="bar" />
                <div className="bar" />
            </div>
            {recolher == true ? <div className="barraMenu" style={{ height: `100%` }}>
                <h1 id='barraLateralTitulo'>Config</h1>
                <NumberInput onValue={FontCallback} textI={'Tamanho da fonte (pixels)'} />
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
                <Link to={`/Usuario`}>
                    <h2>Usuario</h2>
                </Link>
            </div> : ''}



        </nav>
    )


}




export { BarraLateral }