import React from "react";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { NumberInput } from "../NumberInput"
import "./barraLateral.css"
import { createGlobalStyle } from "styled-components";
import { useConfigs } from "../../contexts/Configs";

const GlobalStyle = createGlobalStyle`
    .pAdapitavel {
        font-size: ${props => `${props.fontS}px`}
    }
`;

const BarraLateral = ({ onResult = () => { } }) => {
   const [size, setSize] = useState(15)
   const [result, setResult] = useState(20)
   const [recolher, setRecolher] = useState(false)

   useEffect(() => {
      onResult(result)
   }, [size, result])

   const FontCallback = (font) => {
      setSize(font)
   }

   const ResultCallback = (quant) => {
      setResult(quant)
   }

   const changeRecolher = () => {
      setRecolher(!recolher)
   }

   //----------------

   const [nomeSave, setNomeSave] = useState()
   const [listSaves, setListSaves] = useState([])
   const [barraVisao, setBarraVisao] = useState('')

   useEffect(() => {
      const listStore = localStorage.getItem('ListSaves')
      const newListSave = listStore ? JSON.parse(listStore) : ['Default'];
      setListSaves(newListSave)
   }, [])

   useEffect(() => {
      setBarraVisao(nomeSave)
   },[nomeSave])

   const hanldeNomeSave = (event) => {
      const { value } = event.target;
      setNomeSave(value);
      setBarraVisao(value);
   }

   const handleBarraFous = () => {
      if (barraVisao === nomeSave && nomeSave !== '') {
         setBarraVisao('')
      }
   }

   const handleBarraBlur = () => {
      if (barraVisao === '') {
         setBarraVisao(nomeSave)
      }
   }

   const { handleInf } = useConfigs()

   const handleSaves = () => {
      const newNomeSave = listSaves.includes(nomeSave)
      handleInf(nomeSave)
      if (nomeSave == 'Default') {
         handleInf('')
      } else if (!newNomeSave){
         const newListSaves = [...listSaves, nomeSave]
         setListSaves(newListSaves)
         localStorage.setItem("ListSaves", JSON.stringify(newListSaves))
      }
   }

   return (
      <nav className="barraLateral" id={recolher == true ? "expanted" : ""}>
         <GlobalStyle fontS={size} />
         <div id="icon" onClick={changeRecolher}>
            <div className="bar" />
            <div className="bar" />
            <div className="bar" />
         </div>
         {recolher == true ? <div className="barraMenu" style={{ height: `100%` }}>
            <h1 id='barraLateralTitulo'>Config</h1>
            <div>
               <input
                  type="text"
                  id="save-input"
                  list="lista-de-saves"
                  onChange={hanldeNomeSave}
                  value={barraVisao}
                  onFocus={handleBarraFous}
                  onBlur={handleBarraBlur}
               />
               <datalist id="lista-de-saves">
                  {listSaves.map((item, index) => (
                     <option key={index} value={item} />
                  ))}
               </datalist>
               <button onClick={handleSaves}>Save/Load</button>
            </div>
            <NumberInput onValue={FontCallback} textI={'Tamanho da fonte (pixels)'} />
            <NumberInput onValue={ResultCallback} textI={'Numero de Moves (20)'} posicao={30} />
            <Link to={`/`}>
               <h2>Home Page</h2>
            </Link>
            <Link to={`/Moves`}>
               <h2>Moves</h2>
            </Link>
            <Link to={`/Habilidades`}>
               <h2>Habilidades</h2>
            </Link>
            <Link to={`/Natures`}>
               <h2>Naturesas</h2>
            </Link>
            <Link to={`/Usuario`}>
               <h2>Usuario</h2>
            </Link>
         </div> : ''}



      </nav>
   )


}




export { BarraLateral }