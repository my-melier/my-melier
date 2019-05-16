import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { rateWineInDb } from '../store/reducers/userWinesReducer';
import { Ionicons } from '@expo/vector-icons';
import { LogoTitle } from '../styles/defaultNavigationOptions';
import layoutStyles from '../styles/layoutStyles';
import textStyles from '../styles/textStyles';

class SelectedWine extends Component {
  constructor() {
    super();
    this.rateWine = this.rateWine.bind(this);
  }

  static navigationOptions = {
    headerTitle: <LogoTitle />,
  };

  rateWine(wineId, rating) {
    const { rateWineInDb } = this.props;
    rateWineInDb(wineId, rating);
    return this.props.navigation.navigate('myWines');
  }

  render() {
    const { selectedWine } = this.props;
    let IconComponent = Ionicons;
    const gif = {
      uri: 'https://media.giphy.com/media/3XHMTIqcUev2Vy9ILk/giphy.gif',
    };

    return (
      <ScrollView style={layoutStyles.container}>
        <Text style={textStyles.logo}>Cheers!</Text>

        <View style={styles.gifView}>
          <Image source={gif} style={styles.gif} />
        </View>
        <Text style={textStyles.h3}>Hope you enjoy {selectedWine.title}</Text>
        <Text style={textStyles.h3bold}>
          Don't forget to rate your selection:
        </Text>
        <View style={styles.thumbsContainer}>
          <View style={styles.imageView}>
            <TouchableOpacity
              onPress={() => this.rateWine(selectedWine.id, true)}
            >
              <IconComponent
                name={'ios-checkmark-circle-outline'}
                size={75}
                color={'green'}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.imageView}>
            <TouchableOpacity
              onPress={() => this.rateWine(selectedWine.id, false)}
            >
              <IconComponent
                name={'ios-close-circle-outline'}
                size={75}
                color={'tomato'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapState = state => ({
  selectedWine: state.comparisons.selectedWine,
});

const mapDispatch = dispatch => ({
  rateWineInDb: (wineId, rating) => dispatch(rateWineInDb(wineId, rating)),
});

export default connect(
  mapState,
  mapDispatch
)(SelectedWine);

const styles = StyleSheet.create({
  gif: {
    width: 175,
    height: 175,
  },
  gifView: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
  },
  wineTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  thumbsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageView: {
    paddingRight: 15,
    paddingLeft: 15,
  },
});
