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
      Rota.belongsTo(models.Usuario, { foreignKey: 'id_usuario', onDelete: 'CASCADE' });
    }
  }

  Rota.init({
    id_rota: { // Adicionando ID_Rota como chave primária
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
        key: 'ID_Usuario' // Chave estrangeira referenciando a tabela Usuario
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
