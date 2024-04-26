import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ImpressorCliente from "../impressores/impressorCliente";
import Impressor from "../interfaces/impressor";
import Cliente from "../modelos/cliente";

export default class ListagemTitularDependente extends Processo {
    private cliente: Cliente;
    private impressor!: Impressor;
    private depNome: string;

    constructor() {
        super();

        this.depNome = this.entrada.receberTexto("Qual o nome do dependente?");
        this.cliente = Armazem.InstanciaUnica.Clientes.filter(
            (cliente) => cliente.Titular && cliente.Nome == this.depNome
        )[0];
    }

    processar(): void {
        console.clear();
        console.log(`Iniciando a listagem do titular do dependente ${this.depNome}...`);

        this.impressor = new ImpressorCliente(this.cliente.Titular);
        console.log(this.impressor.imprimir());
    }
}