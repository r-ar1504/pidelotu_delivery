import { StyleSheet } from 'react-native';

export default Style = StyleSheet.create({
  background_image:{
    width: 100,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    zIndex: 0
  },
  container:{
    backgroundColor: '#000',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1
  },
  header:{
    width:'85%',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.47)',
  },
  logo:{
    marginTop: 100,
    width: 350,
    height: 90,
    resizeMode: 'cover'
  },
  container:{
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
});
