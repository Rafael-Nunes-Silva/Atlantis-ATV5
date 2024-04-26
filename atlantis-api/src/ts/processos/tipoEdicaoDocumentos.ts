import Processo from "../abstracoes/processo";
import MenuTipoEdicaoDocumentos from "../menus/menuTipoEdicaoDocumentos";
import Cliente from "../modelos/cliente";
import CadastrarDocumentosCliente from "./cadastrarDocumentosCliente";
import RemoverDocumentosCliente from "./removerDocumentosCliente";

export default class TipoEdicaoDocumentos extends Processo {
    private cliente: Cliente;

    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
        this.menu = new MenuTipoEdicaoDocumentos();
    }

    processar(): void {
        this.menu.mostrar();
        this.opcao = this.entrada.receberNumero("Qual a opção desejada?");
        switch (this.opcao) {
            case 1:
                this.processo = new CadastrarDocumentosCliente(this.cliente);
                this.processo.processar();
                break;
            case 2:
                this.processo = new RemoverDocumentosCliente(this.cliente);
                this.processo.processar();
                break;
            default:
                console.log("Opção não entendida... :(");
        }
    }
}