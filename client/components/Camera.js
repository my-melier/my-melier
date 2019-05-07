import { ImagePicker, Permissions } from 'expo';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Button } from 'react-native';
import {
  setImage,
  loadingGoogleResponse,
  gotGoogleResponse,
} from '../store/reducers/googleVisionReducer';
import googleVisionConfig from '../../googleVisionConfig.js';

class Camera extends Component {
  constructor(props) {
    super(props);
    this.takePhoto = this.takePhoto.bind(this);
    this.handleImagePicked = this.handleImagePicked.bind(this);
    this.pickPhoto = this.pickPhoto.bind(this);
    this.sendToGoogle = this.sendToGoogle.bind(this);
  }

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  async takePhoto() {
    let imageData = await ImagePicker.launchCameraAsync({
      base64: true,
      allowsEditing: true,
      aspect: [4, 1],
    });

    this.handleImagePicked(imageData);
  }

  async pickPhoto() {
    let imageData = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    this.handleImagePicked(imageData);
  }

  handleImagePicked(imageData) {
    try {
      if (!imageData.cancelled) {
        let image = imageData;
        this.props.setImage(image);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async sendToGoogle() {
    const { image, response, loading, googleResponse } = this.props;
    try {
      console.log('loading google response....');
      loading();
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
      let data = await fetch(
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
      let responseJson = await data.json();
      googleResponse(responseJson);
      // console.log(response.responses[0].fullTextAnnotation.text);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.takePhoto} title="Take a photo" color="#1985bc" />
        <Button onPress={this.pickPhoto} title="Pick a photo" color="#1985bc" />
        <Button
          style={{ marginBottom: 10 }}
          onPress={this.sendToGoogle}
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

const mapState = state => ({
  image: state.googleVision.image,
  response: state.googleVision.response,
});

const mapDispatch = dispatch => ({
  setImage: image => dispatch(setImage(image)),
  loading: () => dispatch(loadingGoogleResponse()),
  googleResponse: response => dispatch(gotGoogleResponse(response)),
});

export default connect(
  mapState,
  mapDispatch
)(Camera);
