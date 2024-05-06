import { useEffect, useState } from "react";
import Endereco from "../components/Endereco";
import Documento from "../components/Documento";
import "./css/CadastroUsuario.css";
import getTiposDocumento from "../utils/getTiposDocumento";
import getAcomodacoes from "../utils/getAcomodacoes";
import getTitulares from "../utils/getTitulares";

type Acomodacao = {
    id: number,
    nomeAcomodacao: string,
    camaSolteiro: number,
    camaCasal: number,
    suite: number,
    climatizacao: boolean,
    garagem: number
}

type Cliente = {
    id: number,
    nome: string,
    nomeSocial: string,
    dataNascimento: string,
    id_titular: number | null,
    id_acomodacao: number
}

export default function CadastroUsuario() {
    const [tiposDocumento, setTiposDocumento] = useState([]);
    const [acomodacoes, setAcomodacoes] = useState(new Array<Acomodacao>());
    const [titulares, setTitulares] = useState(new Array<Cliente>());
    const [cliente, setCliente] = useState({
        nome: "",
        nomeSocial: "",
        dataNascimento: "",
        id_titular: null,
        id_acomodacao: 1
    } as Cliente);
    const [endereco, setEndereco] = useState({
        rua: "",
        bairro: "",
        cidade: "",
        estado: "",
        pais: "",
        codigoPostal: ""
    });
    const [documentos, setDocumentos] = useState([{
        id_tipo: 0,
        numero: "",
        dataExpedicao: new Date()
    }]);

    useEffect(() => {
        getTiposDocumento().then(d => setTiposDocumento(d));
        getAcomodacoes().then((d: Acomodacao[]) => setAcomodacoes(d));
        getTitulares().then((d: Cliente[]) => setTitulares(d));
    }, []);

    function adicionarDocumento() {
        setDocumentos([...documentos,
        {
            id_tipo: 0,
            numero: "",
            dataExpedicao: new Date()
        }]);
    }

    function removerDocumento() {
        setDocumentos(documentos.slice(0, -1));
    }

    function listarDocumentos() {
        return (
            <div className="endereco-container">
                {documentos.map((doc, index) =>
                    <div key={index} className="endereco-row">
                        <Documento
                            index={index}
                            onChange={(index: number, data: any) => {
                                setDocumentos(documentos.map((doc, i) => {
                                    if (i == index) {
                                        return data;
                                    }
                                    return doc;
                                }));
                            }}
                            tiposDocumento={tiposDocumento}
                        />
                    </div>
                )}
            </div>
        );
    }

    async function cadastrar() {
        // cadastrar endereco
        const response_endereco = await fetch("http://localhost:7000/endereco/cadastro", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(endereco)
        }).then(response => response.json());

        // cadastrar cliente
        const response_cliente = await fetch("http://localhost:7000/cliente/cadastro", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: cliente.nome,
                nomeSocial: cliente.nomeSocial,
                dataNascimento: cliente.dataNascimento,
                id_endereco: response_endereco.insertId,
                id_titular: cliente.id_titular,
                id_acomodacao: cliente.id_acomodacao
            })
        }).then(response => response.json());

        // cadastrar documentos
        for (let i = 0; i < documentos.length; i++) {
            await fetch("http://localhost:7000/documento/cadastro", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_cliente: response_cliente.insertId,
                    id_tipo: documentos[i].id_tipo,
                    numero: documentos[i].numero,
                    dataExpedicao: documentos[i].dataExpedicao
                })
            }).then(response => response.json());
        }
    }

    return (
        <div className="cad-usuario-div">
            <h1>Cadastro de Usuário</h1>
            <div className="cad-usuario">
                <div className="label-input-div">
                    <label htmlFor="nome">Nome:</label>
                    <input name="nome" type="text" onInput={(e) => { setCliente({ ...cliente, nome: (e.target as HTMLInputElement).value }) }} />
                </div>

                <div className="label-input-div">
                    <label htmlFor="nomeSocial">Nome social:</label>
                    <input name="nomeSocial" type="text" onInput={(e) => { setCliente({ ...cliente, nomeSocial: (e.target as HTMLInputElement).value }) }} />
                </div>

                <div className="label-input-div">
                    <label htmlFor="dataNascimento">Data de nascimento:</label>
                    <input name="dataNascimento" type="date" onInput={(e) => { setCliente({ ...cliente, dataNascimento: (e.target as HTMLInputElement).value }) }} />
                </div>

                <div className="label-input-div">
                    <label htmlFor="acomodacao">Acomodação:</label>
                    <select
                        name="acomodacao"
                        onChange={(e) => {
                            setCliente({ ...cliente, id_acomodacao: parseInt(e.target.selectedOptions[0].value) });
                        }}
                    >
                        {acomodacoes.map(a =>
                            <option key={a.id} value={a.id}>{a.nomeAcomodacao}</option>
                        )}
                    </select>
                </div>
            </div>

            <Endereco
                defaultValues={null}
                onChange={(data: any) =>
                    setEndereco(data)
                }
            />

            <div className="cad-usuario-div">
                <h1>Titular</h1>
                <label htmlFor="titular">Possui titular?</label>
                <select
                    name="titular"
                    onChange={(e) => {
                        setCliente({ ...cliente, id_titular: parseInt(e.target.selectedOptions[0].value) });
                    }}
                    defaultValue={0}
                >
                    <option value={0}>-- Não possui --</option>
                    {titulares.map(t =>
                        <option key={t.id} value={t.id}>{t.nome}</option>
                    )}
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