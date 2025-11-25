import { pool } from "../config/database.js";
import { BaseDAO } from "./BaseDAO.js";

export class UsuariosDao extends BaseDAO{

    constructor(){
        super("usuarios");
    }


}
