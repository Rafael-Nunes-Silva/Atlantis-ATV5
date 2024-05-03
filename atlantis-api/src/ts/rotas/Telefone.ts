import Express from "express";
const router = Express.Router();

const { CreateConnection, EndConnection } = require("../bd/conn");

router.get(
    "/listagem/:cliente_id",
    function (req: any, res: any) {
        const cliente_id = req.params.cliente_id;
        console.log(cliente_id);
        const dbConn = CreateConnection();
        dbConn.query(
            `select * from telefone where cliente_id = ${cliente_id};`,
            function (err: any, result: any, fields: any) {
                if (err) {
                    res.status(500).json({ msg: err });
                    EndConnection(dbConn);
                    return;
                }

                if (result.length <= 0) {
                    res.status(404).json({ msg: `Não há telefones cadastrados para o cliente ${cliente_id}` });
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