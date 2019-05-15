import React, {Component} from 'react'
import {Text, StyleSheet, View, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import {
  selectedWine,
  removedWine,
  clearedComparisons
} from '../store/reducers/comparisonReducer'
import {saveWineToDb} from '../store/reducers/userWinesReducer'
import {numToLetter} from '../../utils'

class ComparisonsWithoutFunctionality extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {comparisons} = this.props

    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.myMenu}>myMenu</Text>
          <Text style={styles.headerText}>
            Here are the wines you are currently considering:
          </Text>
          <View>
            {comparisons.map(wine => (
              <View key={wine.id} style={styles.wine}>
                <Text style={styles.wineTitle}>{wine.title}</Text>
                <Text style={styles.description}>{wine.description}</Text>
                <Text style={styles.score}>
                  Score: {numToLetter(wine.points)}
                </Text>
                <View style={styles.mainButtonView} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    )
  }
}

const mapState = state => ({
  comparisons: state.comparisons.comparisons,
  user: state.user
})

const mapDispatch = dispatch => ({
  selectedWine: wine => dispatch(selectedWine(wine)),
  removedWine: wineId => dispatch(removedWine(wineId)),
  clearedComparisons: () => dispatch(clearedComparisons()),
  saveWineToDb: (userId, wineId) => dispatch(saveWineToDb(userId, wineId))
})

export default connect(
  mapState,
  mapDispatch
)(ComparisonsWithoutFunctionality)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  myMenu: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10
  },
  headerText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 40,
    marginRight: 40,
    textAlign: 'center'
  },
  wineTitle: {
    fontSize: 17,
    textDecorationLine: 'underline',
    textAlign: 'center'
  },
  wine: {
    backgroundColor: '#D3DCDF',
    borderRadius: 20,
    padding: 10,
    margin: 10,
    marginLeft: 25,
    marginRight: 25
  },
  centerText: {
    textAlign: 'center'
  },
  description: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'justify'
  },
  score: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 10
  },
  mainButtonView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  mainButton: {
    backgroundColor: 'gray',
    borderRadius: 20,
    padding: 5,
    height: 40,
    width: 150,
    margin: 5,
    justifyContent: 'center'
  },
  button: {
    backgroundColor: 'gray',
    borderRadius: 20,
    padding: 5,
    height: 40,
    width: 100,
    margin: 5,
    justifyContent: 'center'
  },
  buttonText: {
    color: 'black',
    textAlign: 'center'
  }
})
