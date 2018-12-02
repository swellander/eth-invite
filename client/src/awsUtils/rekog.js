// const { bucket } = require('../config');
const rekognition = require('../Rekognition');

//send faces to collection
const addUserImageToCollection = (
  imageName = 'sanjai.png',
  bucketName = 'rsvpusers',
  collectionId = 'UserImages',
  extImId = 'GHI'
) => {
  return new Promise((resolve, reject) => {
    console.log(imageName);
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
    rekognition.indexFaces(params, function(err, data) {
      if (err) {
        reject(err);
      }
      // an error occurred
      console.log(data);
      return resolve(data);
      // successful response
    });
  });
};

const createCollection = (collectionName = 'UserImages3') => {
  return new Promise((resolve, reject) => {
    const params = {
      CollectionId: collectionName,
    };
    rekognition.createCollection(params, function(err, data) {
      if (err) {
        reject(err);
      }
      // an error occurred
      return resolve(data); // successful response
    });
  });
};

//sending faces of image to collection
const sendFacesToCollection = (
  Name = 'test.jpg',
  Bucket,
  ExternalImageId = 'HIJ',
  CollectionId = 'UserImages'
) => {
  return new Promise((resolve, reject) => {
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
      if (err) return reject(err);
      // an error occurred
      resolve(data); // successful response
    });
  });
};

const listFacesfromCollection = (CollectionId = 'UserImages') => {
  return new Promise((resolve, reject) => {
    let params = {
      CollectionId,
      MaxResults: 20,
    };
    rekognition.listFaces(params, function(err, data) {
      if (err) {
        return reject(err);
      }
      // an error occurred
      resolve(data);
    });
  });
};

const searchFaces = (FaceId = '81b0c13b-c10b-489a-a2ed-0ff8beedfffc') => {
  return new Promise((resolve, reject) => {
    let params = {
      FaceId,
      CollectionId: 'UserImages',
      FaceMatchThreshold: 90,
      MaxFaces: 1,
    };
    rekognition.searchFaces(params, function(err, data) {
      if (err) {
        return reject(err);
      }
      // an error occurred
      console.log(data);
      resolve(data);
    });
  });
};

const deleteFaces = (FaceIds = ['ff43d742-0c13-5d16-a3e8-03d3f58e980b']) => {
  return new Promise((resolve, reject) => {
    let params = {
      CollectionId: 'UserImages',
      FaceIds,
    };
    rekognition.deleteFaces(params, function(err, data) {
      if (err) {
        return reject(err);
      }
      // an error occurred
      console.log(data);
      resolve(data);
    });
  });
};

module.exports = {
  addUserImageToCollection,
  sendFacesToCollection,
  listFacesfromCollection,
  createCollection,
  searchFaces,
  deleteFaces,
};
