import React from "react";
import { useState, useEffect } from "react"
import { BarraLateral } from "../../BarraLateral";
import dados from "../../../dados/baseNatureza"
import "./natures.css"

const Natures = () => {
    const [fontSize, setFontSize] = useState(15);
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState([])
    const [filterOrdem, setFilterOrdem] = useState('id')
    const [ordem, setOrdem] = useState([])

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

    useEffect(() => {
        const novaLista = [...dados].sort((a, b) => {
            if (filterOrdem == 'id') {
                return a - b;
            } else {
                return a[filterOrdem].localeCompare(b[filterOrdem])
            }
        })
        setOrdem(novaLista)
    }, [filterOrdem])

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };


    const fontCallback = (font) => {
        setFontSize(font)
    }

    const valorOrdem = (valor) => {
        if (valor == filterOrdem) {
            setFilterOrdem('id')
        } else {
            setFilterOrdem(valor)
        }
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
                    <li key='hud' className={`naturesItem`}>
                        <h1 onClick={() => { valorOrdem('name') }}>Nome</h1>
                        <p onClick={() => { valorOrdem('nome') }} style={{ fontSize: fontSize }}>Tradução</p>
                        <p onClick={() => { valorOrdem('bonus') }} style={{ fontSize: fontSize }}>Bonus →</p>
                        <p style={{ fontSize: fontSize }}>Valor</p>
                        <p onClick={() => { valorOrdem('onus') }}style={{ fontSize: fontSize }}>Onus →</p>
                        <p style={{ fontSize: fontSize }}>Valor</p>
                    </li>
                    {ordem.map(item => (
                        <li key={item.id} className={`naturesItem ${filter.includes(item.id) ? "ativo" : ""}`}>
                            <h1>{item.name}</h1>
                            <p style={{ fontSize: fontSize }}>{item.nome}</p>
                            <p style={{ fontSize: fontSize }}>{item.bonus} → </p>
                            <p style={{ fontSize: fontSize }}>{item.bonusValor}</p>
                            <p style={{ fontSize: fontSize }}>{item.onus} → </p>
                            <p style={{ fontSize: fontSize }}>{item.onusValor}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export { Natures }