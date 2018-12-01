import React, { Component } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import { connect } from 'react-redux';

const {
  addUserImageToCollection,
  sendFacesToCollection,
  searchFaces,
  deleteFaces,
} = require('../awsUtils/rekog');

class CamCapture extends Component {
  constructor() {
    super();
  }

  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();

    axios.post('/api/camera', { data: imageSrc }).then(imageUrl => {
      const regex = /[\w-]+.(jpg|png|jpeg)/;
      const imageName = regex.exec(imageUrl.data);
      addUserImageToCollection(imageName[0]).then(faces => {
        if (faces.FaceRecords.length) {
          axios.put(`/api/users/${this.props.auth.user.id}`, {
            faceId: faces.FaceRecords[0].Face.FaceId,
            imageUrl: imageUrl.data,
          });
        } else {
          console.log("the person's face was not detected");
          //do something like request to take another pic
        }
      });
    });

    //   axios.post('/api/camera', { data: imageSrc }).then(imageUrl => {
    //     const regex = /[\w-]+.(jpg|png|jpeg)/;
    //     const imageName = regex.exec(imageUrl.data);
    //     const faceIdArray = [];
    //     sendFacesToCollection(imageName[0])
    //       .then(faces => {
    //         if (faces.FaceRecords.length) {
    //           for (let i = 0; i < faces.FaceRecords.length; i++) {
    //             searchFaces(faces.FaceRecords[i].Face.FaceId);
    //             faceIdArray.push(faces.FaceRecords[i].Face.FaceId);
    //             //checkin with geolocation here
    //           }
    //         } else {
    //           console.log('faces not detected');
    //           //do something like request to take another pic
    //         }
    //       })
    //       .then(() => {
    //         deleteFaces(faceIdArray);
    //         console.log('deleted', faceIdArray);
    //       });
    //   });
  };

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: 'user',
    };

    return (
      <div>
        <Webcam
          audio={false}
          height={350}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={350}
          videoConstraints={videoConstraints}
        />
        <button onClick={this.capture}>Capture photo</button>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(CamCapture);
