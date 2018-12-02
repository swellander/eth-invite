const connection = require('../connection');
const Sequelize = require('sequelize');

module.exports = connection.define('event', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lat: {
    type: Sequelize.FLOAT,
  },
  lng: {
    type: Sequelize.FLOAT,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  //this is ethereum address, not physical address
  address: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  //stake units are WEI (1 ETH === 1 * 1e10 WEI)
  stake: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  attendedUrl: { type: Sequelize.ARRAY(Sequelize.STRING) },
});
