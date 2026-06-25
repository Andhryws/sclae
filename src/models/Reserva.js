const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Reserva = sequelize.define("Reserva", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  data: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },

  hora_inicio: {
    type: DataTypes.TIME,
    allowNull: false
  },

  hora_fim: {
    type: DataTypes.TIME,
    allowNull: false
  },

  status: {
    type: DataTypes.ENUM("ativa", "cancelada"),
    defaultValue: "ativa"
  }
});

module.exports = Reserva;