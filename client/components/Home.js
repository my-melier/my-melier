import React, {Component} from 'react'
import {Text, StyleSheet, View, Button} from 'react-native'

export default class Home extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Click the Camera to </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

// import React, {Component} from 'react'
// import {Text, StyleSheet, View} from 'react-native'
// import {TabNavigator} from './TabNavigator'

// export default class HomePage extends Component {
//   render() {
//     return (
//       <View>
//         <View style={styles.container}>
//           <Text> myMelier </Text>
//           <Text>
//             Instructions for drinking wine: Choose a bottle. Uncork. Pour
//             yourself a glass. Enjoy!
//           </Text>
//           <Text>
//             Instructions for using this app: Take a photo of a single wine from
//             a menu.
//           </Text>
//         </View>
//         <View styles={styles.navBar}>
//           <TabNavigator />
//         </View>
//       </View>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   navBar: {
//     flex: 1
//   }
// })
