"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Defina as associações aqui, se necessário
    }
  }

  User.init(
    {
      ID_Usuario: {
        type: DataTypes.STRING(15),
        primaryKey: true,
      },
      Nome: DataTypes.STRING(40),
      Email: DataTypes.STRING(80),
      Telefone: DataTypes.STRING(25),
      Senha: DataTypes.STRING(30),
      Preferencia_De_Viagem: DataTypes.STRING(300),
      Data_De_Cadastro: DataTypes.DATE,
      Historico_De_Deslocamento: DataTypes.STRING(300),
    },
    {
      sequelize,
      modelName: "User",
      tableName: 'Usuario', // Verifique se o nome da tabela está correto
      timestamps: false,
    }
  );

  return User; // Retorna o modelo
};
