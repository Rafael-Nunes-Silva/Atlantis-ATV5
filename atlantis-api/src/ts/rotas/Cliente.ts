import Express from "express";
const router = Express.Router();

const { CreateConnection, EndConnection } = require("../bd/conn");

router.post(
    "/cadastro",
    function (req: any, res: any) {
        const nome = req.body.nome;
        const nomeSocial = req.body.nomeSocial;
        const dataNascimento = req.body.dataNascimento;
        const id_endereco = req.body.id_endereco;
        const id_titular = req.body.id_titular;
        const id_acomodacao = req.body.acomodacao;

        const dbConn = CreateConnection();
        dbConn.query(
            `insert into cliente (nome, nomeSocial, dataNascimento, dataCadastro, id_endereco, id_titular, id_acomodacao)
            values ('${nome}', '${nomeSocial}', '${dataNascimento}', now(), ${id_endereco}, ${id_titular}, ${id_acomodacao});`,
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
                    res.status(404).json({ msg: `Não há clientes cadastrados` });
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