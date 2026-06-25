const { Manutencao, Equipamento } = require("../models");

class ManutencaoController {

    static async criar(req, res) {
        try {
            const { equipamentoId, descricao } = req.body;

            const equipamento = await Equipamento.findByPk(equipamentoId);

            if (!equipamento) {
                return res.status(404).json({
                    mensagem: "Equipamento não encontrado"
                });
            }

            const manutencao = await Manutencao.create({
                equipamentoId,
                descricao,
                status: "aberto"
            });

            equipamento.status = "manutencao";
            await equipamento.save();

            return res.status(201).json({
                mensagem: "Manutenção registrada com sucesso",
                manutencao
            });

        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro ao criar manutenção",
                erro: error.message
            });
        }
    }

    static async listar(req, res) {
        try {
            const manutencoes = await Manutencao.findAll({
                include: [
                    {
                        model: Equipamento,
                        attributes: ["id", "nome", "status", "descricao"]
                    }
                ],
                order: [["data_abertura", "DESC"]]
            });

            return res.json(manutencoes);

        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro ao listar manutenções",
                erro: error.message
            });
        }
    }

    static async atualizarStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const manutencao = await Manutencao.findByPk(id);

            if (!manutencao) {
                return res.status(404).json({
                    mensagem: "Manutenção não encontrada"
                });
            }

            manutencao.status = status;
            await manutencao.save();

            if (status === "concluido") {
                const equipamento = await Equipamento.findByPk(manutencao.equipamentoId);

                if (equipamento) {
                    equipamento.status = "disponivel";
                    await equipamento.save();
                }
            }

            return res.json({
                mensagem: "Status atualizado com sucesso",
                manutencao
            });

        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro ao atualizar manutenção",
                erro: error.message
            });
        }
    }
}

module.exports = ManutencaoController;