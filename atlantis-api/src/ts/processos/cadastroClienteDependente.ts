import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import Endereco from "../modelos/endereco";
import CadastrarDocumentosCliente from "./cadastrarDocumentosCliente";


export default class CadastroClienteDependente extends Processo {
    processar(): void {
        console.log("Iniciando o cadastro de um novo cliente...");
        let nome = this.entrada.receberTexto("Qual o nome do novo cliente?");
        let nomeSocial = this.entrada.receberTexto("Qual o nome social do novo cliente?");
        let dataNascimento = this.entrada.receberData("Qual a data de nascimento?");
        let cliente = new Cliente(nome, nomeSocial, dataNascimento);

        const titularNome = this.entrada.receberTexto("Qual o nome do titular?");
        const titular = Armazem.InstanciaUnica.Clientes.filter((cliente) => cliente.Nome == titularNome)[0];
        if (!titular){
            console.log(`O titular ${titularNome} não existe`);
            return;
        }
        cliente.Titular = titular;

        cliente.Endereco = titular.Endereco.clonar() as Endereco;

        this.processo = new CadastrarDocumentosCliente(cliente)
        this.processo.processar()

        titular.Dependentes.push(cliente);

        console.log("Finalizando o cadastro do cliente...");
    }
}