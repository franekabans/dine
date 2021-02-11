import 'react-native-gesture-handler';
import React, { Component, useState, useLayoutEffect, useEffect,useRoute } from 'react';

import {View, Text, Button,TouchableHighlight, Image ,TextInput, StyleSheet, Alert,SafeAreaView, FlatList} from 'react-native';


const PendingScreen = ({ navigation , route}) => {
	const resID = route.params.res;
    const [flag,changeFlag] = useState(0)

     forceRemount = () =>{
        changeFlag(flag+1)
     }


	const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    useLayoutEffect(() => {
      fetch('https://thedineapp.herokuapp.com/dineapi/restaurants/'+resID+'/orders')
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, [flag]);



return(
	<View key = {this.flag}>
	<SafeAreaView >
    
        <FlatList
            data={data}
            renderItem={({ item }) => (<Button onPress={() => navigation.navigate('SinglePending', {order_id: item.id, foods: item.foods_id, client_id: item.cli_id.toString(),timey: item.order_time.toString(), amount: parseFloat(item.money_amout)})} 
            title = {'Client Phone: '+ item.cli_id.toString() +' --> ' + parseFloat(item.money_amout).toString()+'PLN'}> Press Me </Button> )}
            
            keyExtractor={item => item.id.toString()}
        />
    </SafeAreaView>
    </View>

	)

}


////probably needed button to call single update request
 export class SinglePending extends Component {
    constructor(props) {
   super(props);
   this.state = { approximation: 30};
   }




    onSubmit(orderID){
    ///here we need to transfrom this.state.approximation to time !
    // Simple PaTch request with a JSON body using fetch
    const date1 = new Date(Date.now());
    const date2 = new Date( date1);
    date2.setHours( date2.getHours() + 1);
    
    var hourr = this.state.approximation % 60 ;
    var minutee = this.state.approximation - (hourr*60);
    date2.setMinutes( date1.getMinutes() + minutee);
    date2.setHours( date2.getHours() + hourr);
    
    const timey = date2.toISOString();
    console.log(timey);

    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accepted: 'True',order_aproximate_time: timey, })
    };
    fetch('https://thedineapp.herokuapp.com/dineapi/orders/'+orderID+'/', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ accepted: 'True', }));


    this.props.navigation.goBack();

    }
      

    render(){
        const data = this.props.route.params
        const orderID = data.order_id
        var date1 = new Date(data.timey);
        var newArray = [];
        for (var i = 0; i < data.foods.length; i++){

        newArray.push(data.foods[i].qty+'x '+data.foods[i].name+' - '+data.foods[i].money+'\n');
        }



        return(
        <View style={styles.container}>
        <Text style={styles.txt} > <Text style={styles.second}> Client's Phone number: </Text> {JSON.stringify(data.client_id).replace(/\"/g,'')} </Text>
         <Text style={styles.txt}> Order Time: {JSON.stringify(date1).replace('T',' ').replace(/\"/g,'')} </Text>
         <Text style={styles.txt}> Items ordered:  </Text>
         <FlatList  data={newArray} keyExtractor={item => item} renderItem={({ item }) => (<Text style={styles.tems} > {item} </Text>)}/>


         <Text style={styles.cost}> Customer has to pay You: {JSON.stringify(data.amount)} PLN </Text>
         <Text style={styles.second}> Confirm Estimated Time of prepering order</Text>
         <Text> ( 60 minutes is 1 hour) </Text>
         <Text>(we will send it to Customer)</Text>
         <TextInput style={styles.input} onChangeText={(approximation) => this.setState({approximation})}
              value={this.state.approximation.toString()} placeholder='1 hour = 60 minutes'/>
         <TouchableHighlight style={styles.butt}>
         <Button color ='purple' onPress={() => this.onSubmit(orderID)  }title= 'Confirm'> </Button>
         </TouchableHighlight>
        </View>

        )
      }
}



////////Current orders - accepted by resaturator////////Current orders - accepted by resaturator////////Current orders - accepted by resaturator
////////Current orders - accepted by resaturator////////Current orders - accepted by resaturator////////Current orders - accepted by resaturator
////////Current orders - accepted by resaturator////////Current orders - accepted by resaturator////////Current orders - accepted by resaturator////////Current orders - accepted by resaturator////////Current orders - accepted by resaturator////////Current orders - accepted by resaturator
////////Current orders - accepted by resaturator////////Current orders - accepted by resaturator////////Current orders - accepted by resaturator
////////Current orders - accepted by resaturator////////Current orders - accepted by resaturator////////Current orders - accepted by resaturator////////Current orders - accepted by resaturator////////Current orders - accepted by resaturator////////Current orders - accepted by resaturator
////////Current orders - accepted by resaturator////////Current orders - accepted by resaturator////////Current orders - accepted by resaturator

export const CurrentScreen = ({ navigation , route}) => {
    const resID = route.params.res;
    const [flag,changeFlag] = useState(0)

     forceRemount = () =>{
        changeFlag(flag+1)
     }




    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    useEffect(() => {
      fetch('https://thedineapp.herokuapp.com/dineapi/restaurants/'+resID+'/currentorders')
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, [flag]);



return(


    <View key = {this.flag}>
    <SafeAreaView >
        <FlatList
            data={data}
            renderItem={({ item }) => (<Button onPress={() => navigation.navigate('SingleCurrent', {order_id: item.id, foods: item.foods_id, client_id: item.cli_id.toString(), amount: parseFloat(item.money_amout)})} 
            title = {'Client Phone: '+ item.cli_id.toString() +' --> ' + parseFloat(item.money_amout).toString()+'PLN'}> Press Me </Button> )}
            
            keyExtractor={item => item.id.toString()}
        />
    </SafeAreaView>
    </View>

    )




}



////probably needed button to call single delete request
 export class SingleCurrent extends Component {
        constructor(props) {
        super(props);
      }

/////down below delete request probably after custorem recieved his order
    onSubmit(orderID){

  fetch('https://thedineapp.herokuapp.com/dineapi/currentorders/' + orderID, {
  method: 'DELETE',
  })

        this.props.navigation.goBack();

      }



      render(){
        const data = this.props.route.params
        const orderID = data.order_id
        var newArray = [];
        for (var i = 0; i < data.foods.length; i++){

        newArray.push(data.foods[i].qty+'x '+data.foods[i].name+' - '+data.foods[i].money+'\n');
        }

        return(
        <View style={styles.container}>
        <Text style={styles.second}> Hereby is a single current order !</Text>
        <Text style={styles.txt} > <Text style={styles.second}> Client's phone number: </Text> {JSON.stringify(data.client_id).replace(/\"/g,'')}  </Text>
        <Text style={styles.second}> Items Ordered by the client: </Text>
        <FlatList  data={newArray} keyExtractor={item => item} renderItem={({ item }) => (<Text style={styles.tems} > {item} </Text>)}/>
         <Text style={styles.cost }> Customer has to pay You: {JSON.stringify(data.amount)} PLN </Text>
         <TouchableHighlight style={styles.butt}>
         <Button color ='purple' onPress={() => this.onSubmit(orderID)  }title= 'Order is Done already'> </Button>
         </TouchableHighlight>

        </View>
        )
      }
}


const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fefbd8',
    alignItems: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#777",
    width: 220,
    marginBottom: 50,
    fontSize: 21,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  txt:{
    fontSize: 21,
    textAlign: 'center',
    color: 'purple',
    margin: 10,
  },butt:{
    fontSize: 21,
    borderWidth: 2,
    backgroundColor: '#EFC050',
    marginBottom: 70,
  },
  second:{
    fontSize: 22,
    paddingTop: 50,
    color: 'black',
    marginBottom: 10,

  },cost:{
    fontSize: 22,
    color: 'green',
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#777",
    backgroundColor: '#eea29a',
    marginBottom:20,
  },tems:{
    fontSize: 19,
    color: 'blue',

  },
});



export default PendingScreen;

