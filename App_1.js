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
// import {Link} from 'react-router-dom';
import { NavigationBar } from 'navigationbar-react-native';
import { StackNavigator  } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Header from './components/header';
 
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
        source={require('./assets/world.png')}
        style={{resizeMode: 'contain', width: 200, height: 35, alignSelf: 'center' }}
      />
    </View>
  );
};
 

class MultipleRegionComponents extends Component {
  constructor(props){
    super(props);
    this.state={
      deftabs:[
        {
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
        }
      ],
      tabs:[]

    }
  }

  componentDidMount(){
this._retrieveData()
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('countries');
      if (value !== null) {
        // We have data!!
        // if(JSON.parse(value).arr.length===0){
        //     this.props.navigation.push("chooseCountry");
        // }
        // else
        let arr=JSON.parse(value).arr;
        for(var i=0;i<arr.length;i++){
          arr[i]=this.state.deftabs[this.state.deftabs.findIndex(x=>x.slug===arr[i])]
        }
        console.log(arr);
             this.setState({tabs:arr})
        // return value;
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };
 
  render(){
// console.log(this.state.tabs)
    return(
      <View style={{flex:0,backgroundColor: 'white'}}>

      
        <View style={{flexDirection:'row',justifyContent:'center',marginTop:10}}>
          {
            this.state.tabs.map((item,key)=>{
              return <TouchableOpacity  key={key} onPress={()=>this.props.selectCountry(item.slug)}>
                      <Text style={this.props.activeCountry===item.slug?styles.tabActive:styles.tab}>{item.name}</Text>
                    </TouchableOpacity> 
            })
          }
        </View>
      </View>
    )
  }
}



class Cards extends Component{
  constructor(props){
    super(props);
    
  }
  render(){
    // console.log(this.props.articles[0]!==undefined?this.props.articles[0].urlToImage:null)
    return(
      <ScrollView style={{flex:3,flexDirection:'column',marginTop:10,backgroundColor: 'white'}}>
          {
            this.props.articles.map((item,indx)=>{
             
              return <View style={{borderWidth:1,borderColor:'rgb(70, 48, 235)',borderRadius:20,marginLeft:30,marginRight:30,marginBottom:20}} key={indx} >
                <Text style={{color:'black',fontWeight:'600',marginLeft:40,marginRight:40,marginTop:10}} onPress={()=>this.props.onActive(item)}>{item.title}</Text>
            
                <Image source={{uri:item.urlToImage}} onPress={()=>this.props.onActive(item)} style={{width: 250, height: 150,marginLeft:40,marginRight:25}} />
               <Text onPress={()=>this.props.onActive(item)} style={{color:'black',fontWeight:'300',marginLeft:40,marginRight:40,marginTop:10,}}>{item.description}</Text>
                <Text onPress={()=>this.props.onActive(item)} style={{color:'black',fontWeight:'600',marginLeft:50,marginRight:30,marginTop:10,paddingBottom:30}}>{item.source.name}</Text>
              </View>
            })
          }
      </ScrollView>
    )
  }
}


export class Home extends Component {
  constructor(props){
    super(props);
    this.state={
      time:'',
      articles:[],
      isLoading:true,
      activeCountry:'us',
      activeNews:{},
      deftabs:[{
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
      }],tabs:[]
    }
  }

  UNSAFE_componentWillMount(){
    
    this._retrieveData()

    // })
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('countries');
      if (value !== null) {
        // We have data!!
        // if(JSON.parse(value).arr.length===0){
        //     this.props.navigation.push("chooseCountry");
        // }
        // else
        let arr=JSON.parse(value).arr;
        for(var i=0;i<arr.length;i++){
          arr[i]=this.state.deftabs[this.state.deftabs.findIndex(x=>x.slug===arr[i])]
        }
        console.log(arr);
             this.setState({tabs:arr,activeCountry:arr[0].slug});
             this.getCountryNews(arr[0].slug);
        // return value;
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };

  async getCountryNews(name){
    this.setState({isLoading:true,articles:[]})
    // console.log('geee')
    try {
      let response = await fetch(
        'https://newsapi.org/v2/top-headlines?country='+name+'&apiKey=fdbc830564fe49b49fd81a2f8da2daa0',
      );
      let responseJson = await response.json();
      // console.log("dsds",responseJson);
      this.setState({articles:responseJson.articles,isLoading:false});
    } catch (error) {
      console.log("err",error);
    }
  }


  _switchCountry(name){
    this.setState({activeCountry:name})
    this.getCountryNews(name)
  }


  render() {


    return (
      <React.Fragment >
      {this.state.activeNews.title?
      <React.Fragment>
      <View>
        <Text onPress={()=>this.setState({activeNews:{}})}>Back </Text>
      </View>
      <ScrollView style={{marginTop:20}}>
        <Text style={{fontSize:20,marginLeft:20}}>{this.state.activeNews.title}</Text>
        <Image source={{uri:this.state.activeNews.urlToImage}} onPress={()=>this.props.onActive(item)} style={{marginLeft:20,width: 350, height: 250,}} />
        <Text>{this.state.activeNews.content}</Text>
      </ScrollView>
      </React.Fragment>
        
      :<React.Fragment>
      <MultipleRegionComponents activeCountry={this.state.activeCountry} selectCountry={(name)=>this._switchCountry(name)} />
      {
        this.state.isLoading?<ActivityIndicator size="large" color="rgb(70, 48, 235)" style={{flex:2,flexDirection:'column',justifyContent:'center'}} />:
      <Cards onActive={(data)=>this.setState({activeNews:data})} articles={this.state.articles} />}
      </React.Fragment>}
      </React.Fragment>
    );
  }
}

// const Stack = createStackNavigator();
export default class App_1 extends Component {
 
 render(){
   return(
    <>
      <Header /> 
     <Home />
      
 
  </>
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
  tab:{backgroundColor: 'white',borderColor:'rgb(70, 48, 235)',color:'rgb(70, 48, 235)',borderRadius:15,borderWidth:1,padding:10,marginLeft:5,marginRight:5},
  tabActive:{backgroundColor:'rgb(70, 48, 235)',color:'white',borderColor:'white',borderRadius:15,borderWidth:1,padding:10,marginLeft:5,marginRight:5}
});




// const AppNavigator = StackNavigator({
//   Home: {screen:Home},
  
// },

// {initialRouteName:'Home'});

// export default AppNavigator;
