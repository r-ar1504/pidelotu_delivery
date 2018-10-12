/*-----------------------------------------------------------------
* Default Components                                              |
*-----------------------------------------------------------------*/
import React, { Component } from 'react';
import {ActivityIndicator, StyleSheet, AsyncStorage, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableOpacity, View, Text, Image, YellowBox, ActnativeivityIndicator, Alert } from 'react-native';
import { Container, Header, Body,Footer, Left, Right, Content, Button } from 'native-base';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Marker } from 'react-native-maps';
import ActiveFooter from 'src/components/ActiveFooter';
import Geolocation from 'react-native-geolocation-service';

/*-----------------------------------------------------------------
* Style Component                                                 |
*-----------------------------------------------------------------*/
import Styles from './ActiveOrderStyle';

var height = Dimensions.get('window').height
var width  = Dimensions.get('window').width;
const LATITUD_DELTA = 0.0922/3;
const LONGITUDE_DELTA = 0.0922/3;


export default class ActiveOrder extends Component{
  constructor(props){
    super(props);

    this.state = ({
      order_number:  this.props.navigation.getParam("order_number")
    })
    console.log(this.state);

    this.fetchData();

    console.log(this.state);
    /*Method binding*/
    this.changeStatus = this.changeStatus.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.trackLocation = this.trackLocation.bind(this);

  }//Constructor End  

  // componentWillMount(){
  // }
  
