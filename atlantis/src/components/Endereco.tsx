import { Component } from "react";
import "./css/Endereco.css";

type Props = {
    onChange: CallableFunction
};

type State = {
    rua: string,
    bairro: string,
    cidade: string,
    estado: string,
    pais: string,
    codigoPostal: string
};

export default class Endereco extends Component<Props, State> {
    updateRua(rua: string) {
        this.setState({ rua: rua });
    }

    updateBairro(bairro: string) {
        this.setState({ bairro: bairro });
    }

    updateCidade(cidade: string) {
        this.setState({ cidade: cidade });
    }

    updateEstado(estado: string) {
        this.setState({ estado: estado });
    }

    updatePais(pais: string) {
        this.setState({ pais: pais });
    }

    updateCodigoPostal(codigoPostal: string) {
        this.setState({ codigoPostal: codigoPostal });
    }

    render() {
        return (
            <div className="cad-endereco-div">
                <h1>Endereco</h1>
                <div className="cad-endereco">
                    <div className="label-input-div">
                        <label htmlFor="rua">Rua:</label>
                        <input name="rua" type="text" onInput={(event) => this.updateRua((event.target as HTMLInputElement).value)} />
                    </div>

                    <div className="label-input-div">
                        <label htmlFor="bairro">Bairro:</label>
                        <input name="bairro" type="text" onInput={(event) => this.updateBairro((event.target as HTMLInputElement).value)} />
                    </div>

                    <div className="label-input-div">
                        <label htmlFor="cidade">Cidade:</label>
                        <input name="cidade" type="text" onInput={(event) => this.updateCidade((event.target as HTMLInputElement).value)} />
                    </div>

                    <div className="label-input-div">
                        <label htmlFor="estado">Estado:</label>
                        <input name="estado" type="text" onInput={(event) => this.updateEstado((event.target as HTMLInputElement).value)} />
                    </div>

                    <div className="label-input-div">
                        <label htmlFor="pais">Pais:</label>
                        <input name="pais" type="text" onInput={(event) => this.updatePais((event.target as HTMLInputElement).value)} />
                    </div>

                    <div className="label-input-div">
                        <label htmlFor="codigoPostal">Código postal:</label>
                        <input name="codigoPostal" type="text" onInput={(event) => this.updateCodigoPostal((event.target as HTMLInputElement).value)} />
                    </div>
                </div>
            </div>
        );
    }
}