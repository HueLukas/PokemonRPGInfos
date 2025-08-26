import { useEffect, useState, useRef } from "react"
import { InputInfo } from "../InputInfo"

const CriaFicha = () => {
    const [valor, setValor] = useState({nome: '',
            vida: '',
            ac: '',
            str: '',
            dex: '',
            con: '',
            int: '',
            wis: '',
            car: '',});
    const [nome, setNome] = useState('');
    const [infos, setInfos] = useState({});
    const [numInputs, setNumInputs] = useState(9);
    const [selectedImage, setSelectedImage] = useState(null);

    const fileInputRef = useRef(null);

    const valorSetarExtra = ({ id, value }) => {
        setValor({ ...valor, [id]: value });
    };

    const valorSetar = (event) => {
        const { id, value } = event.target;
        setValor({ ...valor, [id]: value })
    }

    const onDelete = (nomeParaRemover) => {
        const { [nomeParaRemover]: _, ...novasInfos } = infos;
        setInfos(novasInfos);
        localStorage.setItem("save", JSON.stringify(novasInfos));
    };

    const nomeSetar = (event) => {
        setNome(event.target.value)
    };

    const onSave = () => {
        const newInfos = { ...infos, [nome]: valor }
        setInfos(newInfos)
        localStorage.setItem("save", JSON.stringify(newInfos))
    };

    const onLoad = (keynome = nome) => {
        const load = JSON.parse(localStorage.getItem('save'))
        if (load && load[keynome]) {
            if (Object.keys(load[keynome]).length > 9) {
                setNumInputs(Object.keys(load[keynome]).length)
            }
            setValor(load[keynome])
        } else {
            setValor({})
        }
    };

    const onAdd = () => {
        setNumInputs(numInputs + 1)
    };

    const onRemove = () => {
        const vRemove = numInputs - 10
        if (valor[`info${vRemove}`]) {
            delete valor[`info${vRemove}`];
        }
        setNumInputs(numInputs - 1)
    };

    const changeName = (newNome) => {
        setNome(newNome)
        onLoad(newNome)
    };

    useEffect(() => {
        const savedData = localStorage.getItem('save');
        if (savedData) {
            setInfos(JSON.parse(savedData));
        }
    }, []);

    const renderInputs = () => {
        const inputs = []
        for (let i = 0; i < numInputs - 9; i++) {
            inputs.push(
                <InputInfo key={i} info={i} valor={valor} onValor={valorSetarExtra} />
            )
        }

        return inputs;
    };

    useEffect(() => {
        setValor({ ...valor, imagem: selectedImage });
    }, [selectedImage])

    const handleImageUpload = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();


            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };

            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        console.log(valor)
    }, [valor]);
    

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    return (
        <div>
            <div className="registro">
                <div>
                    {selectedImage && (
                        <div>
                            <h3>Preview:</h3>
                            <img
                                src={selectedImage}
                                alt="Uploaded"
                                className="imagemIdenticicar" />
                        </div>
                    )}
                </div>
                <div className="nomes">
                    <p>Nome</p>
                    <p>Vida</p>
                    <p>AC</p>
                    <p>Força</p>
                    <p>Destreza</p>
                    <p>Constituição</p>
                    <p>Inteligencia</p>
                    <p>Sabedoria</p>
                    <p>Carisma</p>
                </div>
                <div className="inputsStatus">
                    <input type="text" id='nome' value={nome} onChange={nomeSetar} />
                    <input type="number" id='vida' value={valor.vida} onChange={valorSetar} />
                    <input type="number" id='ac' value={valor.ac} onChange={valorSetar} />
                    <input type="number" id='str' value={valor.str} onChange={valorSetar} />
                    <input type="number" id='dex' value={valor.dex} onChange={valorSetar} />
                    <input type="number" id='con' value={valor.con} onChange={valorSetar} />
                    <input type="number" id='int' value={valor.int} onChange={valorSetar} />
                    <input type="number" id='wis' value={valor.wis} onChange={valorSetar} />
                    <input type="number" id='car' value={valor.car} onChange={valorSetar} />
                    {numInputs > 9 && renderInputs()}
                </div>
                <div className="botoes">
                    <button onClick={onSave} className="button">save</button>
                    <button onClick={onLoad} className="button">load</button>
                    <button onClick={onAdd} className="button">+</button>
                    {numInputs > 9 && (<button onClick={onRemove} className="button">
                        -
                    </button>)}
                    <button onClick={() => onDelete(nome)} className="button">
                        remover perfil
                    </button>
                    <input
                        type="file" accept="image/*" id="fileImagem" ref={fileInputRef} onChange={handleImageUpload}
                    />
                    <button className="button" onClick={handleButtonClick}>
                        add imagem
                    </button>
                </div>
            </div>

            {Object.keys(infos).length > 0 ? (
                <ul>
                    {Object.entries(infos).map(([key, value], index) => (
                        <li className='ficha' key={index}>
                            <h1 onClick={() => { changeName(key) }}>{key}</h1>
                            {value.imagem && <img
                                key={key} src={value.imagem}
                                alt="Uploaded"
                                className="imagemIdenticicar"
                                onClick={() => { changeName(key) }} />}
                            <div className="statusItem">
                                <p className="pAdapitavel">Vida: </p>
                                <p className="pAdapitavel">{value.vida}</p>
                            </div>
                            <div className="statusItem">
                                <p className="pAdapitavel">AC: </p>
                                <p className="pAdapitavel">{value.ac}</p>
                            </div>
                            <div className="statusItem">
                                <p className="pAdapitavel">Força: </p>
                                <p className="pAdapitavel">{value.str}</p>
                            </div>
                            <div className="statusItem">
                                <p className="pAdapitavel">Destreza: </p>
                                <p className="pAdapitavel">{value.dex}</p>
                            </div>
                            <div className="statusItem">
                                <p className="pAdapitavel">Constitu: </p>
                                <p className="pAdapitavel">{value.con}</p>
                            </div>
                            <div className="statusItem">
                                <p className="pAdapitavel">Inteligen: </p>
                                <p className="pAdapitavel">{value.int}</p>
                            </div>
                            <div className="statusItem">
                                <p className="pAdapitavel">Carisma: </p>
                                <p className="pAdapitavel">{value.car}</p>
                            </div>
                            {Object.entries(value).map(([key, value]) => {
                                if (key.includes('info')) {
                                    return <div key={key} className="statusItem">
                                        <p className="pAdapitavel">{value}</p>
                                    </div>
                                }

                            })}
                        </li>
                    ))}
                </ul>
            ) : ''}
        </div>
    )

}

export { CriaFicha }