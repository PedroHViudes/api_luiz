import express, { json } from "express";
import { produtoRouter } from './rotas/produtoRoutes.js';
import { userRouter } from "./rotas/UsuarioRoutes.js";
import { licitacaoRouter } from "./rotas/licitacaoRoutes.js";

const app = express();
app.use(express.json());
app.use("/produtos", produtoRouter);
app.use("/user",userRouter);
app.use("/licitacao", licitacaoRouter);



app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})