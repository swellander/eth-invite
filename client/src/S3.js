const AWS = require('aws-sdk');

const { accessKeyId, secretAccessKey };

module.exports = new AWS.S3({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});
