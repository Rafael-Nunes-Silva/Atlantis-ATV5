import "./css/ListagemUsuario.css";

export default function ListagemUsuario() {
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
                    <tr className="list-table-row dark">
                        <td>Bruno Serpa</td>
                        <td>BS FG</td>
                        <td>69-69-6969</td>
                        <td>Quarto</td>
                        <td>Centro</td>
                        <td>6</td>
                        <td>
                            <button>
                                <img src="images/trash.png" className="deletar-img" />
                            </button>
                            <a href="EdicaoUsuario">
                                <img src="images/edit.png" className="editar-img" />
                            </a>
                        </td>
                    </tr>
                    <tr className="list-table-row light">
                        <td>Bruno Serpa</td>
                        <td>BS FG</td>
                        <td>69-69-6969</td>
                        <td>Quarto</td>
                        <td>Centro</td>
                        <td>6</td>
                        <td>
                            <button>
                                <img src="images/trash.png" className="deletar-img" />
                            </button>
                            <a href="EdicaoUsuario">
                                <img src="images/edit.png" className="editar-img" />
                            </a>
                        </td>
                    </tr>
                    <tr className="list-table-row dark">
                        <td>Bruno Serpa</td>
                        <td>BS FG</td>
                        <td>69-69-6969</td>
                        <td>Quarto</td>
                        <td>Centro</td>
                        <td>6</td>
                        <td>
                            <button>
                                <img src="images/trash.png" className="deletar-img" />
                            </button>
                            <a href="EdicaoUsuario">
                                <img src="images/edit.png" className="editar-img" />
                            </a>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    );
}