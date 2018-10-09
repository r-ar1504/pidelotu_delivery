import {StyleSheet } from 'react-native';

export default Style = StyleSheet.create({
  header:{
    backgroundColor: 'transparent',
    elevation: 0,
    shadowColor: 'transparent'
  },
  header_text:{
    color: '#ffffff',
    fontSize: 25,
    alignSelf: 'center',
  },
  container:{
    height: '80%',
  },
  data_container:{
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo:{
    width: 150,
    height: 40,
    flexGrow: 1,
    alignSelf: 'center',
  }
})
