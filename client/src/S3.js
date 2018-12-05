const AWS = require('aws-sdk');

const accessKeyId;
const secretAccessKey;

module.exports = new AWS.S3({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});
