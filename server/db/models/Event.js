const connection = require('../connection');
const Sequelize = require('sequelize');

const Event = connection.define('event', {
  date: Sequelize.DATE,
  description: Sequelize.STRING,
  location: Sequelize.STRING,
  title: Sequelize.STRING,
  address: Sequelize.STRING,
  stake: Sequelize.STRING,
});

module.exports = Event;