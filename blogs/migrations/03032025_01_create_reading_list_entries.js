const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('reading_list_entries', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE'
      },
      blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'blogs', key: 'id' },
        onDelete: 'CASCADE'
      },
      read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    })

    // ✅ Prevent duplicate blog entries in the same user's reading list
    await queryInterface.addConstraint('reading_list_entries', {
      fields: ['user_id', 'blog_id'],
      type: 'unique',
      name: 'unique_user_blog'
    })
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('reading_list_entries')
  }
}
