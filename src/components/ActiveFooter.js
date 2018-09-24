import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';

var height = Dimensions.get('window').height
var width  = Dimensions.get('window').width;

export default class ActiveFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: this.props.order
    }
  }//End of constructor.

  render() {
    return (
      <View style={Style.container}>
        <Text style={Style.text}> Orden # {this.state.order.order_number} </Text>
        <Text style={Style.text}>  Restaurante : {this.state.order.restaurant_name} </Text>
        <Text style={Style.text}> Cliente:  </Text>
        <Text style={Style.text}> {this.state.order.user_name} </Text>
      </View>
    );
  }
}//End of component.

const Style = StyleSheet.create({
  container:{
    height: height*.20,
    backgroundColor: '#3155A0'
  },
  text:{
    color: '#fff',
    padding: 3,
  }
});//End of stylesheet.
