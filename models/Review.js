'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');
const Post = require('./Post');

class Review extends Model {}

Review.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  body: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'review',
  tableName: 'review',
  timestamps: false,
});

Review.belongsTo(User);
Review.belongsTo(Post);

module.exports = Review;
