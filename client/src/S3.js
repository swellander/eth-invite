const AWS = require('aws-sdk');

const { accessKeyId, secretAccessKey } = process.env;

module.exports = new AWS.S3({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});
