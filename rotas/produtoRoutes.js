import express from 'express';
import { ProdutoController } from '../controllers/produtoController.js';

export const produtoRouter = express.Router();
const controller = new ProdutoController();

produtoRouter.get("/", controller.findAll);
produtoRouter.get("/:iduser", controller.findById);
produtoRouter.delete("/:iduser", controller.remove);
produtoRouter.post("/", controller.register);
produtoRouter.put("/:iduser", controller.update);