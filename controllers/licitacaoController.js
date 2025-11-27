import { licitacaoDao } from "../daos/licitacaoDAO.js";


const licitacaodao = new licitacaoDao();

export class licitacaoController {

    async register(req, res) {



 
        

        const licitacoes = req.body;


        if (!licitacoes.numlicit || !licitacoes.data_inicio || !licitacoes.data_final) {
            return res.status(400).json({
                "mensagem": "Os campos 'numlicit', 'data_inicio' e 'data_final' são obrigatórios."
            });
        }

        const dataRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        
        if (!dataRegex.test(licitacoes.data_inicio) || !dataRegex.test(licitacoes.data_final)) {
            return res.status(400).json({
                "mensagem": "As datas (data_inicio e data_final) devem estar no formato AAAA-MM-DD."
            });
        }

        const dataInicioNormalizada = new Date(licitacoes.data_inicio); 
        const dataFinalNormalizada = new Date(licitacoes.data_final);
    

        if (dataInicioNormalizada > dataFinalNormalizada) {
            return res.status(400).json({
                "mensagem": "A data de início não pode ser posterior à data final."
            });
        }
        try {
            const retorno = await licitacaodao.register(licitacoes)

            return res.status(retorno.status).json(retorno.body);


        }
        catch (error) {
            console.error("Erro ao cadastrar o produto:", error);
            return res.status(500).json({ "mensagem": "Erro interno do servidor " });
        }


    }


    async findAll(_req, res) {

        try {
            const licitacao = await licitacaodao.findAll();

            return res.status(licitacao.status).json(licitacao.body)
        }
        catch (error) {
            console.error("erro ao buscar produtos", error);
            return res.status(500).json({ mensagem: "Erro interno do servidor." });

        }


    }


    async findById(req, res) {
        const idLicit = req.params.idLicit;

        try {
            const resultado = await licitacaodao.findById(idLicit);

            return res.status(resultado.status).json(resultado.body)


        } catch (error) {
            console.error("Erro no servidor ao buscar produto:", error);
            return res.status(500).json({ mensagem: "Erro interno do servidor." });
        }




    }

    async remove(req, res) {
        const idLicit = req.params.idLicit;




        try {

            const resultado = await licitacaodao.remove(idLicit);

            return res.status(resultado.status).json(resultado.body);



        } catch (error) {
            console.error("Erro no servidor:", error);
            return res.status(500).json({ mensagem: "Erro no servidor" })
        }




    }


    async update(req, res) {
        const idLicit = req.params.idLicit;
        const novosDados = req.body;

        const atualizarProduto = {
            id: Number(idLicit),
            ...novosDados
        };
        try {
            const retorno = await licitacaodao.update(atualizarProduto);

            console.log(retorno);

            return res.status(retorno.status).json(retorno.body)

        }

        catch (error) {
            console.error("Erro no servidor:", error);
            return res.status(500).json({ mensagem: "Erro no servidor" })
        }




    }



} 