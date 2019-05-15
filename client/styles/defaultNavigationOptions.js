import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import MyMenu from '../components/Comparisons';
import { getActiveChildNavigationOptions } from 'react-navigation';

export class LogoTitle extends Component {
  render() {
    return (
      <Text style={{ fontSize: 25 }}>
        <Text style={{ fontWeight: 'bold' }}>my</Text>Melier
      </Text>
    );
  }
}

export class MyMenuHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.props.nav.navigate('Comparisons')}>
        <Text style={{ paddingRight: 15 }}>
          <Text style={{ fontWeight: 'bold' }}>my</Text>Menu
        </Text>
      </TouchableOpacity>
    );
  }
}

// export default {
//   headerTitle: <LogoTitle />,
//   headerRight: <MyMenuHeader />,
// };
