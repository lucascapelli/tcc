'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rota', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome_rota: {
        type: Sequelize.STRING
      },
      origem: {
        type: Sequelize.STRING
      },
      destino: {
        type: Sequelize.STRING
      },
      distancia_km: {
        type: Sequelize.DECIMAL
      },
      duracao_tempo: {
        type: Sequelize.TIME
      },
      id_usuario: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rota');
  }
};