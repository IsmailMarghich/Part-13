const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class ReadingListEntry extends Model {}

ReadingListEntry.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'blogs', key: 'id' }
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    sequelize,
    modelName: 'reading_list_entry',
    timestamps: false,
    underscored: true
  }
)

module.exports = ReadingListEntry
