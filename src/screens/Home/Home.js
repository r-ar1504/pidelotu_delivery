/*-----------------------------------------------------------------
* Default Components                                              |
*-----------------------------------------------------------------*/
import React, { Component } from 'react';
import { Icon } from 'react-native-elements'
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { StyleSheet, ImageBackground, TouchableWithoutFeedback, View, Text, Image, YellowBox, ActnativeivityIndicator, Alert } from 'react-native';
import { Container, Header, Body, Left, Right, Content, Button } from 'native-base';
import OneSignal from 'react-native-onesignal';
/*-----------------------------------------------------------------
* Style Component                                                 |
*-----------------------------------------------------------------*/
import Home from './HomeStyle';

export default class Login extends Component{
  constructor(props){
    super(props);

    /*Method binding*/
    this.openDrawer = this.openDrawer.bind(this);
    this.pushHandler = this.pushHandler.bind(this);
    this.pushOpened = this.pushOpened.bind(this);

  }//Constructor End

  /* One Signal methods and listeners*/
  componentWillMount(){
      OneSignal.sendTags({delivery_code: 'DV10', user_type: 'delivery'});//Register tags for specific user.
      OneSignal.addEventListener('received', this.pushHandler);//If app is open will call this handler.
      OneSignal.addEventListener('opened', this.pushOpened);//If app is closed and user clicks, this handler will be called.
  }

  pushHandler(){
    alert("RECEIVED");
  }//OneSignal notification arrived;

  pushOpened(openResult){
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
    this.props.navigation.navigate('OrderAlert'); // Drawer Open
  }//OneSignal notification clicked;

  openDrawer(){
    this.props.navigation.navigate('DrawerOpen'); // Drawer Open
  }

  render(){
		return(
      <Container style={Style.container}>
        <ImageBackground source={ require('src/assets/images/menu-background.png')}
          style={{
            width:'100%',
            height:'100%',
            alignItems:'center',
            display:'flex'
          }}
        >
          <View
            style={{
              width:'100%',
              height:'100%',
              alignItems:'center',
              display:'flex'
            }}
          >
            <Header style={{
                backgroundColor: 'transparent',
                width: '85%',
                borderWidth: 0,
                borderBottomWidth: 1,
                borderBottomColor: 'rgba(255, 255, 255, 0.47)',
                alignItems: 'center',
                justifyContent: 'center'
              }}  noShadow >
              <Left>
                <TouchableWithoutFeedback onPress={this.openDrawer}>
                <Image source={ require('src/assets/images/menu-bars.png')}
                   style={{
                    width:25,
                    height:25
                   }}>
                </Image>
                </TouchableWithoutFeedback>
              </Left>
              <Body>
              </Body>
              <Right>
                <Icon name="user" type='feather' color={'#fff'}  size={20} />
                <Text
                  style={{
                    color:'#fff',
                    fontSize: 17,
                    fontFamily: 'Lato-Regular',
                    marginLeft:10
                  }}>
                Jorge Luis
                </Text>
              </Right>
            </Header>
            <Content contentContainerStyle={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                flex: 1
              }}>
              <Image source={ require('src/assets/images/icon.gif')}
                style={{width: 150, height: 150, marginTop:100}}
               />
                <Text
                  style={{
                    color:'#fff',
                    fontSize: 20,
                    fontFamily: 'Lato-Regular',
                    width: 200,
                    textAlign: 'center',
                    marginTop:50
                  }}>
                Espera la asignación de un pedido.
                </Text>
            </Content>
          </View>
        </ImageBackground>
      </Container>
    );
	}//Render End
}
