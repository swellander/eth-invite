const connection = require('../connection');
const Sequelize = require('sequelize');

const Event = connection.define('event', {
  title: Sequelize.STRING,
  address: Sequelize.STRING,
});

module.exports = Event;