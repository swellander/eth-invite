const connection = require('../connection');
const Sequelize = require('sequelize');

module.exports = connection.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: true
  },
});


