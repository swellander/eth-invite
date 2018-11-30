const AWS = require('aws-sdk');

const { accessKeyId, secretAccessKey, region } = require('./config');

module.exports = new AWS.Rekognition({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region,
});
