export default async function getCliente(id: number) {
    const cliente = await fetch(`http://localhost:7000/cliente/listagem/${id}`)
        .then(response => response.json());

    const endereco = await fetch(`http://localhost:7000/endereco/listagem/${id}`)
        .then(response => response.json());

    const documentos = await fetch(`http://localhost:7000/documento/listagem/${id}`)
        .then(response => response.json());

    return {
        ...cliente,
        endereco: endereco,
        documentos: documentos
    }
}