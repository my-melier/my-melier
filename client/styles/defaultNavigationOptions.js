import React, {Component} from 'react'
import {Text, TouchableOpacity} from 'react-native'

export class LogoTitle extends Component {
  render() {
    return (
      <Text style={{fontSize: 25}}>
        <Text style={{fontWeight: 'bold'}}>my</Text>Melier
      </Text>
    )
  }
}

export class MyMenuHeader extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.nav.navigate('ComparisonWithoutFunctionality')
        }
      >
        <Text style={{paddingRight: 15}}>
          <Text style={{fontWeight: 'bold'}}>my</Text>Menu
        </Text>
      </TouchableOpacity>
    )
  }
}
