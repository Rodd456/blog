const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Post = sequelize.define('post', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 255],
    },
  },
  body: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 2000],
    },
  },
  date_created: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 255],
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id',
    },
  },
}, {
  timestamps: false,
  freezeTableName: true,
  underscored: true,
});

// Define associations here, if needed.

module.exports = Post;
