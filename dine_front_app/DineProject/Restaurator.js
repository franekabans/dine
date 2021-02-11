import 'react-native-gesture-handler';
import React, { Component, UseState, UseEffect } from 'react';
import {View, Text, Button, Image ,TextInput, StyleSheet, Alert} from 'react-native';
import ManagementScreen from './Management';

//
 class RestauratorScreen extends Component {
   constructor(props) {
   super(props);
   this.state = { username: '' , password: '' }
 };

onSubmit = event => {

      var clientID;
      if(this.state.username != '' && this.state.password != '' ){
         
        console.log('logging in Restaurator with Username:'+ this.state.username+ ' and password '+this.state.password)
       return fetch('https://thedineapp.herokuapp.com/auth/', {  
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        })
      }).then(response => response.json())
        .then(data => {
          //this.props.userLogin(data.token);
          console.log(data)
          if(data.token){
          this.props.navigation.navigate('Management',{tok: data.token})
         }else{
          Alert.alert('wrong values provided. If You have forgot Your password Contact our Administrator')
       }
         }).catch(error => {
            this.setState({error: 'Error during logging.'});
            console.error('Error during during logging', error);
        });
          
     }
       else{
          Alert.alert('Enter Your Username and Password.. :)')
       }

    }
  render() {
      return(
            <View style={styles.container}>

            <Image style = {styles.img1} source={require('./img/home_dine.jpg')} />

           <Text style = {styles.fontes}> Enter Your Username: </Text>

           <TextInput autoCapitalize = 'none'
               onChangeText={(username) => this.setState({username})}
              value={this.state.username} placeholder ='username' style={styles.input}/>

           <Text style = {styles.fontes2} >Enter Your Password: </Text>

           <TextInput autoCapitalize = 'none'
              onChangeText={(password) => this.setState({ password})}
              value={this.state.password} secureTextEntry={true} placeholder ='*********' style={styles.input}/>

          <Image style = {styles.img} source={require('./img/burger.jpg')} />

          <Button title="Log In" color='purple' onPress={() => {this.onSubmit() } }   />

          <Button title="Sign Up to Become Our Partner!" onPress={() =>{Alert.alert('To sign up contact us via email: dineoffice@gmail.com or phone call: 511111111') }} />

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

  },orderchecker:{
    position: 'absolute',
    bottom:0,
    left:0,
  },ordercheckerwraper:{
    backgroundColor: '#52B652',
    borderColor: 'black',
    borderWidth: 3,

  }
});



export default RestauratorScreen;