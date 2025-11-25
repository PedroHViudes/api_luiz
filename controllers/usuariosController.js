
import { UsuariosDao } from "../daos/UsuariosDAO.js";

const usuariosDao = new UsuariosDao()

export class usuariosController {

    async register(req, res) {
        const user = req.body;

        if (!user.nome_user || !user.senha) {
            return res.status(400).json({ "mensagem": "Os Dados é obrigatório" });
        }
        

        try {
            const retorno = await usuariosDao.register(user)

            return res.status(retorno.status).json(retorno.body);


        }
        catch (error) {
            console.error("Erro ao cadastrar o produto:", error);
            return res.status(500).json({ "mensagem": "Erro interno do servidor " });
        }


    }

     async findAll(_req, res) {

        try {
            const user = await usuariosDao.findAll();

            return res.status(user.status).json(user.body)
        }
        catch (error) {
            console.error("erro ao buscar os usuarios", error);
            return res.status(500).json({ mensagem: "Erro interno do servidor." });

        }


    }

}