import { useState, useEffect } from "react";
import styled from "styled-components";
import { Tooltip } from "../Tooltip";
import { BarraDinamica } from "../BarraDinamica";
// import { Link } from "react-router-dom"
import { Freme } from "../FremePequeno";
import imagemPerfil from "../../assets/Perfil-00.png"
import { useConfigs } from "../../contexts/Configs";


const TurnOrder = () => {
   const [infos, setInfos] = useState({})
   const [bat, setBat] = useState({})
   const [maxid, setMaxid] = useState(0)

   const { inf } = useConfigs()

   useEffect(() => {
      const savedData = localStorage.getItem(`save${inf}`);
      const savedBatalha = localStorage.getItem(`Batalha${inf}`);
      if (savedData) {
         setInfos(JSON.parse(savedData));
      }
      if ( savedBatalha) {
         setBat(JSON.parse(savedBatalha))
      }
   }, [inf]);

   

   const adicionarParticipante = (participante) => {
      const novoParticipante = { turno: 0, nome: participante, vidaA: infos[participante]?.vida || 0 }
      const newBat = { ...bat, [`id${maxid}`]: novoParticipante }
      setMaxid(maxid + 1)
      setBat(newBat)
   }

   const handleChange = (event, chave) => {
      const { value, name } = event.target;
      const newBat = { ...bat, [chave]: { ...bat[chave], [name]: value } }
      setBat(newBat)
      localStorage.setItem(`Batalha${inf}`, JSON.stringify(newBat))
   }

   const ordenar = Object.keys(bat).sort((a, b) => {
      return bat[b]?.turno - bat[a]?.turno;
   });

   const deletarParticipante = (participante) => {
      const novaBat = { ...bat };
      delete novaBat[participante];
      setBat(novaBat);
   }

   const limparBat = () => {
      setBat({})
      setMaxid(0)
      const newBat = {}
      localStorage.setItem(`Batalha${inf}`, JSON.stringify(newBat))
   }

   

   // useEffect(() => {
   //    console.log(bat)
   // }, [bat]);

   return (
      <div>
         {Object.keys(bat).length > 0 && (
            <TurnList>
               {ordenar.map((chave) => (
                  <Participante key={chave}>
                     <TopDown style={{ alignItems: "center" }}>
                        <span>{bat[chave].nome == 'Anonimo' ? <input style={{ width: "100px", textAlign: 'center'}} type="Text" value={bat[chave].nome2} name='nome2' onChange={(e) => handleChange(e, chave)} /> : bat[chave].nome}</span>
                        {<img width='100px' src={infos[bat[chave].nome]?.imagem || imagemPerfil} />}
                        <BarraDinamica 
                        atual={bat[chave].vidaA} 
                        max={infos[bat[chave].nome]?.vida || bat[chave].vida || 0} 
                        />
                        <div style={{ width: "110px" }}>
                           <ValorEditavel type="Number" value={bat[chave].vidaA} name='vidaA' onChange={(e) => handleChange(e, chave)} />
                           <span>/ {
                              infos[bat[chave].nome]?.vida ||
                              <ValorEditavel
                                 type="Number"
                                 value={bat[chave].vida}
                                 name='vida'
                                 onChange={(e) => handleChange(e, chave)}
                              />
                           }</span>
                        </div>
                     </TopDown>
                     <Estatos>
                        <Freme titulo='Iniciativa' >
                           <ValorEditavel type="Number" value={bat[chave].turno} name='turno' onChange={(e) => handleChange(e, chave)} />
                        </Freme>
                        <Freme titulo='AC'>
                           <p>{infos[bat[chave].nome]?.ac || <ValorEditavel
                                 type="Number"
                                 value={bat[chave].ac}
                                 name='ac'
                                 onChange={(e) => handleChange(e, chave)}
                              />}</p>
                        </Freme>
                        <Freme titulo='Força'>
                           <p>{infos[bat[chave].nome]?.str || <ValorEditavel
                                 type="Number"
                                 value={bat[chave].str}
                                 name='str'
                                 onChange={(e) => handleChange(e, chave)}
                              />}</p>
                        </Freme>
                        <Freme titulo='Destreza'>
                           <p>{infos[bat[chave].nome]?.dex || <ValorEditavel 
                                 type="Number"
                                 value={bat[chave].dex}
                                 name='dex'
                                 onChange={(e) => handleChange(e, chave)}
                              />}</p>
                        </Freme>
                        <Freme titulo='Constitução'>
                           <p>{infos[bat[chave].nome]?.con || <ValorEditavel 
                                 type="Number"
                                 value={bat[chave].con}
                                 name='con'
                                 onChange={(e) => handleChange(e, chave)}
                              />}</p>
                        </Freme>
                        <Freme titulo='Inteligencia'>
                           <p>{infos[bat[chave].nome]?.int || <ValorEditavel 
                                 type="Number"
                                 value={bat[chave].int}
                                 name='int'
                                 onChange={(e) => handleChange(e, chave)}
                              />}</p>
                        </Freme>
                        <Freme titulo='Sabedoria'>
                           <p>{infos[bat[chave].nome]?.wis || <ValorEditavel 
                                 type="Number"
                                 value={bat[chave].wis}
                                 name='wis'
                                 onChange={(e) => handleChange(e, chave)}
                              />}</p>
                        </Freme>
                        <Freme titulo='Carisma'>
                           <p>{infos[bat[chave].nome]?.car || <ValorEditavel 
                                 type="Number"
                                 value={bat[chave].car}
                                 name='car'
                                 onChange={(e) => handleChange(e, chave)}
                              />}</p>
                        </Freme>
                     </Estatos>
                     <input type="button" id={chave} value='deleta' onClick={() => deletarParticipante(chave)} />
                  </Participante>
               ))}
            </TurnList>
         )}
         <Candidatos>
            <Tooltip text='Remove todos os participante da batalha'><button onClick={limparBat}>limpar</button></Tooltip>
            <Candidato onClick={() => { adicionarParticipante('Anonimo') }}>
               {<img src={imagemPerfil} />}
               <p>Anonimo</p>
            </Candidato>

            {Object.keys(infos).map((nome, index) => (
               <Candidato key={index} onClick={() => { adicionarParticipante(nome) }}>
                  {infos[nome].imagem && <img src={infos[nome].imagem} />}
                  <p>{nome}</p>
               </Candidato>
            ))}
         </Candidatos>
         {/* <Link to="..">voltar</Link> */}
      </div>
   )
}

const ValorEditavel = styled.input`
    width: 40px;
    text-align: center;
`

const Participante = styled.li`
    display: flex;
    align-items: center;
    gap: 5px;
    border: dotted 1px rgba(255, 255, 255, 0.4);
    input {
        margin: 0;
    }
`

const TurnList = styled.ul`
    display: flex;
    flex-direction: column;
`
const Candidato = styled.div`
    display: flex;
    gap: 10px;

    p {
      margin: 0;
      padding: 0;
    }

    img {
        width: 35px;
        height: 35px;
        object-fit: contain;
    }
`
const Candidatos = styled.aside`
    position: fixed;
    display: flex;
    flex-direction: column;
    right: 0;
    top: 0;
    gap: 20px;
    padding: 20px;
    border: solid 1px rgba(255, 255, 255, 0.4);
`

const TopDown = styled.div`
    display: flex;
    flex-direction: column;
`

const Estatos = styled.div`
    display: flex;
`


export { TurnOrder }