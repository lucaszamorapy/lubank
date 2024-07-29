module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("expenses", "month_id", "month_name");
    await queryInterface.changeColumn("expenses", "month_name", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("expenses", "month_name", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.renameColumn("expenses", "month_name", "month_id");
  },
};
