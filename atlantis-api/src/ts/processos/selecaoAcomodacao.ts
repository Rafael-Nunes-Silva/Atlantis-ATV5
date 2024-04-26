import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import MenuTipoSelecaoAcomodacao from "../menus/menuTipoSelecaoAcomodacao";
import Cliente from "../modelos/cliente";

export default class SelecaoAcomodacao extends Processo {
    private cliente: Cliente;

    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
        this.menu = new MenuTipoSelecaoAcomodacao();
    }

    processar(): void {
        console.log("Inciando a seleção de acomodação...");
        this.menu.mostrar();
        this.opcao = this.entrada.receberNumero("Qual opção desejada?");
        this.cliente.Acomodacao = Armazem.InstanciaUnica.Acomodacoes[this.opcao - 1];
    }
}