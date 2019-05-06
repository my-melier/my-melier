import React, { Component } from 'react';
import { StyleSheet, Dimensions, Text, View, Image } from 'react-native';
import { Camera, Permissions } from 'expo';
import Toolbar from './CameraToolbar';
import CropImage from './CropImage';

export default class CameraPage extends Component {
  constructor() {
    super();
    this.camera = null;

    this.state = {
      image: null,
      flashMode: Camera.Constants.FlashMode.off,
      capturing: null,
      hasCameraPermission: null,
    };
    this.handleShortCapture = this.handleShortCapture.bind(this);
    this.setFlashMode = this.setFlashMode.bind(this);
  }

  async componentDidMount() {
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const hasCameraPermission = camera.status === 'granted';

    this.setState({ hasCameraPermission });
  }

  setFlashMode(flashMode) {
    this.setState({ flashMode });
  }

  async handleShortCapture() {
    const photoData = await this.camera.takePictureAsync();
    this.setState({
      capturing: false,
      image: photoData,
    });
    console.log(photoData);
  }

  render() {
    const { hasCameraPermission, flashMode, capturing, image } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    }

    if (image) {
      return <CropImage image={image} />;
      // return <Image source={{ uri: image }} style={styles.galleryImage} />;
    }

    return (
      <React.Fragment>
        <View>
          <Camera
            flashMode={flashMode}
            style={styles.preview}
            ref={camera => (this.camera = camera)}
          />
        </View>
        <Toolbar
          capturing={capturing}
          flashMode={flashMode}
          setFlashMode={this.setFlashMode}
          onShortCapture={this.handleShortCapture}
        />
      </React.Fragment>
    );
  }
}

const { width: winWidth, height: winHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  preview: {
    height: winHeight,
    width: winWidth,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  galleryImage: {
    width: winWidth,
    height: winHeight,
  },
});
