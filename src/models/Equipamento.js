const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Equipamento = sequelize.define('Equipamento', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    descricao: {
        type: DataTypes.STRING,
    },

    status: {
        type: DataTypes.ENUM('disponivel', 'indisponivel', 'manutencao'),
        defaultValue: 'disponivel'
    }
});

module.exports = Equipamento;