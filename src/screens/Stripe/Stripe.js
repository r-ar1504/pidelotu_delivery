import React, { Component } from 'react';
import {Image, ActivityIndicator,TouchableOpacity, View, Text } from 'react-native';
import Style from './StripeStyle';
import { Header, Content, Container, Left, Right, Body, Footer } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';


// create a component
export default class Stripe extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      loading: true,
      code: 400,
      balance: 0
    };
  }

  goBack(){
    this.props.navigation.navigate('Home', {user_name: global.user.name})
  }

  fetchData(){

    fetch('https://pidelotu.azurewebsites.net/get_delivery_balance/'+ global.user.id,
    {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Accept": 'application/json',
      },
    }
  ).then(  response   => response.json())
    .then( (response ) => {
      
      if( response.code != 404 ){
        this.setState({
          balance: response.balance,
          loading: false
        });

      }else{
        Alert.alert(
          'PídeloTú',
          'Tus datos no estan completos por favor verifica con tu asesor',
          [
            {text: 'Volver', onPress: () => {
              this.props.navigation.navigate('Home', {user_name: global.user.name})
            }}
          ],
          {cancelable: false}
        )
      }
    });
  }

  renderData(){
    if ( this.state.loading  == true ) {
      return(
        <View style={Style.loading_container}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )
    }else{
      return(
        <StripeData  balance = {this.state.balance}code={this.state.code} />
      )
    }
}//Render All Or None Items.

  render() {
    return (
      <Container  style={{ backgroundColor: '#0C4D80', flex: 1}}>
        <Header style={Style.header}>
          <Left>
            <TouchableOpacity onPress={this.goBack}>
              <View style={{padding: 15}}>
                  <Icon name={'angle-left'} color={'#fff'}  size={30} />
              </View>
            </TouchableOpacity>
          </Left>
          <Body>

          </Body>
          <Right>

          </Right>
        </Header>
        <Content contentContainerStyle={{flexGrow: 1}}>
          <View>
            <Text style={Style.header_text}>
               Balance de tu cuenta
            </Text>
              <Image source={ require('src/assets/images/logo.png')}
             style={Style.logo}
             resizeMethod={'resize'}/>
          </View>
          <View style={ Style. container}>
            {this.renderData()}
          </View>
        </Content>
      </Container>
    );
  }
}


class StripeData extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      if (this.props.code != 200) {
        return(
          <View style={Style.data_container}>
            <Text style={{color: '#F1F1F1', fontSize: 25, alignSelf: 'center', padding: 20, 
    textAlign: 'center'}}>
              Tus datos no están completos, 
              por favor verifica con un asesor
          </Text>
          </View>
        )
      }else{
        return (
          <View style={Style.data_container}>
            <View>
              <Text style={{color: '#F1F1F1', fontSize: 40, alignSelf: 'center',}}>
                $ {this.props.balance} MXN
              </Text>
            </View>
            <View>
    
            </View>
    
          </View>
        )
      }
  }
}

