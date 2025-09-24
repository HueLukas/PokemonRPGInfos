import React from "react";
import "./fremePequeno.css"

const Freme = (props) => {
    return(
        <div className="freme">
            <h1>{props.titulo}</h1>
            {props.children ? (
                <div className="item">{props.children}</div>
            ) : (
                <p className="item">{props.item}</p>
            )}
        </div>
    )
}

export { Freme } 