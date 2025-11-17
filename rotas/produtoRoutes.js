import express from 'express';
import { ProdutoController } from '../controllers/produtoController.js';

export const produtoRouter = express.Router();
const controller = new ProdutoController();

produtoRouter.get("/", controller.findAll);
produtoRouter.get("/:idProduto", controller.findById);
produtoRouter.delete("/:idProduto", controller.remove);
produtoRouter.post("/", controller.register);
produtoRouter.put("/:idProduto", controller.update);