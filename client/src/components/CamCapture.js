import React, { Component } from 'react';

import Webcam from 'react-webcam';

export default class CamCapture extends Component {
  constructor() {
    super();
    this.setRef = this.setRef.bind(this);
    this.capture = this.capture.bind(this);
  }

  setRef(webcam) {
    this.webcam = webcam;
  }

  capture() {
    const imageSrc = this.webcam.getScreenshot();
    console.log(imageSrc);
  }

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
