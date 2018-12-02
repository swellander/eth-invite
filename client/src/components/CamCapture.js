import React, { Component } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import Header from './Header';
import { connect } from 'react-redux';
import { _updateConfirmationStatus } from '../store/invites';
import { _refreshUser } from '../store/auth';
import isAtLocation from '../isAtLocation';

const {
  addUserImageToCollection,
  sendFacesToCollection, searchFaces,
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

              isAtLocation(this.props.match.params.eventId)
                .then(isThere => {
                  console.log('Is there', isThere);
                  if (searchedFaces.FaceMatches.length && isThere) {
                    const faceId = searchedFaces.FaceMatches[0].Face.FaceId;
                    this.props.updateConfirmationStatus(
                      faceId,
                      this.props.match.params.eventId
                    );
                  } else {
                    //not at pary, dont confirm attendance
                  }
                })
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
    const userFaceId = this.props.auth.user.faceId;

    axios.post('/api/camera', { data: imageSrc }).then(imageUrl => {
      const regex = /[\w-]+.(jpg|png|jpeg)/;
      const imageName = regex.exec(imageUrl.data);

      if (userFaceId) {
        deleteFaces([userFaceId]);
      }

      addUserImageToCollection(imageName[0]).then(faces => {
        if (faces.FaceRecords.length) {
          axios.put(`/api/users/${this.props.auth.user.id}`, {
            faceId: faces.FaceRecords[0].Face.FaceId,
            imageUrl: imageUrl.data,
          })
            .then(() => {
              //TODO: reload Auth with fresh user data, after faceId update is complete
              this.props.refreshUser(this.props.auth.user.id);
            })
        } else {
          console.log("the person's face was not detected");
          //do something like request to take another pic
        }
      });
    });
  };

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: 'user',
    };

    const isConfirm = Boolean(this.props.match.params.eventId);

    return (
      <div>
        <Header />
        <div style={{ top: 0, textAlign: 'center', width: '60vw', position: 'absolute', left: '20%', fontFamily: 'Andale Mono' }}>
          <Webcam
            audio={false}
            height={800}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={800}
            videoConstraints={videoConstraints}
          />
          <div style={{ marginTop: -150 }} className="form-group">
            {isConfirm ? (
              <button className="btn btn-primary" onClick={this.confirm}>Confirm Attendance</button>
            ) : (
                <button className="btn btn-primary" onClick={this.rsvp}>Take RSVP Photo</button>
              )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

const mapDispatchToProps = dispatch => {
  return {
    updateConfirmationStatus: (faceId, eventId) => dispatch(_updateConfirmationStatus(faceId, eventId)),
    refreshUser: userId => dispatch(_refreshUser(userId))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CamCapture);