import { useState } from "react";
import Endereco from "../components/Endereco";
import Documento from "../components/Documento";
import "./css/CadastroUsuario.css";

export default function CadastroUsuario() {
    const [state, setState] = useState({
        nome: "",
        nomeSocial: "",
        dataNascimento: "",
        acomodacao: 0,
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

    async function cadastrar() {
        // const dbConn = CreateConnection();

        // Cadastro endereco


        // Cadastro cliente
        // dbConn.query(
        //     `insert into cliente (nome, nomeSocial, dataNascimento, dataCadastro, id_endereco, id_titular, id_acomodacao)
        //     values (${state.nome}, ${state.nomeSocial}, ${state.dataNascimento}, ${Date.now()}, ${}, ${}, ${state.acomodacao});`,
        //     function (err: any, result: any, fields: any) {
        //         if (err) {
        //             // res.status(500).json({ msg: err });
        //             EndConnection(dbConn);
        //             return;
        //         }

        //         if (result.length <= 0) {
        //             // res.status(400).json({ msg: `Essa empresa ainda não possui perguntas` });
        //             EndConnection(dbConn);
        //             return;
        //         }

        //         // res.status(200).json(result);
        //         EndConnection(dbConn);
        //     }
        // );
    }

    return (
        <div className="cad-usuario-div">
            <h1>Cadastro de Usuário</h1>
            <div className="cad-usuario">
                <div className="label-input-div">
                    <label htmlFor="nome">Nome:</label>
                    <input name="nome" type="text" onInput={() => { }} />
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
                    <select name="acomodacao" onChange={(e) => {
                        setState({
                            ...state,
                            acomodacao: parseInt(e.target.selectedOptions[0].value)
                        });
                    }}>
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
                    <button className="btn" onClick={adicionarDocumento}>Adicionar documento</button>
                    <button className="btn" onClick={removerDocumento}>Remover documento</button>
                </div>
            </div>

            <button className="btn btn-cadastrar" onClick={cadastrar}>Cadastrar</button>

        </div>
    );
}