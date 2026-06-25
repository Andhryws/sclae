const { Usuario } = require("../models");
 
class UsuarioController {
    static async criar(req, res) {
        try {
            const { nome, email, senha, tipo } = req.body;

            const usuarioExistente = await Usuario.findOne({where: { email }
            });

            if (usuarioExistente) {
                return res.status(400).json({
                    mensagem: "Email já cadastrado"
                });
            }

            const usuario = await Usuario.create({
                nome, email, senha, tipo
            });

            return res.status(201).json(usuario);

        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro ao criar usuário",
                erro: error.message
            });
        }
    }

    static async listar(req, res) {
        try {

            const usuarios = await Usuario.findAll();

            return res.json(usuarios);

        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro ao listar usuários",
            });
        }
    }

    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;

            const usuario = await Usuario.findByPk(id);

            if (!usuario) {
                return res.status(404).json({
                    mensagem: "Usuário não encontrado"
                })
            }
            return res.json(usuario);
            
        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro ao buscar usuário",
            });
        }
    }

    static async atualizar(req, res) {
        try {
            const { id } = req.params;

            const usuario = await Usuario.findByPk(id);

            if (!usuario) {
                return res.status(404).json({
                    mensagem: "Usuário não encontrado"
                });
            }

            await usuario.update(req.body);

            return res.json(usuario);

        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro ao atualizar usuário",
            });
        }
    }

    static async deletar(req, res) {
        try {
            const { id } = req.params;

            const usuario = await Usuario.findByPk(id);

            if (!usuario) {
                return res.status(404).json({
                    mensagem: "Usuário não encontrado"
                });
            }

            await usuario.destroy();

            return res.json({
                mensagem: "Usuário removido com sucesso"
            });

        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro ao deletar usuário",
            });
        }
    }
}

module.exports = UsuarioController;