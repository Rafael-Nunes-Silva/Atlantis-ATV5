import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import CadastroEnderecoTitular from "./cadastroEnderecoTitular";
import TipoEdicaoDocumentos from "./tipoEdicaoDocumentos";

export default class EdicaoClienteTitular extends Processo {
    processar(): void {
        console.log("Iniciando edição de titular...");

        const nome = this.entrada.receberTexto("Qual o nome do titular?");
        const titular = Armazem.InstanciaUnica.Clientes.filter(
            (cliente) => !cliente.Titular && cliente.Nome == nome
        )[0];

        if (!titular){
            console.log(`O titular ${nome} não existe`);
            return;
        }

        if (this.entrada.receberBool("Deseja alterar o nome?", "Sim", "Não")) {
            titular.Nome = this.entrada.receberTexto("Qual o novo nome do titular?");
        }

        if (this.entrada.receberBool("Deseja alterar o nome social?", "Sim", "Não")) {
            titular.NomeSocial = this.entrada.receberTexto("Qual o novo nome social do titular?");
        }

        if (this.entrada.receberBool("Deseja alterar a data de nascimento?", "Sim", "Não")) {
            titular.DataNascimento = this.entrada.receberData("Qual a data de nascimento?");
        }

        if (this.entrada.receberBool("Deseja alterar o endereço?", "Sim", "Não")) {
            this.processo = new CadastroEnderecoTitular(titular);
            this.processo.processar();
        }

        if (this.entrada.receberBool("Deseja adicionar ou remover documentos?", "sim", "não")){
            this.processo = new TipoEdicaoDocumentos(titular);
            this.processo.processar();
        }

        console.log("Finalizando a edição do titular...");
    }
}