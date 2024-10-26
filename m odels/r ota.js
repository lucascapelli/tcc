'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rota extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rota.init({
    nome_rota: DataTypes.STRING,
    origem: DataTypes.STRING,
    destino: DataTypes.STRING,
    distancia_km: DataTypes.DECIMAL,
    duracao_tempo: DataTypes.TIME,
    id_usuario: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Rota',
  });
  return Rota;
};