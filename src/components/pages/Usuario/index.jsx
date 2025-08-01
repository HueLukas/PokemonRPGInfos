import { useEffect, useState } from "react"
import { InputInfo } from "../../InputInfo"

const Usuario = () => {
    const [valor, setValor] = useState({})
    const [nome, setNome] = useState('')
    const [teste, setTeste] = useState('')
    const [infos, setInfos] = useState({})
    const [numInputs, setNumInputs] = useState(8)

    const valorSetar = ({ id, value }) => {
        setValor({ ...valor, [id]: value })
    }

    const nomeSetar = (event) => {
        setNome(event.target.value)
    }

    const onSave = () => {
        const newInfos = { ...infos, [nome]: valor }
        setInfos(newInfos)
        localStorage.setItem("save", JSON.stringify(newInfos))
    }

    const onLoad = () => {
        const load = JSON.parse(localStorage.getItem('save'))
        if (load && load[nome]) {
            if (Object.keys(load[nome]).length != 8) {
                setNumInputs(Object.keys(load[nome]).length)
            }
            setValor(load[nome])
        } else {
            setValor({})
        }
    }

    useEffect(() => {
        const savedData = localStorage.getItem('save');
        if (savedData) {
            setInfos(JSON.parse(savedData));
        }
    }, []);

    const renderInputs = () => {
        const inputs = []
        for (let i = 0; i < numInputs; i++){
            inputs.push(
                <InputInfo key={i} info={i} valor={valor} onValor={valorSetar} />
            )
        }

        return inputs;
    }

    useEffect(() => {
        console.log(valor)
    }, [valor])

    return (
        <div>
            <input type="text" id='nome' value={nome} onChange={nomeSetar} />
            {renderInputs()}
            <button onClick={onSave}>save</button>
            <button onClick={onLoad}>load</button>
            {Object.keys(infos).length > 0 ? (
                <ul>
                    {Object.entries(infos).map(([key, value], index) => (
                        <li key={index}>
                            <h1>{key}</h1>
                            {Object.entries(value).map(([key, value]) => (
                                <p key={key} >{value}</p>
                            ))}
                        </li>
                    ))}
                </ul>
            ) : ''}
        </div>
    )
}

export { Usuario }