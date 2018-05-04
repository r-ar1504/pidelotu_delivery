/*-----------------------------------------------------------------
* Default Components                                              |
*-----------------------------------------------------------------*/
import React, { Component } from 'react';
import { Icon } from 'react-native-elements'
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { StyleSheet, ImageBackground, TouchableOpacity, TouchableWithoutFeedback, View, Text, Image, YellowBox, ActnativeivityIndicator, Alert } from 'react-native';
import { Container, Header, Body, Left, Right, Content, Button } from 'native-base';

/*-----------------------------------------------------------------
* Style Component                                                 |
*-----------------------------------------------------------------*/
import Style from './OrderAlertStyle';

export default class OrderAlert extends Component{
  constructor(props){
    super(props);

    /*Method binding*/
    this.openDrawer = this.openDrawer.bind(this);
  }//Constructor End

  openDrawer(){
    this.props.navigation.navigate('DrawerOpen'); // open drawer
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
                style={{width: 100, height: 100, marginTop:100}}
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
                Pedido Entrante #4345342
                </Text>
                <Text
                  style={{
                    color:'#fff',
                    fontSize: 15,
                    fontFamily: 'Lato-Regular',
                    width: 200,
                    textAlign: 'center',
                    marginTop:20
                  }}>
                  Paseo del Tecnológico #456, Col La Rosita.
                </Text>
                <TouchableOpacity>
                  <View style={Style.order_button_accept}>
                    <Text style={Style.button_text}>
                      COMENZAR PEDIDO
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={Style.order_button_reject}>
                    <Text style={Style.button_text}>
                      RECHAZAR PEDIDO
                    </Text>
                  </View>
                </TouchableOpacity>
            </Content>
          </View>
        </ImageBackground>
      </Container>
    );
	}//Render End
}
