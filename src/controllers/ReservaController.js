const { Reserva, Usuario, Laboratorio } = require("../models");

class ReservaController {
    static async criar(req, res) {
        try {
            const { usuarioId, laboratorioId, data, hora_inicio, hora_fim} = req.body;

            const usuario = await Usuario.findByPk(usuarioId);
            if (!usuario) {
                return res.status(404).json({
                    mensagem: "Usuário não encontrado"
                });
            }

            const laboratorio = await Laboratorio.findByPk(laboratorioId);
            if (!laboratorio) {
                return res.status(404).json({
                    mensagem: "Laboratório não encontrado"
                });
            }

            if(laboratorio.status === "manutencao") {
                return res.status(400).json({
                    mensagem: "Laboratório em manutenção, não é possível realizar reservas"
                });
            }

            const conflito = await Reserva.findOne({
                where: { laboratorioId, data, hora_inicio: hora_inicio }
            });

            if (conflito) {
                return res.status(400).json({
                    mensagem: "Já existe uma reserva para este horário"
                });
            }

            if(usuario.tipo !== "professor" && usuario.tipo !== "administrador") {
                return res.status(403).json({
                    mensagem: "Apenas professores e administradores podem realizar reservas"
                });
            }

            const reserva = await Reserva.create({
                usuarioId, laboratorioId, data, hora_inicio, hora_fim
            });

            return res.status(201).json({
                mensagem: "Reserva criada com sucesso",
                reserva
            });

        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro ao criar reserva"
            });
        }
    }

    static async cancelar(req, res) {
        try {
            const { id } = req.params;
            const { usuarioId } = req.body;

            const reserva = await Reserva.findByPk(id);

            if(!reserva) {
                return res.status(404).json({
                    mensagem: "Reserva não encontrada"
                });
            }

            const usuario = await Usuario.findByPk(usuarioId);
            if(!usuario) {
                return res.status(404).json({
                    mensagem: "Usuário não encontrado"
                });
            }

            const isDono = reserva.usuarioId === usuarioId;
            const isAdministrador = usuario.tipo === "administrador";

            if (!isDono && !isAdministrador) {
                return res.status(403).json({
                    mensagem: "Você não tem permissão para cancelar esta reserva"
                });
            }

            reserva.status = "cancelada";
            await reserva.save();

            return res.json({
                mensagem: "Reserva cancelada com sucesso"
            });

        }catch (error) {
            return res.status(500).json({
                mensagem: "Erro ao cancelar reserva",
                erro: error.message
            });
        }
    }

    static async listar(req, res) {
        try {
            const reservas = await Reserva.findAll({
                include: [
                    { model: Usuario, attributes: ['id', 'nome', 'email'] },
                    { model: Laboratorio, attributes: ['id', 'nome', 'localizacao'] }
                ]
            });

            return res.json(reservas);

        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro ao listar reservas",
                erro: error.message
            });
        }
    }

    static async listarFiltradas(req, res) {
         try {
            const { usuarioId, laboratorioId } = req.query;

            let where = {};

            if (usuarioId) {
                where.usuarioId = usuarioId;
            }

            if (laboratorioId) {
                where.laboratorioId = laboratorioId;
            }

            const reservas = await Reserva.findAll({
                where,
                include: [
                    {
                        model: Usuario,
                           attributes: ["id", "nome", "tipo"]
                    },
                    {
                        model: Laboratorio,
                        attributes: ["id", "nome", "localizacao"]
                    }
                    ],
                    order: [["data", "ASC"]]
                });

                return res.status(200).json(reservas);

            } catch (error) {
                return res.status(500).json({
                    mensagem: "Erro ao listar reservas",
                    erro: error.message
                });
            }
    }
}

module.exports = ReservaController;