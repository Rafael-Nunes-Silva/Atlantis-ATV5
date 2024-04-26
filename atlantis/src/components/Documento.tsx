import { Component } from "react";
import "./css/Documento.css";

type Props = {
    onChange: CallableFunction
};

type State = {
    tipo: number,
    numDocumento: string,
    dataExpedicao: Date
};

export default class Documento extends Component<Props, State> {
    handleUpdate() {
        this.props.onChange(this.state);
    }

    updateTipo(tipo: number) {
        this.setState({ tipo: tipo });
        this.handleUpdate();
    }

    updateNumDocumento(numDocumento: string) {
        this.setState({ numDocumento: numDocumento });
        this.handleUpdate();
    }

    updateDataExpedicao(dataExpedicao: Date) {
        this.setState({ dataExpedicao: dataExpedicao });
        this.handleUpdate();
    }

    render() {
        return (
            <div className="documento-div">
                <div className="label-input-div">
                    <label htmlFor="tipo">Tipo:</label>
                    <select name="tipo" onInput={(event) => this.updateTipo(parseInt((event.target as HTMLSelectElement).value))}>
                        <option value={1}>Cadastro de Pessoa Física (CPF)</option>
                        <option value={2}>Registro Geral (RG)</option>
                        <option value={3}>Passaporte</option>
                    </select>
                </div>

                <div className="label-input-div">
                    <label htmlFor="numDocumento">Documento:</label>
                    <input name="numDocumento" type="text" onInput={(event) => this.updateNumDocumento((event.target as HTMLInputElement).value)} />
                </div>

                <div className="label-input-div">
                    <label htmlFor="dataExpedicao">Data Expedição:</label>
                    <input name="dataExpedicao" type="date" onInput={(event) => this.updateDataExpedicao(new Date((event.target as HTMLInputElement).value))} />
                </div>
            </div>
        );
    }
}