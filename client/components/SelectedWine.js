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
import {
  rateWineInDb,
  fetchingWinesFromDb,
} from '../store/reducers/userWinesReducer';
import { Ionicons } from '@expo/vector-icons';
import { MyMenuHeader } from '../styles/defaultNavigationOptions';

class SelectedWine extends Component {
  constructor() {
    super();
    this.rateWine = this.rateWine.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: <MyMenuHeader nav={navigation} />,
    };
  };

  rateWine(wineId, rating) {
    const { rateWineInDb, fetchWines, user } = this.props;
    rateWineInDb(wineId, rating);
    fetchWines(user.id);
    return this.props.navigation.navigate('myWines');
  }

  render() {
    const { selectedWine } = this.props;
    let IconComponent = Ionicons;
    const gif = {
      uri: 'https://media.giphy.com/media/3XHMTIqcUev2Vy9ILk/giphy.gif',
    };
    const wine = this.props.navigation.getParam('wine', 'Not Found');

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.cheers}>Cheers!</Text>
        <View style={styles.gifView}>
          <Image source={gif} style={styles.gif} />
        </View>
        <Text style={styles.text}>Don't forget to rate your selection:</Text>
        <Text style={styles.wineTitle}>{wine.title}</Text>
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
  user: state.user,
});

const mapDispatch = dispatch => ({
  rateWineInDb: (wineId, rating) => dispatch(rateWineInDb(wineId, rating)),
  fetchWines: userId => dispatch(fetchingWinesFromDb(userId)),
});

export default connect(
  mapState,
  mapDispatch
)(SelectedWine);

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  cheers: {
    textAlign: 'center',
    fontSize: 60,
    padding: 20,
  },
  gif: {
    width: 175,
    height: 175,
  },
  gifView: {
    alignItems: 'center',
    paddingBottom: 20,
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
