'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Usuarios', {
      ID_Usuario: {
        type: Sequelize.STRING(15),
        allowNull: false,
        primaryKey: true,
      },
      Nome: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      Email: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      Telefone: {
        type: Sequelize.STRING(25),
        allowNull: true,
      },
      Senha: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      Preferencia_De_Viagem: {
        type: Sequelize.STRING(300),
        allowNull: true,
      },
      Data_De_Cadastro: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      Historico_De_Deslocamento: {
        type: Sequelize.STRING(300),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Usuarios');
  }
};
