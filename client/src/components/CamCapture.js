import React, { Component } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import { connect } from 'react-redux';
import { _updateConfirmationStatus } from '../store/invites';
import isAtLocation from '../isAtLocation';

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

  confirm = () => {
    const imageSrc = this.webcam.getScreenshot();
    axios.post('/api/camera', { data: imageSrc }).then(imageUrl => {
      const regex = /[\w-]+.(jpg|png|jpeg)/;
      const imageName = regex.exec(imageUrl.data);
      const faceIdArray = [];
      sendFacesToCollection(imageName[0])
        .then(async faces => {
          if (faces.FaceRecords.length) {
            for (let i = 0; i < faces.FaceRecords.length; i++) {
              const searchedFaces = await searchFaces(
                faces.FaceRecords[i].Face.FaceId
              );
              faceIdArray.push(faces.FaceRecords[i].Face.FaceId);

              if (searchedFaces.FaceMatches.length && isAtLocation()) {
                const faceId = searchedFaces.FaceMatches[0].Face.FaceId;
                this.props.updateConfirmationStatus(
                  faceId,
                  this.props.match.params.eventId
                );
              }
            }
          } else {
            console.log('faces not detected');
            //do something like request to take another pic
          }
        })
        .then(() => {
          deleteFaces(faceIdArray);
        });
    });
  };

  rsvp = () => {
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
  };

  render() {
    console.log(this.props);
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: 'user',
    };

    const isConfirm = Boolean(this.props.match.params.eventId);

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
        {isConfirm ? (
          <button onClick={this.confirm}>Confirm Attendance</button>
        ) : (
          <button onClick={this.rsvp}>Take RSVP Photo</button>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

const mapDispatchToProps = dispatch => {
  return {
    updateConfirmationStatus: (faceId, eventId) =>
      dispatch(_updateConfirmationStatus(faceId, eventId)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CamCapture);
