import { pool } from "../config/database.js";

export class BaseDAO {
    constructor(nomeTabela) {
        this.nomeTabela = nomeTabela
    }
    async remove(id) {
        const sql = `DELETE FROM ${this.nomeTabela} WHERE id = ?`;
        const params = [id];
        try {
            const connection = await pool.getConnection();
            const [result] = await connection.execute(sql, params);
            

               if(result.affectedRows > 0 ){
                return {
                    status: 200,
                    body: {
                        mensagem: `id ${result.id} deletado com sucesso`,
                        ...id
                    }
                }
            }
console.log(result);
        
            
            
        }
        catch (e) {
            console.log("Erro ao alterar o produto", e.message);
        }
    }

    async findAll() {
        const sql = `SELECT * FROM ${this.nomeTabela}`;

        try {
            const connection = await pool.getConnection();
            const [rows] = await connection.execute(sql);
            return rows;
        }
        catch (e) {
            console.log("Erro ao alterar o produto", e.message);
        }
    }
    async findById(id) {
        const sql = `SELECT * FROM ${this.nomeTabela} WHERE id = ?`;
        const params = [id];
        try {
            const [rows] = await connection.execute(sql, params);
        }
        catch (e) {
            console.log("Erro ao selecionar o registro", e.message);
        }
    }

    async register(element) {
        const placeHolder = Object.keys(element).map(() => "?").join(",");
        const columns = Object.keys(element).join(",");
        const sql = `INSERT INTO ${this.nomeTabela} (${columns}) VALUES (${placeHolder})`;
        const params = Object.values(element);
        try {
            const connection = await pool.getConnection();
            const [result] = await connection.execute(sql, params);
            return {
                status: 200,
                body: {
                    id: result.insertId,
                    ...element
                }
            }
        } catch (error) {
            if (error.code == "ER_BAD_FIELD_ERROR") {
                return {
                    status: 400,
                    body: {
                        "mensagem": "Dados incorretos."
                    }
                }
            }
            throw error;
        }
    }


    async update(element) {
        const id = element.id;
        const atualizar = { ...element };
        delete atualizar.id;

        const dados = Object.keys(atualizar).map(coluna => `${coluna} = ?`).join(",");

        const sql = `UPDATE ${this.nomeTabela} SET ${dados} where id = ?`;
        const params = [...Object.values(atualizar), id];
        try {
            const connection = await pool.getConnection();
            const [result] = await connection.execute(sql, params);


            if(result.affectedRows > 0 ){
                return {
                    status: 200,
                    body: {
                        mensagem: "Produto atualizado com sucesso.",
                        ...element
                    }
                }
            }else {
                 return {
                    status: 404, 
                    body: {
                        mensagem: `produto com ID ${id} não está na tabela ${this.nomeTabela}.`
                    }
                }
            };

        }
        catch (error) {
            console.error("Erro ao atualizar o registro:", error.message);
            if (error.code === "ER_BAD_FIELD_ERROR") {
                return {
                    status: 400,
                    body: {
                        "mensagem": "Dados incorretos (campo(s) inválido(s) ou faltando)."
                    }
                };
            }
           
            throw error;
        }

    }
}