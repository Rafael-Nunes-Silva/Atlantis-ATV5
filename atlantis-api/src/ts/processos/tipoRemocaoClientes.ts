import Processo from "../abstracoes/processo";
import MenuTipoRemocaoClientes from "../menus/menuTipoRemocaoClientes";
import RemocaoClienteDependente from "./remocaoClienteDependente";
import RemocaoClienteTitular from "./remocaoClienteTitular";

export default class TipoRemocaoClientes extends Processo {
    constructor() {
        super();
        this.menu = new MenuTipoRemocaoClientes();
    }

    processar(): void {
        this.menu.mostrar();
        this.opcao = this.entrada.receberNumero("Qual a opção desejada?");
        switch (this.opcao) {
            case 1:
                this.processo = new RemocaoClienteTitular();
                this.processo.processar();
                break;
            case 2:
                this.processo = new RemocaoClienteDependente();
                this.processo.processar();
                break;
            default:
                console.log("Opção não entendida... :(");
        }
    }
}