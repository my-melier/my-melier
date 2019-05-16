import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { filterWines } from '../store/reducers/userWinesReducer';
import LoadingPage from './LoadingPage';
import { Ionicons } from '@expo/vector-icons';
import { MyWinesTitle } from '../styles/defaultNavigationOptions';
import layoutStyles from '../styles/layoutStyles';
import textStyles from '../styles/textStyles';
import buttonStyles from '../styles/buttonStyles';

class MyWines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterArg: 'saved',
    };
    this.filter = this.filter.bind(this);
    this.selectWine = this.selectWine.bind(this);
  }

  static navigationOptions = {
    headerTitle: <MyWinesTitle />,
  };

  selectWine(wine) {
    this.props.navigation.navigate('Rating', { wine: wine });
  }

  filter(filter) {
    this.props.filterWines(filter);
    if (filter === 'all') {
      this.setState({ filterArg: 'saved' });
    } else if (filter === true) {
      this.setState({ filterArg: 'liked' });
    } else {
      this.setState({ filterArg: 'disliked' });
    }
  }
  render() {
    const { loading, filteredWines } = this.props;
    let IconComponent = Ionicons;
    if (loading) {
      return <LoadingPage pronoun={'your'} />;
    }
    return (
      <ScrollView>
        <View style={layoutStyles.container}>
          <View style={buttonStyles.container}>
            {this.props.activeButton === 'all' ? (
              <TouchableOpacity style={buttonStyles.active}>
                <Text style={buttonStyles.text}>All</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={buttonStyles.button}
                onPress={() => this.filter('all')}
              >
                <Text style={buttonStyles.text}>All</Text>
              </TouchableOpacity>
            )}
            {this.props.activeButton === 'true' ? (
              <TouchableOpacity style={buttonStyles.active}>
                <Text style={buttonStyles.text}>Like</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={buttonStyles.button}
                onPress={() => this.filter(true)}
              >
                <Text style={buttonStyles.text}>Like</Text>
              </TouchableOpacity>
            )}
            {this.props.activeButton === 'false' ? (
              <TouchableOpacity style={buttonStyles.active}>
                <Text style={buttonStyles.text}>Dislike</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={buttonStyles.button}
                onPress={() => this.filter(false)}
              >
                <Text style={buttonStyles.text}>Dislike</Text>
              </TouchableOpacity>
            )}
          </View>
          <View>
            {filteredWines.wines ? (
              filteredWines.wines.length ? (
                filteredWines.wines.map(wine => (
                  <View key={wine.id}>
                    <View style={styles.text}>
                      {wine.savedWine.like ? (
                        <Text
                          onPress={() => this.selectWine(wine)}
                          style={textStyles.h6}
                        >
                          <IconComponent
                            name={'ios-checkmark-circle-outline'}
                            size={20}
                            color={'green'}
                          />
                          {wine.title}
                        </Text>
                      ) : wine.savedWine.like === false ? (
                        <Text
                          onPress={() => this.selectWine(wine)}
                          style={textStyles.h6}
                        >
                          <IconComponent
                            name={'ios-close-circle-outline'}
                            size={20}
                            color={'tomato'}
                          />
                          {wine.title}
                        </Text>
                      ) : (
                        <Text
                          onPress={() => this.selectWine(wine)}
                          style={textStyles.h6}
                        >
                          <IconComponent
                            name={'ios-help-circle-outline'}
                            size={20}
                          />
                          {wine.title}
                        </Text>
                      )}
                    </View>
                  </View>
                ))
              ) : (
                <View style={styles.text}>
                  <Text style={textStyles.h6}>
                    You currently have no {this.state.filterArg} wines
                  </Text>
                </View>
              )
            ) : (
              <View style={styles.text}>
                <Text style={textStyles.h6}>Your cellar is empty!</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapState = state => ({
  loading: state.userWines.loading,
  filteredWines: state.userWines.filteredWines,
  activeButton: state.userWines.activeButton,
});

const mapDispatch = dispatch => ({
  filterWines: filter => dispatch(filterWines(filter)),
});

export default connect(
  mapState,
  mapDispatch
)(MyWines);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  wineContainer: {
    marginTop: 20,
  },
  text: {
    padding: 10,
  },
});
