import { StyleSheet } from 'react-native';

const StartStyles = StyleSheet.create({
  bg: {
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 38,
    color: '#187DC2',
  },
  btn: {
    width: '70%',
    height: 50,
    marginTop: '30%',
    backgroundColor: '#187DC2',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 22,
    color: '#FFFFFF',
  },
});

export default StartStyles;
