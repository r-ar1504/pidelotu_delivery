import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { StyleSheet, View, Text, Image, YellowBox, ActivityIndicator, Alert, ImageBackground } from 'react-native';
import { Container, Header, Left, Right, Content, Button } from 'native-base'

export default class Splash extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    setTimeout(() => {
      this.props.navigation.navigate('Login');
    }, 3000);
  }//Timeout and screen change

	render(){
		return(
			<View style={ style.container}>
        <ImageBackground source={ require('src/assets/images/background.png')} style={style.background_image}>
            <Image source={ require('src/assets/images/icon.gif') } style={ style.splash_logo } />
        </ImageBackground>
  		</View>
			)
	}
}

const style = StyleSheet.create({
  splash_logo:{
    width: 150,
    height: 150,
    position:'absolute'
  },
  background_image:{
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
