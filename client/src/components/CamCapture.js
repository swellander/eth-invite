import React, { Component } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';

const { addUserImageToCollection } = require('../awsUtils/rekog');

export default class CamCapture extends Component {
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
        console.log('this is 2nd', faces);
      });
    });
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
