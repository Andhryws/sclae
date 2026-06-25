const sequelize = require("../config/database");

const Usuario = require("./Usuario");
const Laboratorio = require("./Laboratorio");
const Equipamento = require("./Equipamento");
const Reserva = require("./Reserva");
const Manutencao = require("./Manutencao");

//RELAÇÕES

Usuario.hasMany(Reserva, { foreignKey: "usuarioId" });
Reserva.belongsTo(Usuario, { foreignKey: "usuarioId" });

Laboratorio.hasMany(Reserva, { foreignKey: "laboratorioId" });
Reserva.belongsTo(Laboratorio, { foreignKey: "laboratorioId" });

Laboratorio.hasMany(Equipamento, { foreignKey: "laboratorioId" });
Equipamento.belongsTo(Laboratorio, { foreignKey: "laboratorioId" });

Equipamento.hasMany(Manutencao, { foreignKey: "equipamentoId" });
Manutencao.belongsTo(Equipamento, { foreignKey: "equipamentoId" });

module.exports = {
    sequelize,
    Usuario,
    Laboratorio,
    Equipamento,
    Reserva,
    Manutencao
};