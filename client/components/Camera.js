import { ImagePicker, Permissions } from 'expo';
import React, { Component } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import sendToGoogle from '../../googleVision/textDetection';

export default class Camera extends Component {
  constructor() {
    super();
    this.state = {
      image: null,
      uploading: false,
      googleResponse: null,
    };
    this.takePhoto = this.takePhoto.bind(this);
    this.handleImagePicked = this.handleImagePicked.bind(this);
    this.pickPhoto = this.pickPhoto.bind(this);
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

  async pickPhoto() {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    if (!result.cancelled) {
      this.setState({ image: result });
    }

    console.log(this.state.image);
  }

  async handleImagePicked(pickerResult) {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        let image = pickerResult;
        this.setState({ image: image, uploading: false });
        this.cropImage(image);
      }
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.takePhoto} title="Take a photo" color="#1985bc" />
        <Button onPress={this.pickPhoto} title="Pick a photo" color="#1985bc" />
        <Button
          style={{ marginBottom: 10 }}
          onPress={sendToGoogle}
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
