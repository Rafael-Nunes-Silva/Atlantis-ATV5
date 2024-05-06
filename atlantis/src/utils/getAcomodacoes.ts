export default function getAcomodacoes() {
    return fetch("http://localhost:7000/acomodacao/listagem")
        .then(response => response.json());
}