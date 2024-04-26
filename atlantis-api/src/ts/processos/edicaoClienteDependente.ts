import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import TipoEdicaoDocumentos from "./tipoEdicaoDocumentos";

export default class EdicaoClienteDependente extends Processo {
    processar(): void {
        console.log("Iniciando edição de dependente...");

        const nomeTitular = this.entrada.receberTexto("Qual o nome do titular?");
        const titular = Armazem.InstanciaUnica.Clientes.filter(
            (cliente) => !cliente.Titular && cliente.Nome == nomeTitular
        )[0];

        const nomeDependente = this.entrada.receberTexto("Qual o nome do dependente?");
        const dependente = titular.Dependentes.filter(
            (cliente) => cliente.Titular && cliente.Nome == nomeDependente
        )[0];

        if (!dependente){
            console.log(`O dependente ${nomeDependente} não existe`);
            return;
        }

        if (this.entrada.receberBool("Deseja alterar o nome?", "Sim", "Não")) {
            dependente.Nome = this.entrada.receberTexto("Qual o novo nome do titular?");
        }

        if (this.entrada.receberBool("Deseja alterar o nome social?", "Sim", "Não")) {
            dependente.NomeSocial = this.entrada.receberTexto("Qual o novo nome social do dependente?");
        }

        if (this.entrada.receberBool("Deseja alterar a data de nascimento?", "Sim", "Não")) {
            dependente.DataNascimento = this.entrada.receberData("Qual a data de nascimento?");
        }

        if (this.entrada.receberBool("Deseja adicionar ou remover documentos?", "sim", "não")){
            this.processo = new TipoEdicaoDocumentos(dependente);
            this.processo.processar();
        }

        console.log("Finalizando edição do dependente...");
    }
}