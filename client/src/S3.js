const AWS = require('aws-sdk');

const { accessKeyId, secretAccessKey } = require('./env');

module.exports = new AWS.S3({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});
