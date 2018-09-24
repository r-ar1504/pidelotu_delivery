import { StyleSheet } from 'react-native';

export default Style = StyleSheet.create({
  container:{
    flex: 1
  },
  background_image:{
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    flex: 1
  },
  logo:{
    marginTop: 100,
    width: 350,
    height: 90,
    resizeMode: 'cover'
  }
});
