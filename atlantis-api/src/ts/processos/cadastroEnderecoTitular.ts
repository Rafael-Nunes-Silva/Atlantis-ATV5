import { EventEmitter } from "stream";
import Processo from "../abstracoes/processo";
import Cliente from "../modelos/cliente";
import Endereco from "../modelos/endereco";

export default class CadastroEnderecoTitular extends Processo {
    private cliente: Cliente;

    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
    }

    processar(): void {
        console.log("Coletando os dados de endereço...");
        const rua = this.entrada.receberTexto("Qual a rua?");
        const bairro = this.entrada.receberTexto("Qual o bairro?");
        const cidade = this.entrada.receberTexto("Qual a cidade?");
        const estado = this.entrada.receberTexto("Qual o estado?");
        const pais = this.entrada.receberTexto("Qual o país?");
        const codigoPostal = this.entrada.receberTexto("Qual o código postal?");
        const endereco = new Endereco(rua, bairro, cidade, estado, pais, codigoPostal);
        this.cliente.Endereco = endereco;
        this.cliente.Dependentes.forEach(
            (dep) => dep.Endereco = endereco.clonar() as Endereco
        );
    }

}