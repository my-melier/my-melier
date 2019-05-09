import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, Button } from 'react-native';
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
          <Text> myMenu </Text>
          <View style={styles.container}>
            {comparisons.map(wine => (
              <View key={wine.id}>
                <Text>{wine.title}</Text>
                <Text>{wine.description}</Text>
                <Text>{wine.points}</Text>
                <Button
                  title="Select"
                  onPress={() => this.handleSelect(wine)}
                />
              </View>
            ))}
          </View>
          <Button
            title="Add another wine from menu"
            onPress={() => navigate('Camera')}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
  },
});

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
