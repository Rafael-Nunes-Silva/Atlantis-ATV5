import Express from "express";
const router = Express.Router();

const { CreateConnection, EndConnection } = require("../bd/conn");

router.get(
    "/listagem",
    function (req: any, res: any) {
        const dbConn = CreateConnection();
        dbConn.query(
            `select * from cliente;`,
            function (err: any, result: any, fields: any) {
                if (err) {
                    res.status(500).json({ msg: err });
                    EndConnection(dbConn);
                    return;
                }

                if (result.length <= 0) {
                    res.status(400).json({ msg: `Não há clientes cadastrados` });
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