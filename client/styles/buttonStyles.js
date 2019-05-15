import { StyleSheet } from 'react-native';

const buttonStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    padding: 10,
    margin: 10,
    borderRadius: 20,
    width: 100,
    height: 40,
    backgroundColor: '#555056',
    justifyContent: 'center',
  },
  wideButton: {
    padding: 10,
    margin: 10,
    borderRadius: 20,
    width: 150,
    height: 40,
    backgroundColor: '#555056',
    justifyContent: 'center',
  },
  active: {
    padding: 10,
    margin: 10,
    borderRadius: 20,
    width: 100,
    height: 40,
    backgroundColor: '#999799',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    color: 'white',
  },
});

export default buttonStyles;
