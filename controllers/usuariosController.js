
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


    async update(req, res) {
        const iduser = req.params.iduser;
        const novosDados = req.body;

        const atualizarUser = {
            id: Number(iduser),
            ...novosDados
        };
        try {
            const retorno = await usuariosDao.update(atualizarUser);

            console.log(retorno);

            return res.status(retorno.status).json(retorno.body)

        }

        catch (error) {
            console.error("Erro no servidor:", error);
            return res.status(500).json({ mensagem: "Erro no servidor" })
        }




    }


    async remove(req, res) {
        const iduser = req.params.iduser;

        try {

            const resultado = await usuariosDao.remove(iduser);

            return res.status(resultado.status).json(resultado.body);



        } catch (error) {
            console.error("Erro no servidor:", error);
            return res.status(500).json({ mensagem: "Erro no servidor" })
        }




    }


    async findById(req, res) {
        const iduser = req.params.iduser;

        try {
            const resultado = await usuariosDao.findById(iduser);

            return res.status(resultado.status).json(resultado.body)


        } catch (error) {
            console.error("Erro no servidor ao buscar produto:", error);
            return res.status(500).json({ mensagem: "Erro interno do servidor." });
        }




    }


}