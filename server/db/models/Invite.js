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
  //don't think we need paid. if the user has arrived, that means they will also be paid
  arrived: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});