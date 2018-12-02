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
    const bucketName = 'stakeevent' + this.props.match.params.eventId;
    axios
      .post('/api/camera', { data: imageSrc, bucket: bucketName })
      .then(imageUrl => {
        const regex = /[\w-]+.(jpg|png|jpeg)/;
        const imageName = regex.exec(imageUrl.data);
        const faceIdArray = [];
        sendFacesToCollection(imageName[0], bucketName)
          .then(async faces => {
            if (faces.FaceRecords.length) {
              for (let i = 0; i < faces.FaceRecords.length; i++) {
                const searchedFaces = await searchFaces(
                  faces.FaceRecords[i].Face.FaceId
                );
                faceIdArray.push(faces.FaceRecords[i].Face.FaceId);

                isAtLocation(this.props.match.params.eventId).then(isThere => {
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
                });
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
          axios
            .put(`/api/users/${this.props.auth.user.id}`, {
              faceId: faces.FaceRecords[0].Face.FaceId,
              imageUrl: imageUrl.data,
            })
            .then(() => {
              //TODO: reload Auth with fresh user data, after faceId update is complete
              this.props.refreshUser(this.props.auth.user.id);
              this.props.history.push(`/events/${this.props.match.params.eventId}`);
            });
        } else {
          alert("the person's face was not detected");
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

    const isConfirm = this.props.location.pathname.indexOf('confrim') !== -1;

    return (
      <div>
        <Header />
        <div
          style={{
            top: 0,
            position: 'relative',
            fontFamily: 'Andale Mono',
            alignItems: 'center',
            alignContent: 'center',
            textAlign: 'center',
            justifyContent: 'center',
          }}
        >
          <Webcam
            audio={false}
            height={420}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={420}
            videoConstraints={videoConstraints}
            style={{ display: 'container', marginTop: -5 }}
          />
          <div className="form-group">
            {isConfirm ? (
              <button className="btn btn-primary" onClick={this.confirm}>
                Confirm Attendance
              </button>
            ) : (
                <button className="btn btn-primary" onClick={this.rsvp}>
                  Take RSVP Photo
              </button>
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
    updateConfirmationStatus: (faceId, eventId) =>
      dispatch(_updateConfirmationStatus(faceId, eventId)),
    refreshUser: userId => dispatch(_refreshUser(userId)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CamCapture);

/*
<div style={{ top: 0, textAlign: 'center', position: 'absolute', left: '10%', fontFamily: 'Andale Mono' }}>
*/
