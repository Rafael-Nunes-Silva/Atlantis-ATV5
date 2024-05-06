const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const Acomodacao = require("../rotas/Acomodacao");
const Cliente = require("../rotas/Cliente");
const Documento = require("../rotas/Documento");
const Endereco = require("../rotas/Endereco");
const Telefone = require("../rotas/Telefone");


const PORT = 7000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(
    cors({
        origin: "*",
        method: ["GET", "POST"]
    })
);

app.listen(
    PORT,
    function () {
        console.log(`API Atlantis aberta na porta ${PORT}`);
    }
);

app.get(
    "/",
    function (req: any, res: any) {
        res.send("API Atlantis");
    }
);

app.use("/acomodacao", Acomodacao);
app.use("/cliente", Cliente);
app.use("/documento", Documento);
app.use("/endereco", Endereco);
app.use("/telefone", Telefone);

module.exports = app;