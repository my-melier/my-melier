import React, { Component } from 'react';
import { Dimensions, Button, ImageBackground, StyleSheet } from 'react-native';
import { ImageManipulator } from 'expo-image-crop';

export default class CropImage extends Component {
  constructor(props) {
    super(props);
    const image = this.props.image;
    this.state = {
      isVisible: false,
      uri: image.uri,
    };
  }

  async sendToGoogle(uri) {}

  onToggleModal = () => {
    const { isVisible } = this.state;
    this.setState({ isVisible: !isVisible });
  };

  render() {
    const { uri, isVisible } = this.state;
    const { width, height } = Dimensions.get('window');
    return (
      <ImageBackground
        resizeMode="contain"
        style={{
          justifyContent: 'center',
          padding: 20,
          alignItems: 'center',
          height,
          width,
          backgroundColor: 'black',
        }}
        source={{ uri }}
      >
        <Button
          title="Open Image Editor"
          onPress={() => this.setState({ isVisible: true })}
        />
        <ImageManipulator
          photo={{ uri }}
          isVisible={isVisible}
          onPictureChoosed={uriM => this.setState({ uri: uriM })}
          onToggleModal={this.onToggleModal}
        />
        <Button title="submit" onPress={() => this.sendToGoogle(uri)} />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({});
