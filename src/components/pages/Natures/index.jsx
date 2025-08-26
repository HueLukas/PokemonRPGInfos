import React from "react";
import { useState, useEffect } from "react"
import { BarraLateral } from "../../BarraLateral";
import dados from "../../../dados/baseNatureza"
import "./natures.css"

const Natures = () => {
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
            <BarraLateral/>
            <div id='pesquisa'>
                <input value={search} onChange={handleSearchChange} />
            </div>

            <div>
                <ul className="naturesListe">
                    <li key='hud' className={`naturesItem`}>
                        <h1 onClick={() => { valorOrdem('name') }}>Nome</h1>
                        <p onClick={() => { valorOrdem('nome') }} className="pAdapitavel">Tradução</p>
                        <p onClick={() => { valorOrdem('bonus') }} className="pAdapitavel">Bonus →</p>
                        <p className="pAdapitavel">Valor</p>
                        <p onClick={() => { valorOrdem('onus') }} className="pAdapitavel">Onus →</p>
                        <p className="pAdapitavel">Valor</p>
                    </li>
                    {ordem.map(item => (
                        <li key={item.id} className={`naturesItem ${filter.includes(item.id) ? "ativo" : ""}`}>
                            <h1>{item.name}</h1>
                            <p className="pAdapitavel">{item.nome}</p>
                            <p className="pAdapitavel">{item.bonus} → </p>
                            <p className="pAdapitavel">{item.bonusValor}</p>
                            <p className="pAdapitavel">{item.onus} → </p>
                            <p className="pAdapitavel">{item.onusValor}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export { Natures }