import Menu from "../interfaces/menu";

export default class MenuTipoRemocaoClientes implements Menu {
    mostrar(): void {
        console.clear();
        console.log(`****************************`);
        console.log(`| Qual o tipo de cliente deseja remover? `);
        console.log(`----------------------`);
        console.log(`| 1 - Titular`);
        console.log(`| 2 - Dependente`);
        console.log(`----------------------`);
    }
}