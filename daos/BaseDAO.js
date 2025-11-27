import { pool } from "../config/database.js";

export class BaseDAO {
    constructor(nomeTabela) {
        this.nomeTabela = nomeTabela
    }


    async remove(id) {
        const sql = `DELETE FROM ${this.nomeTabela} WHERE id = ?`;
        const params = [id];

        let connection;

        try {
            connection = await pool.getConnection();
            const [result] = await connection.execute(sql, params);


            if (result.affectedRows > 0) {
                return {
                    status: 200,
                    body: {
                        mensagem: `Registro com ID ${id} deletado com sucesso da tabela ${this.nomeTabela}`,

                    }
                }
            } else {
                return {
                    status: 404,
                    body: {
                        mensagem: `Registro com ${id} não existe`
                    }
                }
            }




        }
        catch (e) {
            console.log("Erro ao remover o produto", e.message);

            return {
                status: 500,
                body: {
                    mensagem: "Erro interno do banco de dados ao tentar remover."
                }
            }
        }
        finally {

            if (connection) {
                connection.release();
            }
        }
    }

    async findAll() {
        const sql = `SELECT * FROM ${this.nomeTabela}`;

        let connection;
        try {
            connection = await pool.getConnection();
            const [rows] = await connection.execute(sql);
            if (rows.length > 0) {
                return {
                    status: 200,
                    body: rows
                }

            } else {
                return {
                    status: 404,
                    body: { mensagem: "Nenhum registo" }
                }
            }


        }
        catch (e) {
            console.log("Erro ao buscar o produto", e.message);
            return {
                status: 500,
                body: { mensagem: "Erro interno ao buscar registro." }
            }
        }
        finally {

            if (connection) {
                connection.release();
            }
        }
    }


    async findById(id) {
        const sql = `SELECT * FROM ${this.nomeTabela} WHERE id = ?`;
        const params = [id];
        let connection;

        try {
            connection = await pool.getConnection();
            const [rows] = await connection.execute(sql, params);
            

            if (rows.length > 0) {
                return {
                    status: 200,
                    body: rows[0]
                };
            } else {

                return {
                    status: 404,
                    body: { mensagem: `Registro com ID ${id} não encontrado.` }
                };
            }
        } catch (e) {
            console.error("Erro ao selecionar o dado:", e.message);

            return {
                status: 500,
                body: { mensagem: "Erro interno ao buscar registro." }
            };
        }
        finally {

            if (connection) {
                connection.release();
            }
        }
    }

    async register(element) {
        const placeHolder = Object.keys(element).map(() => "?").join(",");
        const columns = Object.keys(element).join(",");
        const sql = `INSERT INTO ${this.nomeTabela} (${columns}) VALUES (${placeHolder})`;
        const params = Object.values(element);

        let connection;

        console.log("SQL de Inserção Gerado:", sql);
        console.log("Parâmetros:", params);

        try {
            connection = await pool.getConnection();
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

        finally {

            if (connection) {
                connection.release();
            }
        }
    }


    async update(element) {
        const id = element.id;
        const atualizar = { ...element };
        delete atualizar.id;

        let connection;

        const dados = Object.keys(atualizar).map(coluna => `${coluna} = ?`).join(",");

        const sql = `UPDATE ${this.nomeTabela} SET ${dados} where id = ?`;
        const params = [...Object.values(atualizar), id];
        try {
            connection = await pool.getConnection();
            const [result] = await connection.execute(sql, params);


            if (result.affectedRows > 0) {
                return {
                    status: 200,
                    body: {
                        mensagem: "Produto atualizado com sucesso.",
                        ...element
                    }
                }
            } else {
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
        finally {

            if (connection) {
                connection.release();
            }
        }

    }
}


/*

async findById(id) {
        const sql = `SELECT * FROM ${this.nomeTabela} WHERE id = ?`;
        const params = [id];
        let connection; 

        try {
            connection = await pool.getConnection(); // Atribua a conexão
            const [rows] = await connection.execute(sql, params);

            if (rows.length > 0) {
                return {
                    status: 200,
                    body: rows[0]
                };
            } else {

                return {
                    status: 404,
                    body: { mensagem: `Registro com ID ${id} não encontrado.` }
                };
            }
        } catch(e) {
            console.error("Erro ao selecionar o dado:", e.message);

            return {
                status: 500,
                body: { mensagem: "Erro interno ao buscar registro." }
            };
        } finally {
            //  Melhoria: Garante que a conexão é liberada
            if (connection) {
                connection.release();
            }
        }
    }


    Porquê? Se um erro ocorrer após obter a conexão
     mas antes de liberar, o bloco catch será executado,
      mas a conexão permanecerá aberta no pool (o que é um "vazamento" de conexão). 
      O bloco finally sempre executa, garantindo a liberação
*/ 