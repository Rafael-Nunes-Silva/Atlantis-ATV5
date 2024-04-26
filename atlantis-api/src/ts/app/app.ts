// // import Processo from "../abstracoes/processo";
// // import CadastroAcomodacoes from "../processos/cadastroAcomodacoes";
// // import Principal from "../processos/principal";
// // const express = require("express");

// // console.clear();
// // console.log(`Bem-vindo(a) ao melhor sistema de gestão de clubes, hotéis e resorts do mundo, o Atlantis :)`);

// // let processo: Processo;
// // processo = new CadastroAcomodacoes();
// // processo.processar();

// // let execucao: Boolean = true;
// // while (execucao) {
// //     processo = new Principal();
// //     processo.processar();
// //     execucao = processo.Execucao;
// // }













const express = require("express");
const cors = require("cors");

const Acomodacao = require("./rotas/Acomodacao");
const Cliente = require("./rotas/Cliente");
const Documento = require("./rotas/Documento");
const Endereco = require("./rotas/Endereco");
const Telefone = require("./rotas/Telefone");


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