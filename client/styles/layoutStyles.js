import { StyleSheet } from 'react-native';

const layoutStyles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  padding: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  bubble: {
    backgroundColor: '#E3E8EA',
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  flexContainer: {
    flex: 1,
    borderRadius: 20,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'stretch',
  },
});

export default layoutStyles;
