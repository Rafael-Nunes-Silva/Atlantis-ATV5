import { useEffect, useState } from "react";
import Endereco from "../components/Endereco";
import Documento from "../components/Documento";
import "./css/EdicaoUsuario.css";
import getTiposDocumento from "../utils/getTiposDocumento";
import getAcomodacoes from "../utils/getAcomodacoes";
import getTitulares from "../utils/getTitulares";
import { useParams } from "react-router-dom";
import getCliente from "../utils/getCliente";

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

type tDocumento = {
    id: number,
    id_tipo: number,
    numero: string,
    dataExpedicao: Date
}

type tTipoDocumento = {
    id: number,
    nome: string
}

export default function EdicaoUsuario() {
    const { id } = useParams();
    const [tiposDocumento, setTiposDocumento] = useState(new Array<tTipoDocumento>());
    const [acomodacoes, setAcomodacoes] = useState(new Array<Acomodacao>());
    const [titulares, setTitulares] = useState(new Array<Cliente>());
    const [cliente, setCliente] = useState({
        id: 0,
        nome: "",
        nomeSocial: "",
        dataNascimento: "",
        id_titular: null,
        id_acomodacao: 1
    } as Cliente);
    const [endereco, setEndereco] = useState({
        id: 0,
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
    }] as tDocumento[]);

    useEffect(() => {
        try { getTiposDocumento().then(d => setTiposDocumento(d)); }
        catch { setTiposDocumento([]); }

        try { getAcomodacoes().then((d: Acomodacao[]) => setAcomodacoes(d)); }
        catch { setAcomodacoes([]); }

        try { getTitulares().then((d: Cliente[]) => setTitulares(d)); }
        catch { setTitulares([]); }

        if (!id) return;

        getCliente(parseInt(id))
            .then(c => {
                setCliente({
                    id: parseInt(id),
                    nome: c.nome,
                    nomeSocial: c.nomeSocial,
                    dataNascimento: c.dataNascimento,
                    id_titular: c.id_titular,
                    id_acomodacao: c.id_acomodacao
                });
                setEndereco({
                    id: c.endereco.id,
                    rua: c.endereco.rua,
                    bairro: c.endereco.bairro,
                    cidade: c.endereco.cidade,
                    estado: c.endereco.estado,
                    pais: c.endereco.pais,
                    codigoPostal: c.endereco.codigoPostal
                });
                setDocumentos(c.documentos as tDocumento[]);
            });
    }, []);

    function adicionarDocumento() {
        setDocumentos([...documentos,
        {
            id: 0,
            id_tipo: 0,
            numero: "",
            dataExpedicao: new Date()
        }]);
    }

    function removerDocumento() {
        fetch("http://localhost:7000/documento/deletar", {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(documentos[documentos.length - 1])
        })
            .then(response => response.json())
            .then(data => console.log(data));
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
                                    if (i === index) {
                                        return data;
                                    }
                                    return doc;
                                }));
                            }}
                            tiposDocumento={tiposDocumento}
                            defaultValues={doc}
                        />
                    </div>
                )}
            </div>
        );
    }

    async function atualizar() {
        // atualizar endereco
        const response_endereco = await fetch("http://localhost:7000/endereco/atualizacao", {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(endereco)
        }).then(response => response.json());

        // atualizar cliente
        const response_cliente = await fetch("http://localhost:7000/cliente/atualizacao", {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: cliente.id,
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
            if (documentos[i].id) continue;
            await fetch("http://localhost:7000/documento/cadastro", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_cliente: cliente.id,
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
                    <input
                        name="nome"
                        type="text"
                        defaultValue={cliente.nome}
                        onInput={(e) => {
                            setCliente({
                                ...cliente,
                                nome: (e.target as HTMLInputElement).value
                            })
                        }}
                    />
                </div>

                <div className="label-input-div">
                    <label htmlFor="nomeSocial">Nome social:</label>
                    <input
                        name="nomeSocial"
                        type="text"
                        defaultValue={cliente.nomeSocial}
                        onInput={(e) => {
                            setCliente({
                                ...cliente,
                                nomeSocial: (e.target as HTMLInputElement).value
                            })
                        }}
                    />
                </div>

                <div className="label-input-div">
                    <label htmlFor="dataNascimento">Data de nascimento:</label>
                    <input
                        name="dataNascimento"
                        type="date"
                        defaultValue={cliente.dataNascimento}
                        onInput={(e) => {
                            setCliente({
                                ...cliente,
                                dataNascimento: (e.target as HTMLInputElement).value
                            })
                        }}
                    />
                </div>

                <div className="label-input-div">
                    <label htmlFor="acomodacao">Acomodação:</label>
                    <select
                        name="acomodacao"
                        onChange={(e) => {
                            setCliente({
                                ...cliente,
                                id_acomodacao: parseInt(e.target.selectedOptions[0].value)
                            });
                        }}
                        defaultValue={cliente.id_acomodacao}
                    >
                        {acomodacoes.map(a =>
                            <option key={a.id} value={a.id}>{a.nomeAcomodacao}</option>
                        )}
                    </select>
                </div>
            </div>

            <Endereco
                defaultValues={endereco}
                onChange={(data: any) =>
                    setEndereco({
                        id: endereco.id,
                        ...data
                    })
                }
            />

            <div className="cad-usuario-div">
                <h1>Titular</h1>
                <label htmlFor="titular">Possui titular?</label>
                <select
                    name="titular"
                    onChange={(e) => {
                        setCliente({
                            ...cliente,
                            id_titular: parseInt(e.target.selectedOptions[0].value)
                        });
                    }}
                    defaultValue={cliente.id_titular || 0}
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

            <button className="btn btn-cadastrar" onClick={atualizar}>Cadastrar</button>
        </div>
    );
}