import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import moment from 'moment';

export default class OrderItems extends Component {
  constructor(props){
    super(props)

    this.renderItems = this.renderItems.bind(this);
  }

  renderItems(){
    return(
      this.props.data.map( (data) => {
        let date =  moment(data.date).format('DD-MM-YYYY hh:mm a');
        return(
          <View style={{width: '100%', flexDirection: 'row', marginTop:25, marginBottom:25}} key={data.id}>
            
            <View style={{width: '70%', flexDirection: 'column'}}>
             <Text  style={{color: '#ACACAC', fontSize:17}}>
               Orden No.{data.id}
             </Text>
             <Text  style={{color: '#ACACAC', fontSize:20}}>
              {date}   
             </Text>
             <Text  style={{color: '#F1F1F1', fontSize:20}}>
               {data.restaurant}
             </Text>
            </View>
            
            <View style={{padding: 10, width: '20%', justifyContent: 'center', alignItems: 'center'}}>
             <Text style={{color: '#fff', fontSize: 25}}>
               ${data.delivery_price}
             </Text>
            </View>
          </View>
        )
      })
    )
  }
  render() {
    return (
      <View style={Style.container}>
        {this.renderItems()}
      </View>
    )
  }
}


export const Style = StyleSheet.create({
  contrainer:{
    width: '100%'
  }
});