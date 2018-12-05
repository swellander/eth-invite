const AWS = require('aws-sdk');

const accessKeyId;
const secretAccessKey
const region;


module.exports = new AWS.Rekognition({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region,
});
