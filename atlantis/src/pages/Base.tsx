import { Component } from "react";
import "./css/Base.css";
import { Outlet } from "react-router-dom";

export default class Base extends Component {
    render() {
        return (
            <div className="base-div">
                <header>
                    <h1>Atlantis</h1>
                    <nav className="">
                        <a href="CadastroUsuario" className="nav-btn">Cadastro</a>
                        <a href="ListagemUsuario" className="nav-btn">Listagem</a>
                        {/* <a href="EdicaoUsuario" className="nav-btn">Edição</a> */}
                    </nav>
                </header>
                <Outlet />
                <footer>
                    <h1>Atlantis</h1>
                </footer>
            </div>
        );
    }
}