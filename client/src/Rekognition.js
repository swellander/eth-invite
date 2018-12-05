const AWS = require('aws-sdk');

const { accessKeyId, secretAccessKey, region } = require('./env');

module.exports = new AWS.Rekognition({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region,
});
