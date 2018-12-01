const { bucket } = require('../config');
const S3 = require('../S3');
const crypto = require('crypto');

const upload = async (data, bucketName = bucket) => {
  try {
    const imageName = crypto.randomBytes(20).toString('hex');
    const regex = /data:image\/(\w+);base64,(.*)/;
    const matches = regex.exec(data);
    const extension = matches[1];
    const Body = new Buffer(matches[2], 'base64');

    await S3.createBucket({ Bucket: bucketName }).promise();
    const Key = `${imageName}.${extension}`;

    await S3.putObject({
      Bucket: bucketName,
      ACL: 'public-read',
      Body,
      ContentType: `image/${extension}`,
      Key,
    }).promise();

    const url = `https://s3.amazonaws.com/${bucketName}/${Key}`;

    return url;
  } catch (ex) {
    throw ex;
  }
};
module.exports = { upload };
