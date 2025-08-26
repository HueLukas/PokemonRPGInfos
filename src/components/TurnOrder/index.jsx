import { useState, useEffect } from "react";
import { Link } from "react-router-dom"

const TurnOrder = () => {
    const [infos, setInfos] = useState({})
    const [bat, setBat] = useState([])

    useEffect(() => {
        const savedData = localStorage.getItem('save');
        if (savedData) {
            setInfos(JSON.parse(savedData));
        }
    }, []);

    const addInBat = (participante) => {
        const newBat = [...bat, participante]
        setBat(newBat)
    }

    return (
        <div>
            <h1>AINDA EM TESTE. NÃO ESTA FUNCIONANDO</h1>
            {bat.length > 0 && (
                <div>
                    {bat}
                </div>
            )}
            <aside>
                {Object.keys(infos).map((nome, index) => (
                    <div key={index} onClick={() => {addInBat(nome)}}> {nome}</div>
                ))}
            </aside>
            <Link to="..">voltar</Link>
        </div>
    )
}

export { TurnOrder }