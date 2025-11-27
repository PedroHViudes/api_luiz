import express from 'express';
import { usuariosController } from '../controllers/usuariosController.js';

export const userRouter = express.Router();
const controller = new usuariosController();
userRouter.get("/", controller.findAll);
userRouter.post("/", controller.register);
userRouter.get("/:iduser", controller.findById);
userRouter.delete("/:iduser", controller.remove);

userRouter.put("/:iduser", controller.update);