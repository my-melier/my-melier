import { ImagePicker, Permissions } from 'expo';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { setImage } from '../store/reducers/googleVisionReducer';
import { Ionicons } from '@expo/vector-icons';
import { LogoTitle } from '../styles/defaultNavigationOptions';
import layoutStyles from '../styles/layoutStyles';
import textStyles from '../styles/textStyles';

class Camera extends Component {
  constructor(props) {
    super(props);
    this.takePhoto = this.takePhoto.bind(this);
    this.handleImagePicked = this.handleImagePicked.bind(this);
  }

  static navigationOptions = {
    headerTitle: <LogoTitle />,
  };

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
      <View style={layoutStyles.container}>
        <View style={layoutStyles.centerContainer}>
          <Text style={textStyles.h2}>
            When taking a photo, please capture only one wine at a time
          </Text>
          <TouchableOpacity onPress={this.takePhoto} style={styles.camera}>
            <View>
              <Ionicons name="ios-camera" size={75} color={'white'} />
            </View>
          </TouchableOpacity>
        </View>
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
  camera: {
    backgroundColor: '#555056',
    borderRadius: 50,
    padding: 10,
    margin: 20,
    height: 100,
    width: 100,
    alignItems: 'center',
  },
});
