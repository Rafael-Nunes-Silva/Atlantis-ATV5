import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";

export default class RemocaoClienteDependente extends Processo {
    processar(): void {
        console.log("Iniciando remoção de dependente...");

        const nomeTitular = this.entrada.receberTexto("Qual o nome do titular?");
        const titular = Armazem.InstanciaUnica.Clientes.filter(
            (cliente) => !cliente.Titular && cliente.Nome == nomeTitular
        )[0];

        const nomeDependente = this.entrada.receberTexto("Qual o nome do dependente?");
        const dependente = titular.Dependentes.filter(
            (cliente) => cliente.Titular && cliente.Nome == nomeDependente
        )[0];
        
        const index = titular.Dependentes.indexOf(dependente);
        titular.Dependentes.splice(index, 1);

        console.log("Finalizando remoção do dependente...");
    }
}