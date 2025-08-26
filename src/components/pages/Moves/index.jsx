import React from "react";
import { useState, useEffect } from 'react'
import { BarraLateral } from '../../BarraLateral'
import { Move } from '../../Move'
import dados from "../../../dados/baseMoves"
import './moves.css'

function PageMoves() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([])
  const [quantMoves, setQuantMoves] = useState(20)

  useEffect(() => {
    const results = dados.filter(item => {
      return Object.values(item).some(value =>
        String(value).toLowerCase().includes(search.toLowerCase())
      );
    }).slice(0, quantMoves);
    setFilter(results)
  }, [search]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const quantMovesCallback = (quant) => {
    setQuantMoves(quant)
  }


  return (
    <div id='AreaMoves'>
      <h1 className='tituloSite'>Moves dos Pokemon</h1>
      <BarraLateral onResult={quantMovesCallback} />
      <div id='pesquisa'>
        <input value={search} onChange={handleSearchChange} />
        <p>{quantMoves}/518</p>
      </div>

      <div>
        {filter.length > 0 ? (
          <ul>
            {filter.map(item => (
              <li key={item.id}>
                <Move id={item.id} />
              </li>
            ))}
          </ul>
        ) : <p> Não achei nada </p>}
      </div>
    </div>
  )
}

export { PageMoves }
