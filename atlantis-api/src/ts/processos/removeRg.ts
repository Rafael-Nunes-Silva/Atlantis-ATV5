import Processo from "../abstracoes/processo";
import { TipoDocumento } from "../enumeracoes/TipoDocumento";
import Cliente from "../modelos/cliente";

export default class RemoveRg extends Processo {
    private cliente: Cliente;

    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
    }

    processar(): void {
        const numero = this.entrada.receberTexto("Qual o número do documento?");
        const dataExpedicao = this.entrada.receberData("Qual a data de expedição do documento?");

        let index = 0;
        for (; index < this.cliente.Documentos.length; index++) {
            const cliente = this.cliente.Documentos[index];
            if (cliente.Numero == numero &&
                cliente.Tipo == TipoDocumento.RG &&
                cliente.DataExpedicao.getTime() == dataExpedicao.getTime()) {
                break;
            }
        }
        this.cliente.Documentos.splice(index, 1);
    }
}