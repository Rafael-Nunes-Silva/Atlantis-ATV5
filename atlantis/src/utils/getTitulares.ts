export default function getTitulares() {
    return fetch("http://localhost:7000/cliente/listagemTitulares")
        .then(response => response.json());
}