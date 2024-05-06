import Express from "express";
const router = Express.Router();

const { CreateConnection, EndConnection } = require("../bd/conn");

router.post(
    "/cadastro",
    function (req: any, res: any) {
        const {
            id_cliente,
            id_tipo,
            numero,
            dataExpedicao
        } = req.body;

        const dbConn = CreateConnection();
        dbConn.query(
            `insert into documento (id_cliente, id_tipo, numero, dataExpedicao)
            values (${id_cliente}, ${id_tipo}, '${numero}', '${dataExpedicao}');`,
            function (err: any, result: any, fields: any) {
                if (err) {
                    res.status(500).json({ msg: err });
                    EndConnection(dbConn);
                    return;
                }

                res.status(200).json(result);
                EndConnection(dbConn);
            }
        );
    }
);

router.get(
    "/tipos",
    function (req: any, res: any) {
        const dbConn = CreateConnection();
        dbConn.query(
            `select * from tipoDocumento`,
            function (err: any, result: any, fields: any) {
                if (err) {
                    res.status(500).json({ msg: err });
                    EndConnection(dbConn);
                    return;
                }

                if (result.length <= 0) {
                    res.status(404).json({ msg: `Não há nenhum tipo de documento cadastrado` });
                    EndConnection(dbConn);
                    return;
                }

                res.status(200).json(result);
                EndConnection(dbConn);
            }
        );
    }
);

router.get(
    "/listagem/:cliente_id",
    function (req: any, res: any) {
        const cliente_id = req.params.cliente_id;
        const dbConn = CreateConnection();
        dbConn.query(
            `select * from documento where id_cliente = ${cliente_id};`,
            function (err: any, result: any, fields: any) {
                if (err) {
                    res.status(500).json({ msg: err });
                    EndConnection(dbConn);
                    return;
                }

                if (result.length <= 0) {
                    res.status(404).json({ msg: `Não há documentos cadastrados para o cliente ${cliente_id}` });
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