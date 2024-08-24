"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("expenses", "year", {
      type: Sequelize.INTENGER, // ou o tipo de dado que você deseja
      allowNull: true, // ou false se a coluna não puder ser nula
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("expenses", "nova_coluna");
  },
};
