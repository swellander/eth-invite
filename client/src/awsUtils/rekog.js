const { bucket } = require('../config');
// const S3 = require('../S3');
const rekognition = require('../Rekognition');
// const crypto = require('crypto');

const addUserImageToCollection = async (
  imageName = 'sanjai.png',
  bucketName = bucket,
  collectionId = 'UserImages',
  extImId = 'GHI'
) => {
  try {
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
    await rekognition.indexFaces(params, function(err, data) {
      if (err) console.log(err, err.stack);
      // an error occurred
      else {
        console.log(data);
        return data;
      } // successful response
    });
  } catch (ex) {
    throw ex;
  }
};

//should be event.createcollection

// Image.createCollection = async function(collectionName = 'UserImages3') {
//   const params = {
//     CollectionId: collectionName,
//   };
//   await rekognition.createCollection(params, function(err, data) {
//     if (err) console.log(err, err.stack);
//     // an error occurred
//     else console.log(data); // successful response
//   });
// };

// //sending faces of image to collection
// const sendFacesToCollection = (
//   Name = 'sanjandsam.jpg',
//   ExternalImageId = 'HIJ',
//   CollectionId = 'UserImages4',
//   Bucket = bucket
// ) => {
//   let params = {
//     CollectionId,
//     DetectionAttributes: [],
//     ExternalImageId,
//     Image: {
//       S3Object: {
//         Bucket,
//         Name,
//       },
//     },
//   };

//   rekognition.indexFaces(params, function(err, data) {
//     if (err) console.log(err, err.stack);
//     // an error occurred
//     else console.log('indexF', data); // successful response
//   });
// };

// const listFacesfromCollection = (CollectionId = 'UserImages4') => {
//   let params = {
//     CollectionId,
//     MaxResults: 20,
//   };
//   rekognition.listFaces(params, function(err, data) {
//     if (err) console.log(err, err.stack);
//     // an error occurred
//     else console.log('listF', data); // successful response
//   });
// };

// const compareFacesToUsers = async () =>
//   // imageName = 'sanjandsam.jpg',
//   // collectionId = 'UserImages'
//   {
//     try {
//       await sendFacesToCollection();
//       await listFacesfromCollection();
//     } catch (ex) {
//       throw ex;
//     }
//   };

// // Image.addUserImageToCollection()
// // Image.createCollection('UserImages4');
// compareFacesToUsers();

module.exports = { addUserImageToCollection };
