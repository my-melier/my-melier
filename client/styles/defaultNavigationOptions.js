import React, { Component } from 'react';

class LogoTitle extends Component {
  render() {
    return (
      <Text>
        <Text style={{ fontWeight: 'bold' }}>my</Text>Melier
      </Text>
    );
  }
}

export default {
  headerTitle: <LogoTitle />,
  headerBackTitle: null,
};
