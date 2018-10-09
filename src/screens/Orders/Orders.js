import React, { Component } from 'react';
import {Alert, ActivityIndicator, TouchableOpacity, View, Text } from 'react-native';
import { Header, Content, Container, Left, Right, Body, Footer } from 'native-base';
import OrderItems from  'src/components/OrderItems';
import Icon from 'react-native-vector-icons/FontAwesome';

import Style from './OrdersStyle.js';

export default class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };

    this.renderItems  = this.renderItems.bind(this);
    this.fetchOrders = this.fetchOrders.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  componentWillMount(){
    this.fetchOrders(); 
  }
  
  fetchOrders(){
    //http://10.33.192.93:8000
    //https://pidelotu.azurewebsites.net
    fetch('https://pidelotu.azurewebsites.net/get_delivery_orders/'+ global.user.id,
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
          orders: response.orders,
          loading: false
        });

      }else{
        Alert.alert(
          'PídeloTú',
          'No tienes historial de ordenes',
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
  
  goBack(){
   this.props.navigation.navigate('Home', {user_name: global.user.name})
  }

  renderItems(){
      if ( this.state.loading  == true ) {
        return(
          <View style={Style.loading_container}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )
      }else{
        return(
          <OrderItems data={this.state.orders}  />
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
               Historial de Pedidos
            </Text>
          </View>
          <View style={ Style. container}>
            {this.renderItems()}
          </View>
        </Content>
      </Container>
    )
  }
}
