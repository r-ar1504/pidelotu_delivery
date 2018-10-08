import React, { Component } from 'react';
import {ActivityIndicator, ScrollView, View, Text } from 'react-native';
import { Header, Content, Container, Left, Right, Body, Footer } from 'native-base';
import Style from './OrdersStyle.js';

export default class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };

    this.renderItems  = this.renderItems.bind(this);
  }

  renderItems(){
      if ( this.state.loading  == true ) {
        return(
          <View style={Style.loading_container}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )
      }else{

      }
  }//Render All Or None Items.

  render() {
    return (
      <Container  style={{ backgroundColor: '#0C4D80', flex: 1}}>
        <Header style={Style.header}>
          <Left>

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
