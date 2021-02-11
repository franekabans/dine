import React, { Component , useState, useEffect,useRoute } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button,Alert, FlatList,ActivityIndicator,TouchableHighlight } from 'react-native';
import Cart from './Cart'




 class OrderScreen extends Component {
      constructor(props) {
   super(props);
   const cart = Cart.getInstance();
   this.state = { 
   	restaurantName: cart.getResName(),
   	restaurantID: cart.getResID() ,
   	clientID: cart.getUserID(),
   	foodIDs: cart.getCart() };
   }

    getTotalMoneyValue(){
      let payment = 0.00
      for (var i=0; i < this.state.foodIDs.length; i++) {
        payment = parseFloat(payment) + parseFloat(this.state.foodIDs[i].money*this.state.foodIDs[i].qty)
            
       }
      return payment;
    }

   handleDelete(item) {
    if(item.qty >1 ){
      item.qty = item.qty-1;
      this.setState({foodIDs: this.state.foodIDs});
    }else{
      const cart = Cart.getInstance();
      cart.clearCartItemID(item.id);
      this.setState({foodIDs: cart.getCart()})

    }
  }

///down below : wrong values: foods_id !!!
     handleOrder(){

      if(this.state.foodIDs.length > 0){
        const total_amount = this.getTotalMoneyValue().toFixed(2).toString();
        //const food_obj = JSON.parse(this.state.foodIDs);
        var ti = new Date(Date.now())
        ti.setHours( ti.getHours() + 1 );
        ti = ti.toISOString();
        console.log(this.getTotalMoneyValue().toFixed(2));
        console.log('on submit order!')
       return fetch('https://thedineapp.herokuapp.com/dineapi/orders/', {  
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          foods_id: this.state.foodIDs,
          payment: true,
          take_away: true,
          money_amout: total_amount,
          order_time: ti,
          order_aproximate_time: ti,
          accepted: false,
          cli_id: this.state.clientID,
          res_id: this.state.restaurantID,
        })
      }).then(response => response.json())
        .then(data => {

          this.props.navigation.navigate('Ordered',{res: this.state.restaurantID, cli: this.state.clientID })
         }).catch(error => {
            this.setState({error: 'Error adding order.'});
            console.error('Error during adding order', error);
        });
      }else{
        Alert.alert('first order something')
      }
    }


     render() {
      return(

      	<SafeAreaView style={{flex: 1, backgroundColor: '#ffffcc', alignItems:'center'}}>
      	  <Text style = {styles.header}> This is Your Dine Order </Text>
      	  <Text style = {styles.singledelete}> in Restaurant: {this.state.restaurantName} </Text>
      	  <Text style = {styles.info}> ((Tap single item to delete it))</Text>
         
      	<FlatList style={{flex:1,backgroundColor: '#ccccff',marginBottom:90,width:400}}
            data={this.state.foodIDs}
            renderItem={({ item }) => (<Button onPress={() => this.handleDelete(item)} title={item.qty.toString() +'x '+' ' +
            item.name.toString() +'  '+ item.money.toString()+'PLN'} >  </Button> )}
            keyExtractor={(item, index) => item.id.toString()}
        />

          <Text style = {styles.payment} > You have to Pay {this.state.restaurantName.toString()}: {parseFloat(this.getTotalMoneyValue().toString()).toFixed(2)} PLN </Text>

           <TouchableHighlight style={styles.butt}>
          <Button  onPress={() => this.handleOrder()} color='black' title="Place Your Order and Pick it Up" style={styles.orderchecker}>
          </Button>
       	 </TouchableHighlight>

       	 </SafeAreaView>
        );
    }

 }



 export class OrderedScreen extends Component {
        constructor(props) {
        super(props);

      }
      state = {
       //curTime: null,
       something: false,
       time: Date.now(),
       somethingelse: '',
      }

    prettyDate2(time){
        var date = new Date(parseInt(time));
        var localeSpecificTime = date.toLocaleTimeString();
        return localeSpecificTime.replace(/:\d+ /, ' ');
    }


      fetchOrder(resID,cliID){
      if(this.state.something === false || this.state.something === undefined){
        try {  
        fetch('https://thedineapp.herokuapp.com/dineapi/currentclient/?res_id='+resID+'&cli_id='+cliID)
        .then((response) => response.json()).then(somedata => {
          if(somedata.length > 0) {
            this.setState({something: somedata[0].accepted});
            console.log({somedata});
            this.setState({somethingelse: somedata[0].order_aproximate_time})
          }
        })
        .catch((error) => console.error(error));
        console.log(this.state.something)
        }catch(err) {
            console.log("Error fetching data-----------", err)
        }
        
        }else{
          Alert.alert('Your Order is ready already!')
        }
    }

      componentDidMount() {
        const data = this.props.route.params
        const resID = data.res
        const cliID = data.cli
        setInterval(() => { if(this.state.something === false || this.state.something === undefined){ this.fetchOrder(resID,cliID)}} , 15000)
        
      }
      
      getContentElement = () => {
        if(this.state.something === false || this.state.something === undefined){
          return <Text style = {styles.header}> Order Pending... waiting for restaurant to accept it . Do not close the app now !</Text>;
        }else{

          return <Text style = {styles.header2}> Your Order is waiting for You to pick it up at selected restaurant by the time:  {this.state.somethingelse.replace('T','  ').split(".")[0]} </Text>;
          
        }

      };

      goHome(){
        if(this.state.something === false || this.state.something === undefined){
          Alert.alert('Now You have to wait for the acceptance of Your order.\n Do not close the App!')
        }else{
          this.props.navigation.navigate('Home')
        }
      }
    



      render(){
        const data = this.props.route.params
        const resID = data.res
        const cliID = data.cli
        const contentElement = this.getContentElement();

      return(
        <View>
        {contentElement}
        <Button title='Go Home!' onPress={() => this.goHome()}> </Button>
        </View>
        )
      }

}








const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 3,

    fontSize: 35,
    fontWeight: 'bold',
    color: 'purple'
  },
  header2: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 3,

    fontSize: 35,
    fontWeight: 'bold',
    color: 'green'
  },
  butt: {
  	alignItems: 'center',
    justifyContent: 'center',
  	backgroundColor: '#b0aac0',
    borderColor: 'black',
    borderWidth: 3,
  	borderColor: 'black',
  	position: 'absolute',
  	bottom: 35,

  },
   singledelete: {
   	fontSize: 30,
    fontWeight: 'bold',
    color: 'black'
 

  },
  info:{
  	fontSize: 14,
    color: 'red'
  },
  payment:{
    textDecorationLine: "underline",
    marginBottom: 90,
    position: 'absolute',
    fontSize: 14,
    fontWeight: 'bold',
    alignItems: 'center',
    bottom:0,
    color:'purple'
  }


});

 export default OrderScreen;