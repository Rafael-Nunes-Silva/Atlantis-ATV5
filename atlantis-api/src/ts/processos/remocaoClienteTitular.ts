import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";

export default class RemocaoClienteTitular extends Processo {
    processar(): void {
        console.log("Iniciando remoção de titular...");

        const nome = this.entrada.receberTexto("Qual o nome do titular?");
        const titular = Armazem.InstanciaUnica.Clientes.filter(
            (cliente) => !cliente.Titular && cliente.Nome == nome
        )[0];

        const index = Armazem.InstanciaUnica.Clientes.indexOf(titular);
        Armazem.InstanciaUnica.Clientes.splice(index, 1);

        console.log("Finalizando remoção do titular...");
    }
}