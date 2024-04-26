// import Express from "express";
const express = require("express");
const cors = require("cors");

const Acomodacao = require("../rotas/Acomodacao");
const Cliente = require("../rotas/Cliente");
const Documento = require("../rotas/Documento");
const Endereco = require("../rotas/Endereco");
const Telefone = require("../rotas/Telefone");


const PORT = 7000;

const app = express();
app.use(require("body-parser").urlencoded({ extended: false }));
app.use(
    cors({
        origin: "*",
        method: ["GET", "POST"]
    })
);
app.use(express.json());

app.listen(
    PORT,
    function () {
        console.log(`API Atlantis aberta na porta ${7000}`);
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