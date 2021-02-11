import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {View, Text, Button, Image ,TextInput, StyleSheet, Alert} from 'react-native';
import Restaurator from './Restaurator'
//
 class HomeScreen extends Component {
      constructor(props) {
   super(props);
   this.state = { email: '' , phone: '' };
   }

  onSubmit()  {

      var clientID;
      if(this.state.email != '' && this.state.phone != '' ){
      if(this.state.phone.length == 9 && this.state.email.includes('@')){
         
        console.log('on submit home-client')
       return fetch('https://thedineapp.herokuapp.com/dineapi/client/', {  
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location: 'Point Empty',
          email: this.state.email,
          phone_number: this.state.phone,
        })
      }).then(response => response.json())
        .then(data => {
          //// to nie działa
          console.log(data)
          clientID = this.state.phone;
          this.props.navigation.navigate('Restaurants', { cli: clientID })
         }).catch(error => {
            this.setState({error: 'Error adding client.'});
            console.error('Error during adding client', error);
        });
      } else{
          Alert.alert('Sure this is a phone number and an e-mail?')
      }

     }
       else{
          Alert.alert('Enter Your phone number and mail.. :)')
       }

    }

  render() {
      return(
            <View style={styles.container}>

            

            <Image style = {styles.img1} source={require('./img/home_dine.jpg')} />

           <Text style = {styles.fontes}> Enter Your Phone number: </Text>

           <TextInput 
               onChangeText={(phone) => this.setState({phone})}
              value={this.state.phone} placeholder =' e.g. 000 555 555' style={styles.input}/>

           <Text style = {styles.fontes2} >Enter Your e-mail: </Text>

           <TextInput 
              onChangeText={(email) => this.setState({email})}
              value={this.state.email} placeholder =' e. g. bestdine@gmail.com' style={styles.input}/>

          <Image style = {styles.img} source={require('./img/burger.jpg')} />

          <Button title="See available Restaurants" color='purple' onPress={() =>{this.onSubmit() }} />

          <Button  title="Log in as Restaurator"  onPress={() => this.props.navigation.navigate('Restaurator')  } />
            </View>
        );
    }

}



const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',

  },
  input: {
  	height: 40,
    borderWidth: 1,
    borderColor: "#777",
    width: 200,
    margin:20,
    marginBottom: 5,
    fontSize: 20,
  },
  img: {
  	width: 350,
    height: 350,
    marginBottom: 5,

  },
  img1: {
    width: 120,
    height: 100,
    marginBottom: 40,

  },
  fontes:{
    fontSize: 18,
    fontWeight: 'bold',

  },
   fontes2:{
    marginTop:20,
    fontSize: 18,
    fontWeight: 'bold',

  }
});



export default HomeScreen;