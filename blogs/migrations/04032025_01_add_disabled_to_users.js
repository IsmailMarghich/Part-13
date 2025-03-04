const { DataTypes } = require('sequelize')

module.exports = {
  up: async({ context: QueryInterface }) => {
    await QueryInterface.addColumn('users', 'disabled', {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('users', 'disabled')
  }
}
