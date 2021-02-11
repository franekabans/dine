import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { Component , useState, useEffect,useRoute } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button,Alert, FlatList,TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen  from './Home';
import RestauratorScreen from './Restaurator'
import {Bucket} from './Bucket'
import Cart from './Cart';
import OrderScreen,{OrderedScreen} from './Order';
import ManagementScreen from './Management';
import PendingScreen,{CurrentScreen,SinglePending,SingleCurrent} from './Pending'

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" options={{ headerTintColor: '#fff' }} component={HomeScreen}/>
          <Stack.Screen name="Restaurants" component={RestaurantsScreen}/>
         
          <Stack.Screen name="Categories" component={CategoriesScreen}/>
          <Stack.Screen name="Food" component={FoodScreen}
          options={{
          headerRight: () => (
            <Button
              onPress={() => this.GoToOrder()}
              title="Make the Order   "
              color="green"
            />
          ),
        }}
        />
        <Stack.Screen name="Order" component={OrderScreen}/>
        <Stack.Screen name="Ordered" options={{headerLeft: null}} component={OrderedScreen}/>
        <Stack.Screen name="Pending Orders" component={PendingScreen}
        options={{
          headerTintColor: 'purple',
          headerRight: () => (
            <TouchableHighlight style={styles.refresh}>
            <Button
              onPress={() => this.forceRemount()}
              title="Refresh  "
              color="green"
            />
            </TouchableHighlight>
          ),
        }}
        />
        <Stack.Screen name="Current Orders" component={CurrentScreen}
        options={{
          headerTintColor: 'purple',
          headerRight: () => (
            <TouchableHighlight style={styles.refresh}>
            <Button
              onPress={() => this.forceRemount()}
              title="Refresh  "
              color="green"
            />
            </TouchableHighlight>
          ),
        }}
        />
        <Stack.Screen name="SinglePending" options={{ headerTintColor: 'purple' }} component={SinglePending}/>
        <Stack.Screen name="SingleCurrent" options={{ headerTintColor: 'purple' }} component={SingleCurrent}/>
        <Stack.Screen name="Restaurator" options={{ title: 'Restaurant Management Mode', headerTintColor: 'purple', }} component={RestauratorScreen}/>
        <Stack.Screen name="Management"  component={ManagementScreen}
        options={{
          headerTintColor: '#fff',
          headerLeft: null,
          headerRight: () => (
            <Button
              onPress={() => this.LogOut()}
              title="Log Out "
              color="green"
            />
          ),
        }}
        />
        
        </Stack.Navigator>
      </NavigationContainer>
  );
}
/////////////////////////////////////////////////////////////////////////restauracje//

const RestaurantsScreen = ({ navigation , route}) => {

    const clitest = encodeURIComponent(route.params.cli);
   
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    useEffect(() => {
      fetch('https://thedineapp.herokuapp.com/dineapi/restaurants/')
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);
   return (
    <SafeAreaView>
        <FlatList
            data={data}
            renderItem={({ item }) => (<Button onPress={() => navigation.navigate('Categories', { cat: item.id.toString(),cli: clitest, resnamie: item.name.toString() } )} 
            title = {item.name.toString()+' - ' + item.address_line1.toString() }> Press Me </Button> )}
            
            keyExtractor={item => item.id.toString()}
        />
    </SafeAreaView>
)

}

/////////////////////////////////////////////////////////////////////////Categorie///
const CategoriesScreen = ({navigation, route}) => {

    const ressnamie = route.params.resnamie.toString();
    const test = encodeURIComponent(route.params.cat);
    const clitest = encodeURIComponent(route.params.cli);

    let cart = Cart.getInstance();
    cart.setUserID(clitest);
    cart.setResID(test);
    cart.setResName(ressnamie);

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    useEffect(() => {
      fetch('https://thedineapp.herokuapp.com/dineapi/restaurants/'+test+'/categories/')
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);
   return (
    <SafeAreaView>
        <FlatList
            data={data}
            renderItem={({ item }) => (<Button onPress={() => navigation.navigate('Food', { cat: test, cat2: item.id.toString(),cli: clitest } )} 
            title = {item.category.toString()}> Press Me </Button> )}
            
            keyExtractor={item => item.id.toString()}
        />
    </SafeAreaView>
)

}

/////////////////////////////////////////////////////////////////////////Jedzenie////

const FoodScreen = ({navigation, route}) => {

    let cartie = Cart.getInstance();
    
    let popupRef = React.createRef()

    const onShowPopup = () => {
      popupRef.show()
    }

    const onClosePopup = () => {
      popupRef.close()
    }

    GoToOrder = () =>{
      if (cartie.isCartEmpty()){
        Alert.alert('First Order Something !')
      }else{
        navigation.navigate('Order')
      }
    }

    const test = encodeURIComponent(route.params.cat);
    const test2 =  encodeURIComponent(route.params.cat2);
    const clitest = encodeURIComponent(route.params.cli);


    handleClick = (foodie,restie,clie,namie,money) => {
    console.log('Click happened with client: '+clie+' food:'+foodie+',restaurant: '+restie);
    let sth = cartie.getUserID()
    console.log('Koszyk klienta: '+sth+' w restauracji: '+cartie.getResID())
    const sthelse = {id: foodie, name: namie, money: money, qty: 1}
    cartie.addToCart(sthelse);
    console.log(cartie.printCart().toString())
    }

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    useEffect(() => {
      fetch('https://thedineapp.herokuapp.com/dineapi/restaurants/'+test+'/categories/'+test2+'/food/')
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);

   return (
    <SafeAreaView style ={{ flex:1, marginBottom: 20 }}>
        <FlatList
            data={data}
            renderItem={({ item }) => (<TouchableHighlight 
                style ={{
                    height: 40,
                    width:250,
                    borderRadius:10,
                    backgroundColor : "purple",
                    marginLeft :90,
                    marginRight:100,
                    marginTop :20
                }}>
            <Button title = {item.name.toString() +' - ' +item.money_value.toString()+ ' PLN'} color="#DCB836" onPress={() => this.handleClick(item.id,test,clitest,item.name.toString(),item.money_value)} > Press Me </Button>
            </TouchableHighlight>
             )}
            
            keyExtractor={item => item.id.toString()}
        />

        <TouchableHighlight style={styles.ordercheckerwraper}>
          <Button onPress ={onShowPopup} color='yellow' title="Read Before You Order" style={styles.orderchecker}>
          </Button>
        </TouchableHighlight>

        <Bucket 
          title = 'Before You Order'
          ref={(target) => popupRef = target}
          onTouchOutside = {onClosePopup}
        />

    </SafeAreaView>


);



}






const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },orderchecker:{
    position: 'absolute',
    bottom:0,
    left:0,
  },ordercheckerwraper:{
    backgroundColor: '#52B652',
    borderColor: 'black',
    borderWidth: 3,

  },refresh:{
    backgroundColor: '#F7CAC9',
    borderColor: 'black',
    borderWidth: 1,
  }

});
