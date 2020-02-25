import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    Text,Image,
    ActivityIndicator,
    View, Alert,
    TouchableOpacity,
    AsyncStorage
  } from 'react-native';
  import moment from 'moment';
  import { NavigationBar } from 'navigationbar-react-native';

  const ComponentLeft = () => {
    return(
      <View style={{ flex: 1, alignItems: 'flex-start',paddingBottom:0}} >
         <TouchableOpacity style={ {justifyContent:'center', flexDirection: 'row'}}>
          
          <Text style={{ color: 'rgb(70, 48, 235)',fontWeight:'bold' }}>{moment().format('MMMM Do YYYY')}</Text>
        </TouchableOpacity>
      </View>
    );
  };
   
  const ComponentCenter = () => {
    return(
      <View style={{ flex: 1,paddingBottom:0 }}>
         <Image
          source={require('../assets/world.png')}
          style={{resizeMode: 'contain', width: 200, height: 35, alignSelf: 'center' }}
        />
      </View>
    );
  };

export default class Header extends Component{
    constructor(props){
        super(props);
        this.state={
         time:'',
        }
        
      }
     
     
      UNSAFE_componentWillMount(){
     
       var self=this;
       setInterval(()=>self.setState({time:moment().format(' h:mm:ss a').toString()}),100)
        
     
     
     }
    render(){
        return (
            <View style={styles.container}>
        <NavigationBar 
          componentLeft     = { () =>  <ComponentLeft />   }
          componentCenter   = { () =>  <ComponentCenter  /> }
          componentRight    = { () =>  <View style={{ flex: 1, alignItems: 'flex-end',paddingBottom:0 }}>
      <TouchableOpacity>
        <Text style={{ color: 'rgb(70, 48, 235)',fontWeight:'bold' }}> {this.state.time} </Text>
      </TouchableOpacity>
    </View>  }
          navigationBarStyle= {{ backgroundColor: 'white',color:'rgb(70, 48, 235)',height:60}}
          statusBarStyle    = {{ barStyle: 'light-content', backgroundColor: 'rgb(70, 48, 235)' }}
        />
        </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
      // borderRadius: 4,
      // height:50,
      backgroundColor: 'white',
      marginTop:30,
      borderBottomWidth: 2,
      borderColor: 'rgb(70, 48, 235)'
      
    },

  });
  