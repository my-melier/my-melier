import React, { Component } from 'react';
import { Text } from 'react-native';

export class LogoTitle extends Component {
  render() {
    return (
      <Text style={{ fontSize: 25, fontFamily: 'Helvetica Neue' }}>
        <Text style={{ fontWeight: 'bold' }}>my</Text>Melier
      </Text>
    );
  }
}

export class MyMenuTitle extends Component {
  render() {
    return (
      <Text style={{ fontSize: 25, fontFamily: 'Helvetica Neue' }}>
        <Text style={{ fontWeight: 'bold' }}>my</Text>Menu
      </Text>
    );
  }
}

export class MyWinesTitle extends Component {
  render() {
    return (
      <Text style={{ fontSize: 25, fontFamily: 'Helvetica Neue' }}>
        <Text style={{ fontWeight: 'bold' }}>my</Text>Wines
      </Text>
    );
  }
}
