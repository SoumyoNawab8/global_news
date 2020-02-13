import React, { Component } from 'react';
import {View,Text,StyleSheet,TouchableOpacity,AsyncStorage} from 'react-native';
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
              }],
              selectedCntry:[]
        };
    }

    componentDidMount(){
     this._retrieveData()
    //  console.log()
    }

    _saveCountries = async () => {
        try {
          let val=await AsyncStorage.setItem('countries', JSON.stringify({"arr":this.state.selectedCntry}));
        //   this.props.navigation.push("Home")
        if(val===null){
            this.props.navigation.push("Home");
        }
    
        } catch (error) {
          // Error saving data
          console.log(error);
        }
      };
      _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('countries');
          if (value !== null) {
            // We have data!!
            if(JSON.parse(value).arr.length>0){
                this.props.navigation.push("Home");
            }
            else
                 this.setState({selectedCntry:JSON.parse(value).arr})
            // return value;
          }
        } catch (error) {
          // Error retrieving data
          console.log(error);
        }
      };
      selectCountry(country){
        let {selectedCntry}=this.state;
        if(selectedCntry.findIndex(x=>x===country)===-1){
            selectedCntry.push(country);
        }
        else{
            selectedCntry.splice(selectedCntry.findIndex(x=>x===country),1);
        }
        this.setState({selectedCntry});
      }

    render() {
        return (<View style={styles.container}>
            <Animatable.Image animation="slideInDown" source={require('../assets/globe.png')} style={styles.image} />
            <Animatable.Text animation="slideInDown" style={styles.text}>Choose Country</Animatable.Text>

            <Animatable.View animation="fadeIn" style={styles.cardContainer}>
            {this.state.countries.map((itm,key)=><TouchableOpacity style={this.state.selectedCntry.findIndex(x=>x===itm.slug)===-1?styles.card:styles.selectedCard} onPress={()=>this.selectCountry(itm.slug)} key={key}><Text style={{fontWeight:'700'}}>{itm.name}</Text></TouchableOpacity>)}
            </Animatable.View>
            {this.state.selectedCntry.length>0?<TouchableOpacity style={styles.nextBtn} onPress={()=>this._saveCountries()}><Text style={{fontSize:50,fontWeight:'800'}}>></Text></TouchableOpacity>:null}
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
        fontSize:30,paddingBottom:30
    },
    image:{
        width:'100%',
        height:'40%'
    },
    card:{
        backgroundColor: 'lightgrey',
        height:'70%',
        // width:'17%',
        flex:0,
        flexDirection:'row',
        justifyContent:'center',alignItems:'center',
        paddingLeft:'8%',paddingRight:'8%',
        paddingTop:'0%',paddingBottom:'4.5%',
        marginLeft:'1%',marginRight:'1%',marginTop:'1%',marginBottom:'1%',
        borderRadius:20,
    },
    selectedCard:{
        backgroundColor: 'lightblue',
        height:'70%',
        // width:'17%',
        flex:0,
        flexDirection:'row',
        justifyContent:'center',alignItems:'center',
        paddingLeft:'8%',paddingRight:'8%',
        paddingTop:'0%',paddingBottom:'4.5%',
        marginLeft:'1%',marginRight:'1%',marginTop:'1%',marginBottom:'1%',
        borderRadius:20,elevation:5
    },
    cardContainer:{
        flex:0,flexDirection:'row',justifyContent:'center',flexWrap:'wrap',width:'70%',paddingBottom:'10%',height:'20%',
    },
    nextBtn:{backgroundColor:'lightblue',paddingLeft:'6.5%',paddingRight:'6.5%',paddingTop:'0.5%',paddingBottom:'2%',borderRadius:50,position:'absolute',bottom:10,right:10,justifyContent:'center',alignItems:'center',elevation:3}
})