import express, { json } from "express";
import { produtoRouter } from './rotas/produtoRoutes.js';
import { userRouter } from "./rotas/UsuarioRoutes.js";

const app = express();
app.use(express.json());
app.use("/produtos", produtoRouter);
app.use("/user",userRouter);


app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})