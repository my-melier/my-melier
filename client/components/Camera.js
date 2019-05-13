import { ImagePicker, Permissions } from 'expo';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import {
  setImage,
  loading,
  gotGoogleResponse,
} from '../store/reducers/googleVisionReducer';
import googleVisionConfig from '../../googleVisionConfig.js';
import LoadingPage from './LoadingPage';
import { Ionicons } from '@expo/vector-icons';

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
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    this.props.loading();
    this.handleImagePicked(imageData);
  }

  async pickPhoto() {
    let imageData = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    this.props.loading();
    this.handleImagePicked(imageData);
  }

  async handleImagePicked(imageData) {
    try {
      if (!imageData.cancelled) {
        let image = imageData;
        this.props.setImage(image);
        await this.sendToGoogle();
        return this.props.navigation.navigate('ConfirmWine');
      }
    } catch (err) {
      console.error(err);
    }
  }

  async sendToGoogle() {
    const { image, googleResponse } = this.props;
    try {
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
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    if (this.props.isLoading) {
      return <LoadingPage />;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>
          When taking a photo, please capture only one wine at a time
        </Text>
        <TouchableOpacity onPress={this.takePhoto} style={styles.camera}>
          <View>
            <Ionicons name="ios-camera" size={75} />
          </View>
        </TouchableOpacity>
        <Button
          onPress={this.pickPhoto}
          title="Choose from camera roll"
          color="#1985bc"
        />
      </View>
    );
  }
}

const mapState = state => ({
  image: state.googleVision.image,
  response: state.googleVision.response,
  isLoading: state.googleVision.loading,
});

const mapDispatch = dispatch => ({
  setImage: image => dispatch(setImage(image)),
  loading: () => dispatch(loading()),
  googleResponse: response => dispatch(gotGoogleResponse(response)),
});

export default withNavigation(
  connect(
    mapState,
    mapDispatch
  )(Camera)
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructions: {
    textAlign: 'center',
    marginLeft: 40,
    marginRight: 40,
    fontSize: 25,
  },
  camera: {
    backgroundColor: '#D3DCDF',
    borderRadius: 50,
    padding: 10,
    margin: 20,
    height: 100,
    width: 100,
    alignItems: 'center',
  },
});
