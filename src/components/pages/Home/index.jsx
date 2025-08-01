import React from "react";
import { Link } from "react-router-dom";
import mascote from "../../../assets/rotom.png"
import "./home.css"
//"../../../../public/rotom.png"
const HomePage = () => {
    return (
        <div className="home">
            <div className="mascoteTitulo">
                <img src={mascote} alt="Icone do Mascote Rotom"></img>
                <h1>PokeInfoRPG</h1>
            </div>

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
        </div>
    )
}

export { HomePage }