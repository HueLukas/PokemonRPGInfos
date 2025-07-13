import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PageMoves } from "../pages/Moves";
import { Habilidades } from "../pages/Habilidades";


const AppRouted = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<PageMoves/>}/>
                <Route exact path="/Habilidades" element={<Habilidades/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export { AppRouted }