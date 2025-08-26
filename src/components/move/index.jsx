import React from "react";
import { Freme } from "../FremePequeno";
import dados from "../../dados/baseMoves"
import "./move.css"

const Move = (props) => {
    const move = dados[props.id]

    return (
        <div className="box">
            <h1 className="moveTitulo">{move.name}</h1>
            <div className="info">
                <Freme titulo="Tipo" item={move.type} />
                <Freme titulo="Move" item={move.move} />
                <Freme titulo="Custo" item={move.casting} />
                <Freme titulo="PP" item={move.pp} />
                <Freme titulo="Duração" item={move.duration} />
                <Freme titulo="Alcance" item={move.range} />
            </div>
            <p className="description pAdapitavel">{move.description}</p>
            <h2 id="HLevel" className="pAdapitavel">Níveis Superiores</h2>
            <p className="description pAdapitavel" >{move.highLevel}</p>
        </div>
    )
}

export { Move }