import { ImagePicker, Permissions } from 'expo';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { setImage } from '../store/reducers/googleVisionReducer';
import { Ionicons } from '@expo/vector-icons';

class Camera extends Component {
  constructor(props) {
    super(props);
    this.takePhoto = this.takePhoto.bind(this);
    this.handleImagePicked = this.handleImagePicked.bind(this);
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

    this.handleImagePicked(imageData);
  }

  async handleImagePicked(imageData) {
    try {
      if (!imageData.cancelled) {
        this.props.setImage(imageData);
        this.props.navigation.navigate('ConfirmWine');
      }
    } catch (err) {
      console.error(err);
    }
  }

  render() {
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
      </View>
    );
  }
}

const mapDispatch = dispatch => ({
  setImage: image => dispatch(setImage(image)),
});

export default withNavigation(
  connect(
    null,
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
