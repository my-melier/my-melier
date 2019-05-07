import { ImagePicker, Permissions, FileSystem } from 'expo';
import React, { Component } from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';
import googleVisionConfig from '../../googleVisionConfig';
import axios from 'axios';

export default class CameraComponent extends Component {
  constructor() {
    super();
    this.state = {
      image: null,
      uploading: false,
      googleResponse: null,
    };
    this.takePhoto = this.takePhoto.bind(this);
    this.handleImagePicked = this.handleImagePicked.bind(this);
    this.sendToGoogle = this.sendToGoogle.bind(this);
  }

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  async takePhoto() {
    let pickerResult = await ImagePicker.launchCameraAsync({
      base64: true,
      allowsEditing: true,
      aspect: [4, 1],
    });

    this.handleImagePicked(pickerResult);
  }

  async handleImagePicked(pickerResult) {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        let image = pickerResult;
        this.setState({ image: image });
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
  }

  async sendToGoogle() {
    try {
      console.log('starting....');
      this.setState({ uploading: true });
      let { image } = this.state;
      let body = JSON.stringify({
        requests: [
          {
            features: [{ type: 'TEXT_DETECTION', maxResults: 1 }],
            image: {
              content: image.base64,
            },
          },
        ],
      });
      let response = await fetch(
        'https://vision.googleapis.com/v1/images:annotate?key=' +
          googleVisionConfig.API_KEY,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: body,
        }
      );
      let responseJson = await response.json();
      this.setState({
        googleResponse: responseJson,
        uploading: false,
      });
      console.log(this.state.googleResponse);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.takePhoto} title="Take a photo" color="#1985bc" />
        <Button
          style={{ marginBottom: 10 }}
          onPress={() => this.sendToGoogle()}
          title="Analyze!"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
