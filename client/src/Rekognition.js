const AWS = require('aws-sdk');

const { accessKeyId, secretAccessKey, region };

module.exports = new AWS.Rekognition({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region,
});
