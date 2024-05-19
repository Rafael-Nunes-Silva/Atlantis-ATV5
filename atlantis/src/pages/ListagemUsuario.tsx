import { useEffect, useState } from "react";
import "./css/ListagemUsuario.css";
import getClientes from "../utils/getClientes";

type Documento = {
    id_tipo: number,
    numero: string,
    dataExpedicao: Date
}

type Endereco = {
    rua: string,
    bairro: string,
    cidade: string,
    estado: string,
    pais: string,
    codigoPostal: string
}

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
    id_acomodacao: number,
    acomodacao: Acomodacao,
    documentos: Documento[],
    endereco: Endereco
}

export default function ListagemUsuario() {
    const [listaClientes, setListaClientes] = useState(new Array<Cliente>());

    useEffect(() => {
        try { getClientes().then((clientes: Cliente[]) => setListaClientes(clientes)) }
        catch { setListaClientes([]) }
    }, []);

    function clientes() {
        return listaClientes.map(c =>
            <tr className="list-table-row dark">
                <td>{c.nome}</td>
                <td>{c.nomeSocial}</td>
                <td>{c.dataNascimento}</td>
                <td>{c.acomodacao.nomeAcomodacao}</td>
                <td>{c.endereco.cidade}</td>
                <td>{c.documentos.length}</td>
                <td>
                    <button>
                        <img src="images/trash.png" alt="deletar" className="deletar-img" />
                    </button>
                    <a href={`EdicaoUsuario/${c.id}`}>
                        <img src="images/edit.png" alt="editar" className="editar-img" />
                    </a>
                </td>
            </tr>
        );
    }

    return (
        <div className="list-usuario-div">
            <h1>Listagem de Usuários</h1>
            <div className="list-usuario">
                <table className="list-table">
                    <tr>
                        <th>Nome</th>
                        <th>Nome Social</th>
                        <th>Nascimento</th>
                        <th>Acomodação</th>
                        <th>Endereço</th>
                        <th>Documentos</th>
                        <th>Ação</th>
                    </tr>
                    {clientes()}
                </table>
            </div>
        </div>
    );
}