  changeStatus(){
    switch (this.state.order_status) {
      case 2:
        this.setState({
          order_status: this.state.order_status + 1,
          next_coordinates: this.state  .user_coordinates
        });// Change destination and draw route.
        fetch('https://pidelotu.azurewebsites.net/notify_restaurant/'+ this.state.order_number,{
          method: 'GET',
          headers: {
            "Content-Type": "application/json"
          }
        }).then(response => response.json())
        .then( (response) =>{
          console.log(response);
        })
        break;
      case 3:
        this.setState({
          order_status: this.state.order_status + 1,
          next_coordinates: this.state.user_coordinates
        });// Notify user.
        fetch('https://pidelotu.azurewebsites.net/notify_client/'+ this.state.order_number,{
          method: 'GET',
          headers: {
            "Content-Type": "application/json"
          }
        }).then(response => response.json())
        .then( (response) =>{
          console.log(response);
        })
        break;
      case 4:
        this.setState({
          order_status: this.state.order_status + 1
        });// End order and return another screen.
        break;
      case 5:

        AsyncStorage.removeItem('active_order');
        this.props.navigation.navigate('Home');
        break;
    }

    fetch('https://pidelotu.azurewebsites.net/update_delivery/'+ this.state.order_number,{
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json())
    .then( (response) =>{
      if (response.code != 202) {

      }else{
        console.log("end")
      }
    })
  }

  renderMap(){
    if( this.state.loading != false ){
      return(
         <View style={{height: '100%', backgroundColor: '#132A43', justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#fff" />
         </View>
      )
    }else{
      return(
        <View style={{height: '100%'}}>
          <MapView  style={styles.map} customMapStyle={mapStyle} zoomEnabled = {true} 
            initialRegion={{
              latitude:this.state.delivery_coordinates.latitude,
              longitude: this.state.delivery_coordinates.longitude,
              latitudeDelta: LATITUD_DELTA,
              longitudeDelta: LONGITUDE_DELTA
            }}
          >
            <MapView.Marker 
             coordinate={this.state.delivery_coordinates} 
              image={require('src/assets/images/current.png')}
              title={'Tu posición Actual'}
            />
            <MapView.Marker 
              coordinate={this.state.next_coordinates} 
              image={require('src/assets/images/food_pickup.png')}
              title={'Destino'}
            />   
            
             <MapViewDirections
              apikey={'AIzaSyBY3nmoAufv_W5oIuvQMimP4mpxSaJH_BI'}
              origin={this.state.delivery_coordinates}
              destination={this.state.next_coordinates}
              strokeWidth={2}
              strokeColor={'blue'}>
            </MapViewDirections>   
  
          </MapView>     
          <View position={'absolute'} zIndex={999} bottom={0} style={{width: width, flexDirection: 'row', flexWrap: 'nowrap'}}>
              
              <View style={Styles.bottomSection}>
               <ActiveFooter order={this.state}/>
              </View>
              
              <View style={Styles.bottomSection}>
               <OrderButton status={this.state.order_status} statusChange={this.changeStatus} />
              </View>  
                   
          </View> 
        </View>
      )
    }
  }

  fetchData(){
    fetch('http://pidelotu.azurewebsites.net/fetch_order/'+this.state.order_number,{
      headers: {
        "Content-Type": "application/json",
        Accept: 'application/json',
      },
    }).then(  response   => response.json())
    .then( (response ) => {

        this.setState({
          restaurant_coordinates:{
            latitude: parseFloat(response.restaurant.latitude),
            longitude: parseFloat(response.restaurant.longitude),
          },
          user_coordinates:{
            latitude: parseFloat(response.order.latitude),
            longitude: parseFloat(response.order.longitude),
            latitudeDelta: 0.0142,
            longitudeDelta: 0.0011
          },
          region:{
           latitude: parseFloat(response.restaurant.latitude),
           longitude: parseFloat(response.restaurant.longitude),
          },
          restaurant_name: response.restaurant.name,
          order_status:response.order.status,
          order_number: response.order.id,
          user_name: response.user.name,
        })

        if(response.order.status < 3){
          this.setState({
            next_coordinates:{
              latitude: parseFloat(response.restaurant.latitude),
              longitude: parseFloat(response.restaurant.longitude),
            },
          })
        }else{
          this.setState({
            next_coordinates:{
              latitude: parseFloat(response.order.latitude),
              longitude: parseFloat(response.order.longitude),
            },
          })
        }

        this.trackLocation()
    });
  }

  trackLocation(){
    Geolocation.watchPosition( (position) => {
      this.setState({
        delivery_coordinates:{
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        region:{
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        loading: false
      });

      fetch('https://pidelotu.azurewebsites.net/update_location_active',{
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Accept: 'application/json',
        },
        body:JSON.stringify({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          id : this.state.id
        })
      }
    ).then(  response   => response.json())
      .then( (response ) => {
      });

      console.log(this.state);
    },
    (error) => {
      console.warn(error);
    },
    {
      maximumAge: 2000,
      timeout: 3000
    });//End of watchPosition.


  }

  componentDidMount(){
  }//End of componentDidMount.
  
  render(){
    return(
      <View style={{height: '100%'}}>
        {this.renderMap()}
      </View>
    )
  }
}

/*-----------------------------------------------------------------
* Button Components                                               |
*-----------------------------------------------------------------*/

class OrderButton extends Component{
  constructor(props){
    super(props);

  }//Constructor end

  render(){
      switch (this.props.status) {
        case 2:
          return(
            <TouchableOpacity onPress={this.props.statusChange}>
              <View style={Styles.order_button_accept}>
                <Text style={Styles.button_text}>
                  Notificar Restaurante
                </Text>
              </View>
            </TouchableOpacity>
          );
        case 3:
        return(
          <TouchableOpacity onPress={this.props.statusChange}>
            <View style={Styles.order_button_accept}>
              <Text style={Styles.button_text}>
                Notificar Cliente
              </Text>
            </View >
          </TouchableOpacity>
        );
        case 4:
        return(
          <TouchableOpacity onPress={this.props.statusChange}>
            <View style={Styles.order_button_accept}>
              <Text style={Styles.button_text}>
                Finalizar Pedido
              </Text>
            </View>
          </TouchableOpacity>
        );
        case 5:
        return(
          <TouchableOpacity onPress={this.props.statusChange}>
            <View style={Styles.order_button_accept}>
              <Text style={Styles.button_text}>
                Terminar 
              </Text>
            </View>
          </TouchableOpacity>
        );

    }
  }
}
const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex:5
  },
  overlay:{
    flex:1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 1.3)'
  }
});

const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1d2c4d"
      }]

  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#334e87"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#304a7d"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c6675"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#255763"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#b0d5ce"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0e1626"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }
]
