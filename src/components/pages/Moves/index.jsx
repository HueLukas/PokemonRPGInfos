import { useState, useEffect } from 'react'
import './moves.css'
import Move from '../../move'
import dados from "../../../dados"
import { BarraLateral } from '../../BarraLateral'

function PageMoves() {
  const [fontSize, setFontSize] = useState(10);
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

  const fontCallback = (font) => {
    setFontSize(font)
  }

  const quantMovesCallback = (quant) => {
    setQuantMoves(quant)
  }


  return (
    <div id='AreaMoves'>
      <h1 className='tituloSite'>Moves dos Pokemon</h1>
      <BarraLateral onResult={quantMovesCallback} onFontSize={fontCallback} />
      <div id='pesquisa'>
        <input value={search} onChange={handleSearchChange} />
        <p>{quantMoves}/518</p>
      </div>

      <div>
        {filter.length > 0 ? (
          <ul>
            {filter.map(item => (
              <li key={item.id}>
                <Move id={item.id} font={fontSize} />

              </li>
            ))}
          </ul>
        ) : <p> Não achei nada </p>}
      </div>
    </div>
  )
}

export { PageMoves }
