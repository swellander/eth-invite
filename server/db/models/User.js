const connection = require('../connection');
const Sequelize = require('sequelize');

const User = connection.define('user', {
  name: Sequelize.STRING,
  password: Sequelize.STRING,
  address: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    }
  }
});

module.exports = User;