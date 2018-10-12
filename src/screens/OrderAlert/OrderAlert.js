/*-----------------------------------------------------------------
* Default Components                                              |
*-----------------------------------------------------------------*/
import React, { Component } from 'react';
import { Icon } from 'react-native-elements'
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { AsyncStorage, StyleSheet, ImageBackground, TouchableOpacity, TouchableWithoutFeedback, View, Text, Image, YellowBox, ActnativeivityIndicator, Alert } from 'react-native';
import { Container, Header, Body, Left, Right, Content, Button } from 'native-base';

/*-----------------------------------------------------------------
* Style Component                                                 |
*-----------------------------------------------------------------*/
import Style from './OrderAlertStyle';

export default class OrderAlert extends Component{
  constructor(props){
    super(props);

    this.state = {
      user_name:        this.props.navigation.getParam("user_name"),
      user_lat:         this.props.navigation.getParam("user_lat"),
      user_lng:         this.props.navigation.getParam("user_lng"),
      res_lat:          this.props.navigation.getParam("res_lat"),
      res_lng:          this.props.navigation.getParam("res_lng"),
      restaurant_name:  this.props.navigation.getParam('restaurant_name'),
      order_status:     this.props.navigation.getParam('status'),
      order_number:     this.props.navigation.getParam('id'),
      user_name:        this.props.navigation.getParam('user_name'),
      user_code:        this.props.navigation.getParam('user_code'),
      human_address: ""
    }
    
    /*Method binding*/
    this.openDrawer =      this.openDrawer.bind(this);
    this.initializeOrder = this.initializeOrder.bind(this);
    this.rejectOrder =     this.rejectOrder.bind(this);
    this.translateCoordinates = this.translateCoordinates.bind(this);
    this.translateCoordinates();
  }//Constructor End

  openDrawer(){
    this.props.navigation.navigate('DrawerOpen'); // open drawer
  }

  translateCoordinates(){
    var google_url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+ this.state.user_lat +"," + this.state.user_lng + "&key=AIzaSyBY3nmoAufv_W5oIuvQMimP4mpxSaJH_BI"
    
    fetch( google_url, {
      method: 'GET',
      headers: {
        'Content-Type' : 'json/application'
      }
    }).then(response => response.json())
        .then( response =>{
          // console.log('Google Response', response.results[2].formatted_address);
          this.setState({
            human_address:  response.results[2].formatted_address
          })
        })

  }
   //{TODO}https://pidelotu.azurewebsites.net
  rejectOrder(){
    fetch('https://pidelotu.azurewebsites.net/reject_delivery/'+ this.state.order_number + '/' + this.state.user_code,{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    .then( (response) =>{
      if( response.status == "candidate_deleted"){
        AsyncStorage.removeItem('order');
  
        AsyncStorage.removeItem('active_order');

        this.props.navigation.navigate('Home');

      }else if( response.status == 'ok')

      this.props.navigation.navigate('Home', {user_name: global.user.name})
    });
  }

  componentDidMount(){
    this.translateCoordinates();
  }

  initializeOrder(){
    fetch('https://pidelotu.azurewebsites.net/assign_delivery/'+ this.state.order_number + '/' + this.state.user_code,{
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
      }).then(response => response.json())
      .then( (response) =>{

      // console.log(response);
      if (response.status == 500) {
        Alert.alert(
          'PídeloTú', 
          'No ha sido posible asignarte la orden.',
          [
            {text: 'Volver al menu', onPress: () => {
              AsyncStorage.removeItem('order');
  
              AsyncStorage.removeItem('active_order');

              this.props.navigation.navigate('Home');
            }}
          ],
          { cancelable: false }
        )
      }else{
        // console.log("initialize", this.state);
        AsyncStorage.setItem('active_order', '1');

        fetch('https://pidelotu.azurewebsites.net/fetch_order/'+ this.state.order_number ,{
          method: 'GET',
          headers: {
            "Content-Type": "application/json"
          }
        }).then(response => response.json())
        .then( (response) =>{
            this.setState({
              order_status: response.order.status
          });
          // console.log(response)
          this.props.navigation.navigate('ActiveOrder',{
            order_number: response.order.id,
          })
    
        })

      }


    })



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
                Pedido Entrante #{this.state.order_number}

                </Text>
                <Text
                  style={{
                    color:'#fff',
                    fontSize: 20,
                    fontFamily: 'Lato-Regular',
                    width: 200,
                    textAlign: 'center',
                    marginTop:50
                  }}>
                  Restaurante: {this.state.restaurant_name}

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
                    Entrega en :
                   {this.state.human_address}
                </Text>
                <TouchableOpacity onPress={this.initializeOrder}>
                  <View style={Style.order_button_accept}>
                    <Text style={Style.button_text}>
                      COMENZAR PEDIDO
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.rejectOrder}>
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
