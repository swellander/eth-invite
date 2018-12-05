const AWS = require('aws-sdk');

const { accessKeyId, secretAccessKey, region } = process.env;

module.exports = new AWS.Rekognition({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region,
});
