const connection = require('../connection');
const Sequelize = require('sequelize');

//should this just be named invite? -sw
module.exports = connection.define('invites', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  attending: {
    type: Sequelize.STRING
  },
  //don't think we need paid. if the user has arrived, that means they will also be paid
  paid: {
    type: Sequelize.BOOLEAN
  },
  arrived: {
    type: Sequelize.STRING
  }
});