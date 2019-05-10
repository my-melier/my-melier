import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Button,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { selectedWine } from '../store/reducers/comparisonReducer';

class Comparisons extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(wine) {
    const { selectedWine, navigation } = this.props;
    selectedWine(wine);
    return navigation.navigate('SelectedWine');
  }

  render() {
    const { comparisons } = this.props;
    const { navigate } = this.props.navigation;

    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.myMenu}>myMenu</Text>
          <Text style={styles.headerText}>
            Please select which wine you decide to order
          </Text>
          <Text style={styles.headerText}>OR</Text>
          <TouchableOpacity
            onPress={() => navigate('Camera')}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Add another wine</Text>
          </TouchableOpacity>
          <View>
            {comparisons.map(wine => (
              <View key={wine.id} style={styles.wine}>
                <Text style={styles.wineTitle}>{wine.title}</Text>
                <Text style={styles.description}>{wine.description}</Text>
                <Text style={styles.score}>Score: {wine.points}</Text>
                <TouchableOpacity
                  onPress={() => this.handleSelect(wine)}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>select</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapState = state => ({
  comparisons: state.comparisons.comparisons,
});

const mapDispatch = dispatch => ({
  selectedWine: wine => dispatch(selectedWine(wine)),
});

export default connect(
  mapState,
  mapDispatch
)(Comparisons);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  myMenu: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  headerText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 40,
    marginRight: 40,
    textAlign: 'center',
  },
  wineTitle: {
    fontSize: 17,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  wine: {
    backgroundColor: '#D3DCDF',
    borderRadius: 20,
    padding: 10,
    margin: 10,
    marginLeft: 25,
    marginRight: 25,
  },
  centerText: {
    textAlign: 'center',
  },
  description: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'justify',
  },
  score: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'gray',
    borderRadius: 20,
    padding: 5,
    height: 40,
    margin: 10,
    marginLeft: 75,
    marginRight: 75,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
  },
});
