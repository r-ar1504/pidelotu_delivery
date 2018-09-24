/*-----------------------------------------------------------------
* Default Components                                              |
*-----------------------------------------------------------------*/
import React, { Component } from 'react';
import { Icon } from 'react-native-elements'
import { PermissionsAndroid, AsyncStorage, ImageBackground, TouchableWithoutFeedback, View, Text, Image, Alert } from 'react-native';
import { Container, Header, Body, Left, Right, Content, Button } from 'native-base';
import Geolocation from 'react-native-geolocation-service';
import OneSignal from 'react-native-onesignal';
/*-----------------------------------------------------------------
* Style Component                                                 |
*-----------------------------------------------------------------*/
import Style from './HomeStyle';

export default class Home extends Component{
  constructor(props){
    super(props);


    this.state = {
      granted: false
    }
    /*Method binding*/
    this.openDrawer       = this.openDrawer.bind(this);
    this.pushHandler      = this.pushHandler.bind(this);
    this.pushOpened       = this.pushOpened.bind(this);
    this.checkSession     = this.checkSession.bind(this);
    this.updateLocation   = this.updateLocation.bind(this);
    this.grantLocationPermission = this.grantLocationPermission.bind(this);
    this.hasActiveOrder = this.hasActiveOrder.bind(this)
  }//Constructor End

  componentWillMount(){

      this.grantLocationPermission();
      OneSignal.addEventListener('received', this.pushHandler);//If app is open will call this handler.
      OneSignal.addEventListener('opened', this.pushOpened);//If app is closed and user clicks, this handler will be called.

    this.setState({
      name: this.props.navigation.getParam('name')
    })

    this.checkSession();
    
  }//One Signal methods and listeners
  
  async  grantLocationPermission(){
      try{
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            'title': 'PídeloTú Permisos',
            'message': 'Para empezar a recibir pedidos es necesario habilitar el uso de ubicación'
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.setState({
            granted: true
          })
          console.log("Granted");
        } else {
          console.log("Location  permission denied")
        }
      } catch (err) {
        console.warn(err)
      }
  }

  componentDidMount(){
    this.checkSession();
    this.hasActiveOrder();
  }//Component Mounted (DOM)
  
  checkSession(){
    let user = AsyncStorage.getItem('user')
    .then( 
      (query) => {
        let user = JSON.parse(query);
        if (user.logged != 0) {
          this.setState({
            user_code: user.app_code,
            user: user
          })

          this.updateLocation();
        }else{
          this.props.navigation.navigate('LoginStack');
        }
      }
    )

  }//Check if user is already logged in.

  updateLocation(){
    Geolocation.getCurrentPosition( (position) =>{
      console.log(position.coords.latitude)
      this.setState({
        latitude :  position.coords.latitude, 
        longitude:  position.coords.longitude
      });
      console.log(this.state);

      fetch('https://pidelotu.azurewebsites.net/update_location',
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Accept: 'application/json',
        },
        body:JSON.stringify({
          latitude  : this.state.latitude,
          longitude : this.state.longitude,
          id        : this.state.user.id
        })
      }
    ).then(  response   => response.json())
      .then( (response ) => {
        // console.warn(response);
      });
      
    },
    (error) => {
      console.log(error.code, error.message);
    });
    console.log(this.state)
    

  }//Update location after login.

  async hasActiveOrder(){
    AsyncStorage.getItem('active_order').then( (query) =>{
      
      var active_order = JSON.parse(query);
      if (query != null) {
        this.getOrder();

      }else{
        // console.warn("nothing")
      }
    })
  }//Check if user has an active order.

  pushHandler(openResult){
    console.log(openResult.payload.additionalData)
  }//OneSignal notification arrived;

  pushOpened(openResult){
    let dataString = openResult.notification.payload.additionalData;
    
    let restaurant_coordinates =  {
      latitude: parseFloat(dataString.restaurant_coordinates.latitude),
      longitude: parseFloat(dataString.restaurant_coordinates.longitude)
    }
    let user_coordinates =  {
      latitude: parseFloat(dataString.user_coordinates.latitude),
      longitude: parseFloat(dataString.user_coordinates.longitude)
    }
    let id = dataString.id

    order_object = {
      id: id,
      user_name:        dataString.user_name,
      user_lat:         user_coordinates.latitude,
      user_lng:         user_coordinates.longitude,
      res_lat:          restaurant_coordinates.latitude,
      res_lng:          restaurant_coordinates.longitude,
      restaurant_name:  dataString.restaurant_name,
      status:           dataString.status,
      user_code:  this.state.user_code
    }

    AsyncStorage.setItem('order', JSON.stringify(order_object));
  
    AsyncStorage.setItem('active_order', '1');
  
    this.props.navigation.navigate('OrderAlert',  {
      id: id,
      user_name:        dataString.user_name,
      user_lat:         user_coordinates.latitude,
      user_lng:         user_coordinates.longitude,
      res_lat:          restaurant_coordinates.latitude,
      res_lng:          restaurant_coordinates.longitude,
      restaurant_name:  dataString.restaurant_name,
      status:           dataString.status,
      user_code:        this.state.user_code
    }); // Drawer Open

   }//OneSignal notification clicked;

  openDrawer(){
    this.props.navigation.navigate('DrawerOpen'); // Drawer Open
  }//Open SideMenu

  getOrder(){

    fetch('http://pidelotu.azurewebsites.net/fetch_order/' + order.id,{
      headers: {
        "Content-Type": "application/json",
        Accept: 'application/json',
      },
    }).then(  response   => response.json())
    .then( (response ) => {

      console.log(response);

    });

    return ;
    AsyncStorage.getItem('order').then( (active_order) =>{

      let order = JSON.parse(active_order);
      console.log(order);

      Alert.alert(
        'PídeloTú',
        'Tienes un pedido activo',
        [
          {text: 'Continuar', onPress: () => {
            
          }}
        ],
        {cancelable: false}
      )

    });
  }//Reopen active order.

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
                 { this.state.name }
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
