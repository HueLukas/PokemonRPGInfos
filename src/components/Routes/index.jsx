import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/Home";
import { PageMoves } from "../pages/Moves";
import { Habilidades } from "../pages/Habilidades";
import { Natures } from "../pages/Natures";
import { Usuario } from "../pages/Usuario";

const AppRouted = () => {
    return(
        <BrowserRouter basename="/PokemonRPGInfos/">
            <Routes>
                <Route exact path="/" element={<HomePage/>}/>
                <Route exact path="/Moves" element={<PageMoves/>}/>
                <Route exact path="/Habilidades" element={<Habilidades/>}/>
                <Route exact path="/Natures" element={<Natures/>}/>
                <Route exact path="/Usuario" element={<Usuario/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export { AppRouted }