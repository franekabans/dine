import 'react-native-gesture-handler';
import React, { Component, useState, useLayoutEffect, useEffect,useRoute } from 'react';
import {View, Text, Button,TouchableHighlight, Image, StyleSheet, Alert} from 'react-native';
import PendingScreen,{CurrentScreen} from './Pending'


const ManagementScreen = ({ navigation , route}) => {
    const token = route.params.tok

     LogOut = () => {
       navigation.goBack();
      return fetch('https://thedineapp.herokuapp.com/auth/logout/', {
        method: 'delete',
        headers: {
               Authorization: 'Token ' +token,
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
      })
      .then(response => response.json());  
    }



    const [isLoading, setLoading] = useState(true);
    const [rest, setRest] = useState([]);
    useLayoutEffect(() => {
      fetch('https://thedineapp.herokuapp.com/dineapi/resid/', {
        headers: {
               Authorization: 'Token ' +token,
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
      }).then((response) => response.json())
        .then((results) => setRest(results))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);

    onSubmitPending = () => {
      navigation.navigate('Pending Orders', { res: rest[0].res_id});
    }

    onSubmitCurrent = () => {
      navigation.navigate('Current Orders', { res: rest[0].res_id});

    }
////tutaj są problemy musze zrobic tak zeby najpierw przypisywane bylo resID a potem return dopiero
  return(
    <View>
      <Text style = {styles.header}> Welcome Back to Dine !</Text>
      <TouchableHighlight style={ styles.butt}  >
          <Button color='purple' onPress = {() => this.onSubmitPending()} title="Checkout Pending Orders" />
      </TouchableHighlight>

      <TouchableHighlight  style={ styles.butt}>
          <Button onPress = {() => this.onSubmitCurrent()} color='purple' title="See Current Orders  in Your Restaurant" />
      </TouchableHighlight>
    </View>
    )


}


const styles = StyleSheet.create({
 first: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    fontSize: 19,
    margin: 30,
    paddingBottom: 10
},
dine: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    fontSize: 28,
    color: 'purple',
    marginTop: 10,
},
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 3,
    marginBottom: 130,
    fontSize: 35,
    fontWeight: 'bold',
    color: 'purple'
  },
    butt: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b0aac0',
    borderColor: 'black',
    borderWidth: 3,
    borderColor: 'black',
    bottom: 35,
    margin: 80

  },
});



export default ManagementScreen;
