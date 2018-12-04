import React, { Component } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import Header from './Header';
import SimpleSnackbar from './SimpleSnackbar';
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
    this.state = {
      open: false,
      message: ''
    }
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
                  if (searchedFaces.FaceMatches.length && !isThere) {
                    this.setState({ open: true, message: 'Not at location of event.' }) //trigger error snackbar
                  } else if ((!searchedFaces.FaceMatches.length) && isThere) {
                    alert('something wrong with searchedFaces')
                    console.log(searchedFaces)
                    deleteFaces(faceIdArray)
                    //delete photo from event bucket S3
                    console.log('data', imageName[0])
                    console.log('bucket', bucketName)
                    axios.delete(`/api/camera/${imageName[0]}/${bucketName}`)

                  } else if (searchedFaces.FaceMatches.length && isThere) {
                    const faceId = searchedFaces.FaceMatches[0].Face.FaceId;

                    //update user's invite
                    this.props.updateConfirmationStatus(
                      faceId,
                      this.props.match.params.eventId
                    )
                      .then(() => {
                        this.props.history.push(`/events/${this.props.match.params.eventId}`)
                      })
                      .catch(err => {
                        this.setState({ open: true, message: 'Wrong Face. Try Again.' }) //trigger error snackbar
                      })
                  } else {
                    //not at pary, dont confirm attendance
                    this.setState({ open: true, message: 'Not at location of event.' }) //trigger error snackbar
                    alert('Either wrong face or Not at location')

                  }
                });
              }
            } else {
              console.log('faces not detected');
              this.setState({ open: true, message: 'No faces detected in photo.' }) //trigger error snackbar

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
          this.setState({ open: true }) //trigger error snackbar
        }
      });
    });
  };

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: 'user',
    };

    const isConfirm = this.props.location.pathname.indexOf('confirm') !== -1;
    console.log(this.props);

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
            style={{ display: 'container', marginTop: -60 }}
          />
          <div className="form-group" style={{ display: 'container', marginTop: -10, alignItems: 'center' }}>
            {isConfirm ? (
              <button className="btn btn-primary" onClick={this.confirm}>
                Confirm Attendance
              </button>
            ) : (
                <button className="btn btn-primary" onClick={this.rsvp}>
                  Take RSVP Photo
              </button>
              )}
            <SimpleSnackbar message={this.state.message} open={this.state.open} handleClose={this.handleClose} />
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
