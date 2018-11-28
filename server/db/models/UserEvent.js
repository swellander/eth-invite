const connection = require('../connection');
const Sequelize = require('sequelize');

//should this just be named invite? -sw
module.exports = connection.define('userevent', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  attending: {
    type: Sequelize.STRING
  },
  paid: {
    type: Sequelize.BOOLEAN
  },
  arrived: {
    type: Sequelize.STRING
  }
});