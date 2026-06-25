const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Manutencao = sequelize.define("Manutencao", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  descricao: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  status: {
    type: DataTypes.ENUM("aberto", "em_manutencao", "concluido"),
    defaultValue: "aberto"
  },

  data_abertura: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Manutencao;