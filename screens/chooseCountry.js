import React, { Component } from 'react';
import {View,Text,StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';


export default class ChoseCountry extends Component {
    constructor(props) {
        super(props);
        this.state={
            countries:[{
                name:'USA',
                slug:'us'
              },
              {
                name:'INDIA',
                slug:'in'
              },
              {
                name:'FRANCE',
                slug:'fr'
              },
              {
                name:'CANADA',
                slug:'ca'
              },
              {
                name:'RUSSIA',
                slug:'ru'
              }]
        };
    }

    render() {
        return (<View style={styles.container}>
            <Animatable.Image animation="slideInDown" source={require('../assets/globe.png')} style={styles.image} />
            <Animatable.Text animation="slideInDown" style={styles.text}>Choose Country</Animatable.Text>

            <View style={{flex:2,flexDirection:'row',justifyContent:'center'}}>
        {this.state.countries.map((itm,key)=><Text style={styles.card} key={key}>{itm.name}</Text>)}
            </View>
        </View>)
    }
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'white'
    },
    text:{
        fontSize:30
    },
    image:{
        width:'100%',
        height:'40%'
    },
    card:{
        backgroundColor: 'whitesmoke',
        height:'10%',
        width:'17%',
        flex:0,
        flexDirection:'row',
        justifyContent:'center',alignItems:'center'
    }
})