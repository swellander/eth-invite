// const { bucket } = require('../config');
const S3 = require('../S3');
const crypto = require('crypto');

const upload = async (data, bucketName = 'rsvpusers') => {
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

const getEventImages = (eventId = 1) => {
  return new Promise((resolve, reject) => {
    let params = {
      Bucket: 'stakeevent' + eventId,
    };
    S3.listObjectsV2(params, function (err, data) {
      if (err) {
        return reject(err);
      }
      // an error occurred
      const s3objects = data.Contents;
      const returnImages = [];
      for (let i = 0; i < data.Contents.length; i++) {
        const bucketName = 'stakeevent' + eventId;
        const url = `https://s3.amazonaws.com/${bucketName}/${
          s3objects[i].Key
          }`;
        returnImages.push(url);
      }
      console.log(returnImages)
      resolve(returnImages);
    });
  });
};

module.exports = { upload, getEventImages };
