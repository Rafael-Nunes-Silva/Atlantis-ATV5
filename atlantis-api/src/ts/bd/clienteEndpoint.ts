const express = require("express");
const router = express.Router();

import { CreateConnection, EndConnection } from "./conn";

router.post(
    "/getTodas",
    function (req: any, res: any) {
        const dbConn = CreateConnection();
        dbConn.query(
            `select (per_cod, per_desc, per_resposta) from Perguntas where emp_cod = ${emp_cod};`,
            function (err: any, result: any, fields: any) {
                if (err) {
                    res.status(500).json({ msg: err });
                    EndConnection(dbConn);
                    return;
                }

                if (result.length <= 0) {
                    res.status(400).json({ msg: `Essa empresa ainda não possui perguntas` });
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