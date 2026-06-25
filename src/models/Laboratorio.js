const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Laboratorio = sequelize.define("Laboratorio", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    localizacao: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    status: {
        type: DataTypes.ENUM("disponivel", "manutencao"),
        defaultValue: "disponivel"
    }
});

module.exports = Laboratorio;