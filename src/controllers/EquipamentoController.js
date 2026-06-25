const { Equipamento, Laboratorio } = require("../models");

class EquipamentoController {
    static async criar(req, res) {
        try {
            const { nome, descricao, status, laboratorioId } = req.body;

            const laboratorio = await Laboratorio.findByPk(laboratorioId);

            if(!laboratorio) {
                return res.status(404).json({
                    mensagem: "Laboratório não encontrado"
                });
            }

            const equipamento = await Equipamento.create({
                nome, descricao, status: status || "disponivel", laboratorioId
            });

            return res.status(201).json(equipamento);

        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro ao criar equipamento"
            });
        }
    }

     static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome, descricao, status, laboratorioId } = req.body;

            const equipamento = await Equipamento.findByPk(id);

            if (!equipamento) {
                return res.status(404).json({
                    mensagem: "Equipamento não encontrado"
                });
            }

            
            if (laboratorioId) {
                const laboratorio = await Laboratorio.findByPk(laboratorioId);

                if (!laboratorio) {
                    return res.status(404).json({
                        mensagem: "Laboratório não encontrado"
                    });
                }

                equipamento.laboratorioId = laboratorioId;
            }

            
            if (nome) equipamento.nome = nome;
            if (descricao) equipamento.descricao = descricao;
            if (status) equipamento.status = status;

            await equipamento.save();

            return res.status(200).json({
                mensagem: "Equipamento atualizado com sucesso",
                equipamento
            });

        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro ao atualizar equipamento",
                erro: error.message
            });
        }
    }
    
    static async listar(req, res) {
        try {

            const equipamentos = await Equipamento.findAll({
                include: {
                    model: Laboratorio,
                    attributes: ["id", "nome", "localizacao"]
                }
            });

            return res.status(200).json(equipamentos);

        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro ao listar equipamentos",
                erro: error.message
            });
        }
    }

}

module.exports = EquipamentoController;