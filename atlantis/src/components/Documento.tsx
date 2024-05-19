import { useEffect, useState } from "react";
import "./css/Documento.css";

type tipoDocumento = {
    id: number,
    nome: string
}

type doc = {
    id_tipo: number,
    numero: string,
    dataExpedicao: Date
}

type Props = {
    index: number,
    onChange: CallableFunction,
    tiposDocumento: Array<tipoDocumento>,
    defaultValues: doc | null,
};

export default function Documento(props: Props) {
    const [documento, setDocumento] = useState({
        id_tipo: props.defaultValues?.id_tipo || 0,
        numero: props.defaultValues?.numero || "",
        dataExpedicao: props.defaultValues?.dataExpedicao || new Date()
    });

    useEffect(() => {
        props.onChange(props.index, documento);
    }, [documento]);

    return (
        <div className="documento-div">
            <div className="label-input-div">
                <label htmlFor="tipo">Tipo:</label>
                <select
                    name="tipo"
                    onInput={(event) =>
                        setDocumento({ ...documento, id_tipo: parseInt((event.target as HTMLSelectElement).value) })
                    }
                    defaultValue={props.defaultValues?.id_tipo}
                >
                    <option disabled value={0}>-- Selecione o tipo do documento --</option>
                    {props.tiposDocumento.map(t =>
                        <option key={t.id} value={t.id}>{t.nome}</option>
                    )}
                </select>
            </div>

            <div className="label-input-div">
                <label htmlFor="numDocumento">Documento:</label>
                <input
                    name="numDocumento"
                    type="text"
                    onInput={(event) => setDocumento({
                        ...documento,
                        numero: (event.target as HTMLSelectElement).value
                    })}
                    defaultValue={props.defaultValues?.numero}
                />
            </div>

            <div className="label-input-div">
                <label htmlFor="dataExpedicao">Data Expedição:</label>
                <input
                    name="dataExpedicao"
                    type="date"
                    onInput={(event) => setDocumento({
                        ...documento,
                        dataExpedicao: new Date((event.target as HTMLSelectElement).value)
                    })}
                    defaultValue={props.defaultValues?.dataExpedicao.toLocaleString().slice(0, 10)}
                />
            </div>
        </div>
    );
}