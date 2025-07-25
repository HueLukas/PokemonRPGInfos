import React from "react";
import { useState, useEffect } from "react"
import { BarraLateral } from "../../BarraLateral";
import dados from "../../../dados/baseNatureza"
import "./natures.css"

const Natures = () => {
    const [fontSize, setFontSize] = useState(15);
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState([])

    useEffect(() => {
         if (search === '') {
            setFilter([]);
            return
         }

        const results = dados.filter(item => {
            return Object.values(item).some(value =>
                String(value).toLowerCase().includes(search.toLowerCase())
            );
        });
        setFilter(results.map(item => item.id))
    }, [search]);

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };


    const fontCallback = (font) => {
        setFontSize(font)
    }

    return (
        <div>
            <h1 className='tituloSite'>Natureza dos Pokemon</h1>
            <BarraLateral onFontSize={fontCallback} />
            <div id='pesquisa'>
                <input value={search} onChange={handleSearchChange} />
            </div>

            <div>
                <ul className="naturesListe">
                    {dados.map(item => (
                        <li key={item.id} className={`naturesItem ${filter.includes(item.id) ? "ativo" : ""}`}>
                            <h1>{item.name}</h1>
                            <p style={{ fontSize: fontSize }}>{item.nome}</p>
                            <p>{item.bonus} → </p>
                            <p>{item.bonusValor}</p>
                            <p>{item.onus} → </p>
                            <p>{item.onusValor}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export { Natures }