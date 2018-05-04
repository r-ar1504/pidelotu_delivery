/*-----------------------------------------------------------------
* Default Components                                              |
*-----------------------------------------------------------------*/
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { StyleSheet,  ImageBackground, View, Text, Image, YellowBox, ActnativeivityIndicator, Alert } from 'react-native';
import { Container, Header, Left, Right, Content, Button } from 'native-base';

/*-----------------------------------------------------------------
* Style Component                                                 |
*-----------------------------------------------------------------*/
import Style from './LoginStyle';

/*-----------------------------------------------------------------
* Form Component                                                  |
*-----------------------------------------------------------------*/
import LoginForm from './LoginForm';


export default class Login extends Component{
  constructor(props){
    super(props);
    this.state ={
      logged: false
    }//State Variables

    /*Method Bind*/
    this.goHome = this.goHome.bind(this);
  }//Constructor End

  goHome(){
    this.setState({logged: true},()=>{
      Alert.alert(
        'PídeloTú',
        'Éxito',
        [
          {text: 'Entendido', onPress: () => {
            this.props.navigation.navigate('Home',{logged: this.state.logged});
            }
          }
        ],
        { cancelable: false }
      )
    });
  }

  render(){
		return(
      <Container style={Style.container}>
        <ImageBackground source={ require('src/assets/images/login-background.png')} style={Style.background_image}>
          <Image source={require('src/assets/images/logo.png')} style={Style.logo} />
          <LoginForm goHome={this.goHome}/>
        </ImageBackground>
      </ Container>
    );
	}//Render End
}
