import React, { Component } from 'react';
import {Modal, Dimensions,View,Text, Button,TouchableWithoutFeedback} from 'react-native';


const deviceHeight = Dimensions.get("window").height
export class Bucket extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        show: false
      }
    }

    show = () => {
      this.setState({show: true})
    }

    close = () => {
      this.setState({show: false})
    }

    renderOutsideTouchable(onTouch){
      const view = <View style={{flex:1,width: '100%'}}/>
      if(!onTouch) return view

      return(
        <TouchableWithoutFeedback onPress={onTouch} style={{flex:1, width: '100%'}}>
          {view}
        </TouchableWithoutFeedback>

      )
    }
    render(){
      let {show} =  this.state
      const {onTouchOutside, title} = this.props

      return(
        <Modal
          animationType={'fade'}
          transparent = {true}
          visible ={show}
          onRequestClose={this.close}>

          <View style={{ flex:1 ,
                         backgroundColor:'#000000AA',
                         justifyContent:'flex-end'}}
            >
              {this.renderOutsideTouchable(onTouchOutside)}

              <View style = {{backgroundColor:'#FFFFFF',width: '100%',
              borderTopRightRadius: 10, borderTopLeftRadius: 10,paddingHorizotal: 10,
              maxHeight:deviceHeight * 0.45
              }}>
              <View>
                <Text style={{color:'purple',fontSize:20,fontWeight:'500',margin:15}}>
                  {title}
                </Text>
               <Text style={{fontSize: 30,marginBottom: 30}}>You should know that, Dine is a Food Ordering App without delivery, which means You have to pick up the order by Yourself at the certain restaurant You've just choosen. Enjoy your meal !</Text>
              </View>


              </View>
          </View>

          </Modal>


        )
    }


}
