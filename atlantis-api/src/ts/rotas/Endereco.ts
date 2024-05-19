import Express from "express";
const router = Express.Router();

const { CreateConnection, EndConnection } = require("../bd/conn");

router.post(
    "/cadastro",
    function (req: any, res: any) {
        const {
            rua,
            bairro,
            cidade,
            estado,
            pais,
            codigoPostal
        } = req.body;
        const dbConn = CreateConnection();
        dbConn.query(
            `insert into endereco (rua, bairro, cidade, estado, pais, codigoPostal)
            values ('${rua}', '${bairro}', '${cidade}', '${estado}', '${pais}', '${codigoPostal}');`,
            function (err: any, result: any, fields: any) {
                if (err) {
                    res.status(500).json({ msg: err });
                    EndConnection(dbConn);
                    return;
                }

                res.status(201).json(result);
                EndConnection(dbConn);
            }
        );
    }
);

router.put(
    "/atualizacao",
    function (req: any, res: any) {
        const {
            id,
            rua,
            bairro,
            cidade,
            estado,
            pais,
            codigoPostal
        } = req.body;

        let query = "update endereco set";
        let sets = [];
        if (rua) sets.push(`rua = '${rua}'`);
        if (bairro) sets.push(`bairro = '${bairro}'`);
        if (cidade) sets.push(`cidade = '${cidade}'`);
        if (estado) sets.push(`estado = '${estado}'`);
        if (pais) sets.push(`pais = '${pais}'`);
        if (codigoPostal) sets.push(`codigoPostal = '${codigoPostal}'`);
        query += sets.join(", ");
        query += ` where id = ${id};`;

        const dbConn = CreateConnection();
        dbConn.query(
            query,
            function (err: any, result: any, fields: any) {
                if (err) {
                    res.status(500).json({ msg: err });
                    EndConnection(dbConn);
                    return;
                }

                res.status(201).json(result);
                EndConnection(dbConn);
            }
        );
    }
);

router.get(
    "/listagem/:id",
    function (req: any, res: any) {
        const id = req.params.id;
        const dbConn = CreateConnection();
        dbConn.query(
            `select * from endereco where id = ${id};`,
            function (err: any, result: any, fields: any) {
                if (err) {
                    res.status(500).json({ msg: err });
                    EndConnection(dbConn);
                    return;
                }

                if (result.length <= 0) {
                    res.status(404).json({ msg: `Não há endereços cadastrados com o id ${id}` });
                    EndConnection(dbConn);
                    return;
                }

                res.status(200).json(result);
                EndConnection(dbConn);
            }
        );
    }
);

module.exports = router;