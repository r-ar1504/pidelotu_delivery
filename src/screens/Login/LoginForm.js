/*-----------------------------------------------------------------
* Default Components                                              |
*-----------------------------------------------------------------*/
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Button,TouchableOpacity, TouchableWithoutFeedback, TextInput, ImageBackground, View, Text, Image, YellowBox, ActnativeivityIndicator, Alert } from 'react-native';
import { Icon } from 'react-native-elements'

/*-----------------------------------------------------------------
* Form Components                                                 |
*-----------------------------------------------------------------*/
import t from 'tcomb-form-native';
const Form = t.form.Form;

/* Override form stylesheet */
var _ = require('lodash');
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);


const User =  t.struct({
  user_code: t.String,
});//User model for form


const options = {
 stylesheet: stylesheet,
 fields:{
   user_code:{
      template: iconLabelTemplate,
      label:'Codigo de verificación'
   }
 }
}

export default class LoginForm extends Component {
  constructor(props) {
    super(props)

    this.getCode = this.getCode.bind(this);
  }

  getCode(){
    var input_code = this.refs.login.getComponent('user_code').getValue();
    this.props.sendCode(input_code);
    console.log(input_code)
  }

  render(){
    return(
      <View style={Style.container}>
        <Form type={User} options={options} ref="login"/>
          <TouchableOpacity onPress={this.getCode}>
              <View style={Style.button}>
                  <Text style={Style.buttonText}>
                    INGRESAR
                  </Text>
              </View>
          </TouchableOpacity>
      </View>
    );
  }

}

/*-----------------------------------------------------------------
* Custom template override                                        |
*-----------------------------------------------------------------*/
function iconLabelTemplate(locals){
  var containerStyle = {
      marginTop: 90,
      width: 300,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap'
  };
  var labelStyle = {
    paddingTop: 10,
    width: 240,
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Lato-Regular'
  };

  var iconStyle = {
    width: 50,
  }
  var textBoxStyle = {
      borderWidth: 0,
      borderBottomColor: '#fff',
      borderBottomWidth: 1,
      fontSize: 19,
      color: '#fff',
      padding: 20,
      width:300,
      textDecorationLine: 'none'
    };

  return(
    <View style={containerStyle}>
      <Icon name="user" type='feather' color={'#fff'}  size={25} containerStyle={iconStyle}/>
      <Text style={labelStyle}> {locals.label}</Text>
      <TextInput
        style={textBoxStyle}
        underlineColorAndroid='transparent'
        secureTextEntry={true}
        onChangeText={(value) => locals.onChange(value)}
        />
    </View>
  );

}

const Style = StyleSheet.create({
  button:{
    marginTop: 100,
    backgroundColor: '#00CAFF',
    borderWidth: 1,
    borderColor: '#fff',
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText:{
    color: '#fff',
    fontSize: 20
  }
});
