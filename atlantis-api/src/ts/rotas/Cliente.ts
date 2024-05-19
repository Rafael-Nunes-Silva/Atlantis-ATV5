import Express from "express";
const router = Express.Router();

const { CreateConnection, EndConnection } = require("../bd/conn");

router.post(
    "/cadastro",
    function (req: any, res: any) {
        const {
            nome,
            nomeSocial,
            dataNascimento,
            id_endereco,
            id_titular,
            id_acomodacao
        } = req.body;

        const dbConn = CreateConnection();
        dbConn.query(
            `insert into cliente (nome, nomeSocial, dataNascimento, dataCadastro, id_endereco, id_titular, id_acomodacao)
            values ('${nome}', '${nomeSocial}', '${dataNascimento.toLocaleString().slice(0, 10)}', now(), ${id_endereco}, ${(id_titular > 0 ? id_titular : null)}, ${id_acomodacao});`,
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
            nome,
            nomeSocial,
            dataNascimento,
            id_acomodacao
        } = req.body;

        let query = "update cliente set";
        let sets = [];
        if (nome) sets.push(`nome = '${nome}'`);
        if (nomeSocial) sets.push(`nomeSocial = '${nomeSocial}'`);
        if (dataNascimento) sets.push(`dataNascimento = '${dataNascimento.toLocaleString().slice(0, 10)}'`);
        if (id_acomodacao) sets.push(`id_acomodacao = ${id_acomodacao}`);
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
    "/listar/:id",
    function (req: any, res: any) {
        const id = req.params.id;
        const dbConn = CreateConnection();
        dbConn.query(
            `select * from cliente where id = ${id};`,
            function (err: any, result: any, fields: any) {
                if (err) {
                    res.status(500).json({ msg: err });
                    EndConnection(dbConn);
                    return;
                }

                if (result.length <= 0) {
                    res.status(404).json({ msg: `Não há um cliente com o id ${id}` });
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

router.get(
    "/listagemTitular",
    function (req: any, res: any) {
        const dbConn = CreateConnection();
        dbConn.query(
            `select * from cliente where isnull(id_titular);`,
            function (err: any, result: any, fields: any) {
                if (err) {
                    res.status(500).json({ msg: err });
                    EndConnection(dbConn);
                    return;
                }

                if (result.length <= 0) {
                    res.status(404).json({ msg: `Não há clientes titulares cadastrados` });
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