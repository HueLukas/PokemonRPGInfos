import styled from "styled-components";
import { BarraLateral } from "../../BarraLateral";
import "./Usuario.css"
import { Link, Outlet } from "react-router-dom";

const Usuario = () => {
    return (
        <div>
            <BarraLateral/>
            <Options>
                <Link to="Ficha">Ficha</Link>
                <Link to="TurnOrder">Turn Order</Link>
            </Options>
            <Outlet/>
        </div>
    )
}

const Options = styled.section`
    display: flex;
    justify-content: space-between;
`

export { Usuario }