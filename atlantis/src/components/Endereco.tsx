import { useEffect, useState } from "react";
import "./css/Endereco.css";

type Props = {
    onChange: CallableFunction
};

export default function Endereco(props: Props) {
    const [endereco, setEndereco] = useState({
        rua: "",
        bairro: "",
        cidade: "",
        estado: "",
        pais: "",
        codigoPostal: ""
    });

    useEffect(() => {
        props.onChange(endereco);
    }, [endereco])

    return (
        <div className="cad-endereco-div">
            <h1>Endereco</h1>
            <div className="cad-endereco">
                <div className="label-input-div">
                    <label htmlFor="rua">Rua:</label>
                    <input name="rua" type="text" maxLength={100} onInput={(event) => setEndereco({...endereco, rua: (event.target as HTMLInputElement).value})} />
                </div>

                <div className="label-input-div">
                    <label htmlFor="bairro">Bairro:</label>
                    <input name="bairro" type="text" maxLength={50} onInput={(event) => setEndereco({...endereco, bairro: (event.target as HTMLInputElement).value})} />
                </div>

                <div className="label-input-div">
                    <label htmlFor="cidade">Cidade:</label>
                    <input name="cidade" type="text" maxLength={50} onInput={(event) => setEndereco({...endereco, cidade: (event.target as HTMLInputElement).value})} />
                </div>

                <div className="label-input-div">
                    <label htmlFor="estado">Estado:</label>
                    <input name="estado" type="text" maxLength={20} onInput={(event) => setEndereco({...endereco, estado: (event.target as HTMLInputElement).value})} />
                </div>

                <div className="label-input-div">
                    <label htmlFor="pais">Pais:</label>
                    <input name="pais" type="text" maxLength={20} onInput={(event) => setEndereco({...endereco, pais: (event.target as HTMLInputElement).value})} />
                </div>

                <div className="label-input-div">
                    <label htmlFor="codigoPostal">Código postal:</label>
                    <input name="codigoPostal" type="text" maxLength={8} onInput={(event) => setEndereco({...endereco, codigoPostal: (event.target as HTMLInputElement).value})} />
                </div>
            </div>
        </div>
    );
}
