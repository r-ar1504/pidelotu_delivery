/*-----------------------------------------------------------------
* Default Components                                              |
*-----------------------------------------------------------------*/
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StackNavigator } from 'react-navigation';
import { AsyncStorage, StyleSheet, ImageBackground,TouchableWithoutFeedback, View, Text, Image, YellowBox, ActnativeivityIndicator, Alert } from 'react-native';
import { Container, Header,Footer, Body, Left, Right, Content, Button } from 'native-base';
/*-----------------------------------------------------------------
* Component Style                                                 |
*-----------------------------------------------------------------*/
import Style from './DrawMenuStyle';


export default class DrawMenu extends Component{
  constructor(props){
    super(props);

    /*Method binding*/
    this.dismissSide = this.dismissSide.bind(this);
    this.logOut = this.logOut.bind(this);

  }//Constructor End

  /* Close side menu. */
  dismissSide(){
    this.props.navigation.navigate('DrawerClose');
  }

  logOut(){
    console.log("Here")
    AsyncStorage.getItem('user')
    .then(
      (query) => {
        let user = JSON.parse(query);
        let url = "http://pidelotu.azurewebsites.net/sign_out/" + user.app_code;
        
        fetch( url, {
          method : 'GET',
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        },
        )
        .then(response => response.json() )
        .then(response => {
          AsyncStorage.removeItem('user');
          this.props.navigation.navigate('LoginStack');
        });
      }
    )
  
   


  }

  render(){
    return(
      <Container>
      <ImageBackground
        source={require('src/assets/images/sidebar-background.png')}
        style={{
          width: '100%',
          height: '100%'
        }}>
        <View style={{
          flexDirection: 'column'
        }}>
          <Header noShadow
            style={{
              backgroundColor: 'transparent'
            }}>
            <Right>
              <TouchableWithoutFeedback onPress={this.dismissSide}>
                <Icon name="arrow-left" type='ionicicons' color={'#fff'}  size={25} />
              </TouchableWithoutFeedback>
            </Right>
          </Header>
            <View style={Style.profile}>
              <Image source={require('src/assets/images/person.png')}
                style={{
                  height: 150,
                  width: 150,
                  borderRadius: 100,
                  borderWidth: 1,
                  borderColor: '#fff',
                }}
                />
              <Text
                style={{
                  marginTop: 10,
                  color: '#fff',
                  fontSize: 20,
                  fontFamily: 'Lato-Regular'
                }}>
                Jorge Luis
              </Text>
            </View>
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                  fontFamily: 'Lato-Regular',
                  alignSelf: 'flex-start',
                  width: 200,
                  marginTop: 10,
                  paddingBottom: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: '#fff'
                }}>
                Mi Perfil
              </Text>
            </View>
            <View style={{
                marginTop:40,
                flexDirection: 'column',
                flexWrap: 'nowrap',
                justifyContent: 'center',
                alignItems: 'center',
              }} >
              <ListItem iconName={"book"} iconType={"materialdesignicons"} linkName={"Historial de pedidos"}/>
              <ListItem iconName={"question"} iconType={"fontawesome"} linkName={"Manual de ayuda"}/>
            </View>
            <TouchableWithoutFeedback onPress={this.logOut}>
              <View style={{
                  marginTop: 300,
                  width: 300,
                  justifyContent: 'center',
                  alignItems: 'center',
                }} >
                <Text style={{
                  color: '#fff',
                  marginLeft: 30,
                  fontSize: 19,
                  fontFamily: 'Lato-Regular',
                  alignSelf: 'flex-start',
                  overflow: 'visible',
                  }}>
                  Cerrar sesión
                </Text>
              </View>
            </TouchableWithoutFeedback>
        </View>
      </ImageBackground>
      </Container>
    )
  }
}


/*-----------------------------------------------------------------
* List Components                                                 |
*-----------------------------------------------------------------*/

export class ListItem extends Component{
  constructor(props){
    super(props);
  }//Constructor End

  render(){
    return(
      <TouchableWithoutFeedback onPress={this.props.goTo}>
        <View style={{
            marginTop:20,
            flexDirection: 'row',
            flexWrap: 'nowrap',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: 160,
            overflow: 'visible',
          }}>
          <Icon name={this.props.iconName} color={'#fff'}  size={17} />
          <Text style={{
            color: '#fff',
            marginLeft: 10,
            fontSize: 19,
            fontFamily: 'Lato-Regular',
            alignSelf: 'flex-start',
            overflow: 'visible',
          }}>
            {this.props.linkName}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
