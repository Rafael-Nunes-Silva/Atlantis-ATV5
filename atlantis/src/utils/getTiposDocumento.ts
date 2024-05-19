export default function getTiposDocumento() {
    return fetch("http://localhost:7000/documento/tipos")
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data))
                return data;
            return [];
        });
}