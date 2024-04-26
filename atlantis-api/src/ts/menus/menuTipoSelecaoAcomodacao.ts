import Armazem from "../dominio/armazem";
import Menu from "../interfaces/menu";

export default class MenuTipoSelecaoAcomodacao implements Menu {
    mostrar(): void {
        console.clear();
        console.log(`**************************`);
        console.log(`| Qual acomodação vai ser?`);
        console.log(`----------------------`);
        Armazem.InstanciaUnica.Acomodacoes.forEach(
            (ac, index) => console.log(`| ${index + 1} - ${ac.NomeAcomadacao}`)
        );
        // console.log(`| 1 - Cadastro de Pessoas Física`);
        // console.log(`| 2 - Registro Geral`);
        // console.log(`| 3 - Passaporte`);
        // console.log(`| 0 - Finalizar cadastro de documentos`);
        console.log(`----------------------`);
    }
}