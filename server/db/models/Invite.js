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
    type: Sequelize.ENUM('YES', 'NO', 'UNDECIDED'),
    defaultValue: 'UNDECIDED'
  },
  paid: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  arrived: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});