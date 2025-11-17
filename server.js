import express, { json } from "express";
import { produtoRouter } from './rotas/produtoRoutes.js';

const app = express();
app.use(express.json());
app.use("/produtos", produtoRouter);


app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})