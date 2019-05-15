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
    backgroundColor: 'grey',
  },
  active: {
    padding: 10,
    margin: 10,
    borderRadius: 20,
    width: 100,
    backgroundColor: '#D3DCDF',
  },
  text: {
    textAlign: 'center',
    color: 'white',
  },
});

export default buttonStyles;
