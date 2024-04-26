import { useState } from "react";
import Endereco from "../components/Endereco";
import Documento from "../components/Documento";
import "./css/EdicaoUsuario.css";

export default function EdicaoUsuario() {
    const [state, setState] = useState({
        nome: "",
        nomeSocial: "",
        dataNascimento: "",
        acomodacao: "",
        endereco: {
            rua: "",
            bairro: "",
            cidade: "",
            estado: "",
            pais: "",
            codigoPostal: ""
        },
        documentos: [{
            tipo: 0,
            numDocumento: "",
            dataExpedicao: new Date()
        }]
    });

    function adicionarDocumento() {
        setState({
            ...state,
            documentos: [
                ...state.documentos,
                {
                    tipo: 0,
                    numDocumento: "",
                    dataExpedicao: new Date()
                }
            ]
        });
    }

    function removerDocumento() {
        setState({
            ...state,
            documentos: state.documentos.slice(0, -1)
        });
    }

    function listarDocumentos() {
        return (
            <div className="endereco-container">
                {state.documentos.map((d, index) =>
                    <div key={index} className="endereco-row">
                        <Documento onChange={(state: any) => { d = state; }} />
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="cad-usuario-div">
            <h1>Edição de Usuário</h1>
            <div className="cad-usuario">
                <div className="label-input-div">
                    <label htmlFor="nome">Nome:</label>
                    <input name="nome" type="text" value={"Teste"} onInput={() => { }} />
                </div>

                <div className="label-input-div">
                    <label htmlFor="nomeSocial">Nome social:</label>
                    <input name="nomeSocial" type="text" />
                </div>

                <div className="label-input-div">
                    <label htmlFor="dataNascimento">Data de nascimento:</label>
                    <input name="dataNascimento" type="date" />
                </div>

                <div className="label-input-div">
                    <label htmlFor="acomodacao">Acomodação:</label>
                    <select name="acomodacao">
                        <option value={1}>Acomodação simples para casal</option>
                        <option value={2}>Acomodação para família com até duas crianças</option>
                        <option value={3}>Acomodação para família com até cinco crianças</option>
                        <option value={4}>Acomodação para até duas familias, casal e três crianças cada</option>
                        <option value={5}>Acomodação simples para solteiro(a)</option>
                        <option value={6}>Acomodação com garagem para solteiro(a)</option>
                    </select>
                </div>
            </div>

            <Endereco onChange={(data: any) => {
                setState({
                    ...state,
                    endereco: data
                });
            }} />

            <div className="cad-documento-div">
                <h1>Documentos</h1>
                <div>
                    {listarDocumentos()}
                </div>

                <div className="documento-btn-div">
                    <button onClick={adicionarDocumento}>Adicionar documento</button>
                    <button onClick={removerDocumento}>Remover documento</button>
                </div>
            </div>

        </div>
    );
}