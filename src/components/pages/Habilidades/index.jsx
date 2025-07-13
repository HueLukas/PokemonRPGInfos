import { useState, useEffect } from "react"
import dados from "../../../dados/Habilidades"
import { BarraLateral } from "../../BarraLateral";
import "./Habilidades.css"

const Habilidades = () => {
    const [fontSize, setFontSize] = useState(10);
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState([])
    const [quantHabili, setQuantHabili] = useState(20)

    useEffect(() => {
        const results = dados.filter(item => {
            return Object.values(item).some(value =>
                String(value).toLowerCase().includes(search.toLowerCase())
            );
        }).slice(0, quantHabili);
        setFilter(results)
    }, [search]);

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const quantHabiliCallback = (quant) => {
        setQuantHabili(quant)
    }

    const fontCallback = (font) => {
        setFontSize(font)
    }

    return (
        <div>
            <h1 className='tituloSite'>Habilidade dos Pokemon</h1>
            <BarraLateral onResult={quantHabiliCallback} onFontSize={fontCallback} />
            <div id='pesquisa'>
                <input value={search} onChange={handleSearchChange} />
                <p>{quantHabili}/236</p>
            </div>


            <div>
                {filter.length > 0 ? (
                    <ul>
                        {filter.map(item => (
                            <li key={item.id} className="habilidade-item">
                                <h1>{item.nome}</h1>
                                <p style={{ fontSize: fontSize }}>{item.descrição}</p>
                            </li>
                        ))}
                    </ul>
                ) : <p> Não achei nada </p>}
            </div>
        </div>
    )
}

export { Habilidades }