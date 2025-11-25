import express from 'express';
import { usuariosController } from '../controllers/usuariosController.js';

export const userRouter = express.Router();
const controller = new usuariosController();
userRouter.post("/", controller.register);
userRouter.get("/", controller.findAll);

