import Menu from "../interfaces/menu";

export default class MenuTipoEdicaoDocumentos implements Menu {
    mostrar(): void {
        console.clear();
        console.log(`****************************`);
        console.log(`| Qual o tipo de edição desejada? `);
        console.log(`----------------------`);
        console.log(`| 1 - Cadastrar documento`);
        console.log(`| 2 - Remover documento`);
        console.log(`----------------------`);
    }
}