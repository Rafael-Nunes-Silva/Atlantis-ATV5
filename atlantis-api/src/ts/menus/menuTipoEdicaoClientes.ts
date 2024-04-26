import Menu from "../interfaces/menu";

export default class MenuTipoEdicaoClientes implements Menu {
    mostrar(): void {
        console.clear()
        console.log(`****************************`)
        console.log(`| Qual o tipo de edição desejada? `)
        console.log(`----------------------`)
        console.log(`| 1 - Editar titular`)
        console.log(`| 2 - Editar Dependente`)
        console.log(`----------------------`)
    }
}