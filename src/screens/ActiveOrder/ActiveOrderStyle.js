import { StyleSheet, Dimensions } from 'react-native';

var height = Dimensions.get('window').height
var width  = Dimensions.get('window').width;

export default Styles = StyleSheet.create({
  order_button_accept:{
    marginTop: 60,
    width: 130,
    backgroundColor: '#00CAFF',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius:  50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    opacity: 0.7
  },
  bottomSection:{
    width: width*.50,
    height: '100%',
    backgroundColor: '#3155A0',
    justifyContent: 'center',
    alignItems: 'center', 
  },
  button_text:{
    fontSize: 12,
    color: '#fff',
    fontFamily: 'Lato-Regular'
  }
})
