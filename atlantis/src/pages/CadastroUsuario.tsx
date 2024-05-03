import { useState } from "react";
import Endereco from "../components/Endereco";
import Documento from "../components/Documento";
import "./css/CadastroUsuario.css";

export default function CadastroUsuario() {
    const [cliente, setCliente] = useState({
        nome: "",
        nomeSocial: "",
        dataNascimento: "",
        id_acomodacao: 0,
        id_titular: 0
    });
    const [endereco, setEndereco] = useState({
        rua: "",
        bairro: "",
        cidade: "",
        estado: "",
        pais: "",
        codigoPostal: ""
    });
    const [documentos, setDocumentos] = useState([{
        tipo: 0,
        numDocumento: "",
        dataExpedicao: new Date()
    }]);

    function adicionarDocumento() {
        setDocumentos([...documentos,
        {
            tipo: 0,
            numDocumento: "",
            dataExpedicao: new Date()
        }]);
    }

    function removerDocumento() {
        setDocumentos(documentos.slice(0, -1));
    }

    function listarDocumentos() {
        return (
            <div className="endereco-container">
                {
                    documentos.map((d, index) =>
                        <div key={index} className="endereco-row">
                            <Documento onChange={(state: any) => { d = state; }} />
                        </div>
                    )
                }
            </div>
        );
    }

    async function cadastrar() {
        console.log("endereco:", endereco);
        // cadastrar endereco
        const id_endereco = await fetch("http://localhost:7000/endereco/cadastro", {
            method: "POST",
            body: JSON.stringify(endereco)
        }).then(response => response.json());

        // cadastrar cliente
        // const id_cliente = await fetch("http://localhost:7000/cliente/cadastro", {
        //     method: "POST",
        //     body: JSON.stringify(cliente)
        // }).then(response => response.json());

        // // cadastrar documentos
        // await fetch("http://localhost:7000/cliente/cadastro", {
        //     method: "POST",
        //     body: JSON.stringify({})
        // }).then(response => response.json());
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
                        setCliente({ ...cliente, id_acomodacao: parseInt(e.target.selectedOptions[0].value) });
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
                setEndereco(data);
            }} />

            <div className="cad-usuario-div">
                <h1>Titular</h1>
                <label htmlFor="acomodacao">Possui titular?</label>
                <select name="acomodacao" onChange={(e) => {
                    setCliente({ ...cliente, id_acomodacao: parseInt(e.target.selectedOptions[0].value) });
                }}>
                    <option value={0}>Sem titular</option>
                    <option value={1}>Titular 1</option>
                    <option value={2}>Titular 2</option>
                    <option value={3}>Titular 3</option>
                    <option value={4}>Titular 4</option>
                    <option value={5}>Titular 5</option>
                    <option value={6}>Titular 6</option>
                </select>
            </div>

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