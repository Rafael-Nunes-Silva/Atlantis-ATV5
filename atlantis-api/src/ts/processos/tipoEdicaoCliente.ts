import Processo from "../abstracoes/processo";
import MenuTipoEdicaoClientes from "../menus/menuTipoEdicaoClientes";
import EdicaoClienteDependente from "./edicaoClienteDependente";
import EdicaoClienteTitular from "./edicaoClienteTitular";

export default class TipoEdicaoCliente extends Processo {
    constructor() {
        super();
        this.menu = new MenuTipoEdicaoClientes();
    }

    processar(): void {
        this.menu.mostrar();
        this.opcao = this.entrada.receberNumero("Qual opção desejada?");
        
        switch (this.opcao) {
            case 1:
                this.processo = new EdicaoClienteTitular();
                this.processo.processar();
                break;
            case 2:
                this.processo = new EdicaoClienteDependente();
                this.processo.processar();
                break;
            default:
                console.log("Opção não entendida :(");
        }
    }
}