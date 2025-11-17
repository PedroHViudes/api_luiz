import { ProdutoDAO } from "../daos/ProdutoDAO.js";

const produtoDAO = new ProdutoDAO();

export class ProdutoController {

    /*
    Antes de inserir, verificar se os dados obrigatórios estão presentes
    */
    async register(req, res) {
        const produto = req.body;
        if (produto.nome == '') {
            res.status(400).json({ "mensagem": "nome do produto é obrigatório" });
        }
        else {
            try {
                const retorno = await produtoDAO.register(produto);
                res.status(retorno.status).json(retorno.body)
            }
            catch (e) {
                res.status(500).json({ "mensagem": "erro ao cadastrar o produto" });
            }

        }
    }



    async findAll(_req, res) {
        const produtos = await produtoDAO.findAll();
        res.json(produtos);
    }
    /*
    Se não encontrar, retornar erro
    */


    async findById(req, res) {
        const idProduto = req.params.idProduto;
        const produto = await produtoDAO.findById(idProduto);
        //tratar e retornar 404 caso não exista o registro com o id informado 
        res.json(produto);
    }

    /*Antes de remover, tem que verificar se existe o produto
     Se não existir, deve retornar erro
     arrumar
     */




     
    async remove(req, res) {
        const idProduto = req.params.idProduto;
        produtoDAO.remove(idProduto);



        return res.status(produtoDAO.status).json(produtoDAO.body);    


       
    }

    
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
            return res.status(500).json({mensagem: "Erro no servidor"})
        }




    }
}