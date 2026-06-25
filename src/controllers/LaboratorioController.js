const { Laboratorio } = require("../models");

class LaboratorioController {
    static async criar(req, res){
        try {
            const { nome, localizacao, status } = req.body;

            const laboratorio = await Laboratorio.create({
                nome, localizacao, status
            });
            
            return res.status(201).json(Laboratorio);

        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro ao criar laboratório",
                erro: error.message
            });
        }
    }

    static async listar(req, res) {
        try {
            const laboratorios = await Laboratorio.findAll();

            return res.json(laboratorios);
        } catch (error) {
             return res.status(500).json({
                mensagem: "Erro ao listar laboratórios"
             });
        }
    }

    static async buscarPorId(req, res) {
        try{
            const laboratorio = await Laboratorio.findByPk(req.params.id);

            if(!laboratorio) {
                return res.status(404).json({
                    mensagem: "Laboratório não encontrado"
                })
            }

            return res.json(laboratorio);
        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro ao buscar laboratório"
            });
        }
    }

    static async atualizar(req, res) {
        try {
            const laboratorio = await Laboratorio.findByPk(req.params.id);

            if(!laboratorio) {
                return res.status(404).json({
                    mensagem: "Laboratório não encontrado"
                });
            }

            await laboratorio.update(req.body);

            return res.json(laboratorio);

        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro ao atualizar laboratório"
            });
        }
    }

    static async deletar(req, res) {
        try {
            const laboratorio = await Laboratorio.findByPk(req.params.id);

            if(!laboratorio) {
                return res.status(404).json({
                    mensagem: "Laboratório não encontrado"
                })
            }

            await laboratorio.destroy();

            return res.json({
                mensagem: "Laboratório deletado com sucesso"
            });

        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro ao deletar laboratório"
            });
        }
    }
}

module.exports = LaboratorioController;