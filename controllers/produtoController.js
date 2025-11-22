import { ProdutoDAO } from "../daos/ProdutoDAO.js";

const produtoDAO = new ProdutoDAO();

export class ProdutoController {

    /*
    Feitooooooo
    Antes de inserir, verificar se os dados obrigatórios estão presentes
    */
    async register(req, res) {
        const produto = req.body;

        if (!produto.nome) {
            return res.status(400).json({ "mensagem": "nome do produto é obrigatório" });
        }
        
        const valornum = parseFloat(produto.valor);
        
        if (isNaN(valornum) || valornum <= 0) {
         
            return res.status(400).json({ "mensagem": "O preço do produto é obrigatório e deve ser maior que zero." })
            
        }

        produto.valor = valornum;

        try {
            const retorno = await produtoDAO.register(produto)

            return res.status(retorno.status).json(retorno.body);


        }
        catch (error) {
            console.error("Erro ao cadastrar o produto:", error);
            return res.status(500).json({ "mensagem": "Erro interno do servidor " });
        }


    }

    /*
        FEITOOOOOOOOO
        Se não encontrar, retornar erro
        */

    async findAll(_req, res) {

        try {
            const produtos = await produtoDAO.findAll();

            return res.status(produtos.status).json(produtos.body)
        }
        catch (error) {
            console.error("erro ao buscar produtos", error);
            return res.status(500).json({ mensagem: "Erro interno do servidor." });

        }


    }

    /*
    FEITOOOOOOOOO
    Se não encontrar, retornar erro
    */


    async findById(req, res) {
        const idProduto = req.params.idProduto;

        try {
            const resultadoDAO = await produtoDAO.findById(idProduto);

            return res.status(resultadoDAO.status).json(resultadoDAO.body)


        } catch (error) {
            console.error("Erro no servidor ao buscar produto:", error);
            return res.status(500).json({ mensagem: "Erro interno do servidor." });
        }




    }



    /*FEITOOOOOO
    Antes de remover, tem que verificar se existe o produto
        Se não existir, deve retornar erro
        arrumar
        */
    async remove(req, res) {
        const idProduto = req.params.idProduto;




        try {

            const resultadoDAO = await produtoDAO.remove(idProduto);

            return res.status(resultadoDAO.status).json(resultadoDAO.body);



        } catch (error) {
            console.error("Erro no servidor:", error);
            return res.status(500).json({ mensagem: "Erro no servidor" })
        }




    }
/*
feitoo update 
 */

    async update(req, res) {
        const idProduto = req.params.idProduto;
        const novosDados = req.body;

        const atualizarProduto = {
            id: Number(idProduto),
            ...novosDados
        };
        try {
            const retorno = await produtoDAO.update(atualizarProduto);

            console.log(retorno);

            return res.status(retorno.status).json(retorno.body)

        }

        catch (error) {
            console.error("Erro no servidor:", error);
            return res.status(500).json({ mensagem: "Erro no servidor" })
        }




    }
}