export default async function getClientes() {
    const clientes = await fetch(`http://localhost:7000/cliente/listagem`)
        .then(response => response.json());

    const clientesList = [];
    for (let i = 0; i < clientes.length; i++) {
        const cliente = await fetch(`http://localhost:7000/cliente/listar/${clientes[i].id}`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data))
                    return data[0];
                return null;
            });

        const id_cliente = cliente.id;
        const id_endereco = cliente.id_endereco;
        const id_acomodacao = cliente.id_acomodacao;

        const endereco = await fetch(`http://localhost:7000/endereco/listagem/${id_endereco}`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data))
                    return data[0];
                return null;
            });

        const documentos = await fetch(`http://localhost:7000/documento/listagem/${id_cliente}`)
            .then(response => response.json());

        const acomodacao = await fetch(`http://localhost:7000/acomodacao/listagem/${id_acomodacao}`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data))
                    return data[0];
                return null;
            });

        clientesList.push({
            ...cliente,
            acomodacao: acomodacao,
            endereco: endereco,
            documentos: documentos
        });
    }

    return clientesList;
}