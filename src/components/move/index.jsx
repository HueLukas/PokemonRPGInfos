import "./move.css"
import React from "react";
import Freme from "../fremePequeno";
import dados from "../../dados"

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
            <p className="description"  style={{ fontSize: `${props.font}px`}}>{move.description}</p>
            <h2 id="HLevel" style={{ fontSize: `${props.font}px`}}>Níveis Superiores</h2>
            <p className="description" style={{ fontSize: `${props.font}px`}}>{move.highLevel}</p>
        </div>
    )
}

export default Move