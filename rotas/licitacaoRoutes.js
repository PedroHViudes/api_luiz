import express from 'express';
import { licitacaoController } from "../controllers/licitacaoController.js";

export const licitacaoRouter = express.Router();
const controller = new licitacaoController();

licitacaoRouter.post("/", controller.register);
licitacaoRouter.get("/", controller.findAll);
licitacaoRouter.get("/:idLicit", controller.findById);
licitacaoRouter.delete("/:idLicit", controller.remove);
licitacaoRouter.put("/:idLicit", controller.update);