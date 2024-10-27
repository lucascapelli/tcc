'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Rota extends Model {
    static associate(models) {
      Rota.belongsTo(models.User, { foreignKey: 'id_usuario', onDelete: 'CASCADE' });
    }
  }

  Rota.init({
    id_rota: { // ID_Rota como chave primária
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome_rota: DataTypes.STRING,
    origem: DataTypes.STRING,
    destino: DataTypes.STRING,
    distancia_km: DataTypes.DECIMAL,
    duracao_tempo: DataTypes.TIME,
    id_usuario: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Usuario',
        key: 'ID_Usuario' // Certifique-se de que o nome aqui corresponde ao seu modelo 'Usuario'
      }
    }
  }, {
    sequelize,
    modelName: 'Rota',
    tableName: 'Rota', // Nome da tabela no banco de dados
    timestamps: false // Se não estiver usando timestamps (createdAt e updatedAt)
  });

  return Rota;
};
