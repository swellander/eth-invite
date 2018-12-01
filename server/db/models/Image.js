const { bucket } = require('../config');
const S3 = require('../S3');
const rekognition = require('../Rekognition');

const conn = require('../connection');

const Image = conn.define('image', {
  id: {
    type: conn.Sequelize.UUID,
    defaultValue: conn.Sequelize.UUIDV4,
    primaryKey: true,
  },
  url: {
    type: conn.Sequelize.STRING,
  },
});

Image.upload = async function(data, bucketName) {
  try {
    const regex = /data:image\/(\w+);base64,(.*)/;
    const matches = regex.exec(data);
    const extension = matches[1];

    const image = this.build();
    const Body = new Buffer(matches[2], 'base64');
    await S3.createBucket({ Bucket: bucketName }).promise();
    const Key = `${image.id.toString()}.${extension}`;

    await S3.putObject({
      Bucket: bucketName,
      ACL: 'public-read',
      Body,
      ContentType: `image/${extension}`,
      Key,
    }).promise();

    image.url = `https://s3.amazonaws.com/${bucketName}/${Key}`;
    const imageInstance = await image.save();

    return imageInstance;
  } catch (ex) {
    throw ex;
  }
};

Image.addUserImageToCollection = async function(
  imageName = 'sanjai.png',
  bucketName = bucket,
  collectionId = 'UserImages',
  extImId = 'GHI'
) {
  const params = {
    CollectionId: collectionId,
    DetectionAttributes: [],
    ExternalImageId: extImId,
    Image: {
      S3Object: {
        Bucket: bucketName,
        Name: imageName,
      },
    },
  };
  await rekognition.indexFaces(params, function(err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log(data); // successful response
  });
};

//should be event.createcollection

Image.createCollection = async function(collectionName = 'UserImages3') {
  const params = {
    CollectionId: collectionName,
  };
  await rekognition.createCollection(params, function(err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log(data); // successful response
  });
};

//sending faces of image to collection
const sendFacesToCollection = (
  Name = 'sanjandsam.jpg',
  ExternalImageId = 'HIJ',
  CollectionId = 'UserImages4',
  Bucket = bucket
) => {
  let params = {
    CollectionId,
    DetectionAttributes: [],
    ExternalImageId,
    Image: {
      S3Object: {
        Bucket,
        Name,
      },
    },
  };

  rekognition.indexFaces(params, function(err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log('indexF', data); // successful response
  });
};

const listFacesfromCollection = (CollectionId = 'UserImages4') => {
  let params = {
    CollectionId,
    MaxResults: 20,
  };
  rekognition.listFaces(params, function(err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log('listF', data); // successful response
  });
};

const compareFacesToUsers = async () =>
  // imageName = 'sanjandsam.jpg',
  // collectionId = 'UserImages'
  {
    try {
      await sendFacesToCollection();
      await listFacesfromCollection();
    } catch (ex) {
      throw ex;
    }
  };

// Image.addUserImageToCollection()
// Image.createCollection('UserImages4');
compareFacesToUsers();

module.exports = Image;
