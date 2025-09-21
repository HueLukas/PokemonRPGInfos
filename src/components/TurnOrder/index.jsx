import { useState, useEffect } from "react";
import styled from "styled-components";
import { Tooltip } from "../Tooltip";
// import { Link } from "react-router-dom"


const TurnOrder = () => {
    const [infos, setInfos] = useState({})
    const [bat, setBat] = useState({})
    const [maxid, setMaxid] = useState(0)

    useEffect(() => {
        const savedData = localStorage.getItem('save');
        if (savedData) {
            setInfos(JSON.parse(savedData));
        }
    }, []);

    const adicionarParticipante = (participante) => {
        const novoParticipante = { turno: 0, nome: participante, vidaA: infos[participante].vida }
        const newBat = { ...bat, [`id${maxid}`]: novoParticipante }
        setMaxid(maxid + 1)
        setBat(newBat)
    }

    const valorTurno = (event) => {
        const { id, value } = event.target;
        setBat({ ...bat, [id]: { ...bat[id], turno: value } })
    }

    const valorVida = (event) => {
        const { id, value } = event.target;
        setBat({ ...bat, [id]: { ...bat[id], vidaA: value } })
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
    }

    // useEffect(() => {
    //     ordenar() 
    // }, [bat]);

    return (
        <div>
            <h1>AINDA EM TESTE</h1>
            {Object.keys(bat).length > 0 && (
                <TurnList>
                    {ordenar.map((chave) => (
                        <Participante key={chave}>
                            <TopDown>
                                
                            </TopDown>
                            <TopDown>
                                <span>Iniciativa</span>
                                <ValorEditavel type="Number" id={chave} value={bat[chave].turno} onChange={valorTurno} />
                            </TopDown>
                            <TopDown>
                                <span>{bat[chave].nome}</span>
                                {infos[bat[chave].nome].imagem && <img width='50px' src={infos[bat[chave].nome].imagem} />}
                            </TopDown>
                            <span>vida:</span>
                            <ValorEditavel type="Number" id={chave} value={bat[chave].vidaA} onChange={valorVida} />
                            <span>/ {infos[bat[chave].nome].vida}</span>
                            <input type="button" id={chave} value='deleta' onClick={() => deletarParticipante(chave)} />
                        </Participante>
                    ))}
                </TurnList>
            )}
            <Candidatos>
                <Tooltip text='Remove todos os participante da batalha'><button onClick={limparBat}>limpar</button></Tooltip>

                {Object.keys(infos).map((nome, index) => (
                    <Candidato key={index} onClick={() => { adicionarParticipante(nome) }}>
                        {infos[nome].imagem && <img width='50px' src={infos[nome].imagem} />}
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

    img {
        width: 50px;
        height: 50px;
        object-fit: contain;
    }
`
const Candidatos = styled.aside`
    position: fixed;
    display: flex;
    flex-direction: column;
    right: 0;
    top: 0;
    gap: 10px;
    padding: 20px;
    border: solid 1px rgba(255, 255, 255, 0.4);
`

const TopDown = styled.div`
    display: flex;
    flex-direction: column;
`


export { TurnOrder }