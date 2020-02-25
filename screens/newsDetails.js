import React, { Component } from 'react'
// import {} from 'react-native';
import {View,Text,AsyncStorage,StyleSheet,ScrollView,Image} from 'react-native';
import Header from '../components/header';

export default class NewsDetails extends Component {
    constructor(props){
        super(props);
        this.state={
            activeNews:{}
        }
    }
componentDidMount(){
    this._retrieveData();
}
    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('details');
          if (value !== null) {
            // We have data!!
            
                 this.setState({activeNews:JSON.parse(value)})
            // return value;
          }
        } catch (error) {
          // Error retrieving data
          console.log(error);
        }
      };
    render() {
        let content =this.state.activeNews.content;
        if(content && content.length>0){
            let temp=content.split("");
            content = content.substring(temp.findIndex(x=>x==='['),12);
        }
        return (
            <React.Fragment>
            <Header />
            <ScrollView style={{marginTop:20}}>
              <Text style={{fontSize:20,marginLeft:20}}>{this.state.activeNews.title}</Text>
              <Image source={{uri:this.state.activeNews.urlToImage}} onPress={()=>this.props.onActive(item)} style={{marginLeft:20,width: 350, height: 250,}} />
              <View style={{justifyContent: 'center',alignItems: 'center',alignSelf: 'center',width:'90%',marginTop:20}}>
               <>
               <Text style={{fontSize:17,fontWeight:'900'}}>{this.state.activeNews.description}</Text>
                <Text style={{fontSize:17,fontWeight:'900'}}>{content}</Text>
               </>
              </View>
            </ScrollView>
            </React.Fragment>
              
        )
    }
}
