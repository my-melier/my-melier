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
    backgroundColor: '#555056',
  },
  active: {
    padding: 10,
    margin: 10,
    borderRadius: 20,
    width: 100,
    backgroundColor: '#999799',
  },
  text: {
    textAlign: 'center',
    color: 'white',
  },
});

export default buttonStyles;
