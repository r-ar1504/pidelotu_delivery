/*-----------------------------------------------------------------
* Default Components                                              |
*-----------------------------------------------------------------*/
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { StyleSheet,  ImageBackground, View, Text, Image, YellowBox, ActnativeivityIndicator, Alert, AsyncStorage } from 'react-native';
import { Container} from 'native-base';
import OneSignal from 'react-native-onesignal';

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
    this.checkSession = this.checkSession.bind(this);
    this.sendCode = this.sendCode.bind(this);    
    this.storeUser = this.storeUser.bind(this);    

  }//Constructor End

  componentDidMount(){

    this.checkSession();
  }

  goHome(name){
    this.setState({logged: true},()=>{
      Alert.alert(
        'PídeloTú',
        'Bienvenido ' + name,
        [
          {text: 'Acceder', onPress: () => {
            this.props.navigation.navigate('Home',{name: name, logged: this.state.logged});
            }
          }
        ],
        { cancelable: false }
      )
    });
  }

  checkSession(){
    AsyncStorage.getItem('user').then( (query) =>{
      var user_data = JSON.parse(query);
      if(query != null){
        console.log(user_data)
        fetch('https://pidelotu.azurewebsites.net/check_status/'+ user_data.app_code, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json"
          }
        }).then(response => response.json())
          .then( (response) => {
            console.log(response.logged)
            if (response.logged != 0) {
              OneSignal.init("baedd007-9325-4e3e-83fc-d8be136450bd");
              OneSignal.sendTags({delivery_code: user_data.app_code});//Register tags for specific user.
              this.goHome(user_data.name, {name: user_data.name});
            }
            else{
              console.log("Not Logged");
            }
        });
      }else{
        console.log("No User")
      }
    });

  }

  sendCode(acces_code){
    fetch('https://pidelotu.azurewebsites.net/check_delivery/'+ acces_code,{
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json())
    .then( (response) =>{
      if (response.code != 202) {
        Alert.alert(
          'PídeloTú',
          'No existe un usuario con ese codigo.',
          [
            {text: 'Entendido', onPress: () => {console.log("Entendido")}}
          ],
          { cancelable: false }
        )
      }else{
        this.storeUser(response.delivery_object);
      }
    })
  }

  async storeUser(delivery_man){
    try {
      await AsyncStorage.setItem('user', JSON.stringify(delivery_man));
    } catch (error) {
      console.log(error);
    }
     this.checkSession();
  }

  render(){
		return(
      <Container style={Style.container}>
        <ImageBackground source={ require('src/assets/images/login-background.png')} style={Style.background_image}>
          <Image source={require('src/assets/images/logo.png')} style={Style.logo} />
          <LoginForm goHome={this.goHome} sendCode={this.sendCode}/>
        </ImageBackground>
      </ Container>
    );
	}//Render End
}
