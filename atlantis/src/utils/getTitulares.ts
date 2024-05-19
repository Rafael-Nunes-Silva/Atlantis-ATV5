export default function getTitulares() {
    return fetch("http://localhost:7000/cliente/listagemTitular")
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data))
                return data;
            return [];
        });
}