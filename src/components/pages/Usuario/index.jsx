import { useEffect, useState } from "react"
import { InputInfo } from "../../InputInfo"
import { BarraLateral } from "../../BarraLateral";
import "./Usuario.css"

const Usuario = () => {
    const [valor, setValor] = useState({});
    const [nome, setNome] = useState('');
    const [fontSize, setFontSize] = useState(15);
    const [teste, setTeste] = useState('');
    const [infos, setInfos] = useState({});
    const [numInputs, setNumInputs] = useState(8);
    const [selectedImage, setSelectedImage] = useState(null);

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
            if (Object.keys(load[keynome]).length > 8) {
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
        for (let i = 0; i < numInputs-8; i++) {
            inputs.push(
                <InputInfo key={i} info={i} valor={valor} onValor={valorSetarExtra} />
            )
        }

        return inputs;
    };

    const fontCallback = (font) => {
        setFontSize(font)
    }

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

    // useEffect(() => {
    //     console.log(valor)
    // }, [valor]);


    return (
        <div>
            <BarraLateral onFontSize={fontCallback} />
            <div className="registro">
                <div>
                    {selectedImage && (
                        <div>
                            <h3>Preview:</h3>
                            <img src={selectedImage} alt="Uploaded" style={{ maxWidth: '100px' }} />
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
                    <p>inteligencia</p>
                    <p>sabedoria</p>
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
                    {numInputs > 8 && renderInputs()}
                </div>
                <div className="botoes">
                    <button onClick={onSave}>save</button>
                    <button onClick={onLoad}>load</button>
                    <button onClick={onAdd}>+</button>
                    {numInputs > 8 && (<button onClick={onRemove}>-</button>)}
                    <button onClick={() => onDelete(nome)}>remover perfil</button>
                </div>
            </div>

            <div>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>


            {Object.keys(infos).length > 0 ? (
                <ul>
                    {Object.entries(infos).map(([key, value], index) => (
                        <li className='ficha' key={index}>
                            <h1 onClick={() => { changeName(key) }}>{key}</h1>
                            {value.imagem && <img key={key} src={value.imagem} alt="Uploaded" style={{ maxWidth: '100px' }} />}
                            {Object.entries(value).map(([key, value]) => {
                                if (key == "imagem") {
                                    return null
                                }else if(key.includes('info')) {
                                    return <p key={key} style={{ fontSize: fontSize }}>{value}</p>
                                }else{
                                    return <p key={key} style={{ fontSize: fontSize }}>{key}: {value}</p>
                                }
                                
                            })}
                        </li>
                    ))}
                </ul>
            ) : ''}
        </div>
    )
}

export { Usuario }