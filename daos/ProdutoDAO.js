import { pool } from "../config/database.js";
import { BaseDAO } from "./BaseDAO.js";

export class ProdutoDAO extends BaseDAO {
    constructor() {
        super("produtos");
    }



}