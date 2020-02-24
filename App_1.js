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
import Header from './components/header';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

 
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
      gestureName: 'none',
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
        
        let arr=JSON.parse(value).arr;
        for(var i=0;i<arr.length;i++){
          arr[i]=this.state.deftabs[this.state.deftabs.findIndex(x=>x.slug===arr[i])]
        }
        // console.log(arr);
             this.setState({tabs:arr})
        // return value;
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };

 
  changeCountry = async () => {
    try {
      let val=await AsyncStorage.setItem('setNtn', "true");
    //   this.props.navigation.push("Home")
    if(val===null){
      this.props.navigation.push('chooseCountry');
    }

    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };
  render(){
    return(
      // <View style={{flex:0,backgroundColor: 'white',paddingBottom:10}}>

      
        <View style={{flex:0,flexDirection:'row',justifyContent:'center',paddingTop:10,paddingBottom:10,backgroundColor: 'white'}}>
          {
            this.state.tabs.map((item,key)=>{
              return <TouchableOpacity  key={key} onLongPress={()=>{this.changeCountry()}} onPress={()=>this.props.selectCountry(item.slug)}>
                      <Text style={this.props.activeCountry===item.slug?styles.tabActive:styles.tab}>{item.name}</Text>
                    </TouchableOpacity> 
            })
          }
        </View>
      // </View>
    )
  }
}



class Cards extends Component{
  constructor(props){
    super(props);
    
  }
  render(){
    return(
      <ScrollView style={{flex:3,flexDirection:'column',paddingTop:5,backgroundColor: 'white'}}>
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
      gestureName:"",
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
    this.onSwipe=this.onSwipe.bind(this);
    this.onSwipeLeft=this.onSwipeLeft.bind(this);
    this.onSwipeRight=this.onSwipeRight.bind(this);
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

  viewDetails= async (data) => {
    let val= await AsyncStorage.setItem('details',JSON.stringify(data));
    if(val===null){
      this.props.navigation.push("newsDetails")
    }
  }


  
  onSwipeLeft(gestureState) {
    let {tabs,activeCountry}=this.state;
    let activeCountryIndx=tabs.findIndex(tab => tab.slug===activeCountry);
    if(activeCountryIndx<tabs.length-1){
      activeCountryIndx++;
    }
    else{
      activeCountryIndx=0;
    }
    console.log(tabs[activeCountryIndx].slug)
    this._switchCountry(tabs[activeCountryIndx].slug);
  }
 
  onSwipeRight(gestureState) {
    let {tabs,activeCountry}=this.state;
    let activeCountryIndx=tabs.findIndex(tab => tab.slug===activeCountry);
    if(activeCountryIndx>0){
      activeCountryIndx--;
    }
    else{
      activeCountryIndx=tabs.length-1;
    }
    console.log(tabs[activeCountryIndx].slug)
    this._switchCountry(tabs[activeCountryIndx].slug);
  }

  onSwipe(gestureName, gestureState) {
    const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    this.setState({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_LEFT:
        this.setState({gestureName: 'blue'});
        break;
      case SWIPE_RIGHT:
        this.setState({gestureName: 'yellow'});
        break;
    }
  }

  render() {


    return (
      // <React.Fragment >
      <GestureRecognizer
        onSwipe={this.onSwipe}
        onSwipeLeft={this.onSwipeLeft}
        onSwipeRight={this.onSwipeRight}
        config={{
          velocityThreshold: 0.3,
          directionalOffsetThreshold: 80
        }}
        style={{
          flex: 1,
          // backgroundColor: 'grey'
        }}
        >

<MultipleRegionComponents navigation={this.props.navigation} activeCountry={this.state.activeCountry} selectCountry={(name)=>this._switchCountry(name)} />
      {
        this.state.isLoading?<ActivityIndicator size="large" color="rgb(70, 48, 235)" style={{flex:2,flexDirection:'column',justifyContent:'center'}} />:
      <Cards onActive={(data)=>{this.viewDetails(data)}} articles={this.state.articles} />}
        </GestureRecognizer>
      
      
      // </React.Fragment>
    );
  }
}

// const Stack = createStackNavigator();
export default class App_1 extends Component {
 
 render(){
   return(
    <>
      <Header /> 
     <Home navigation={this.props.navigation} />
 
  </>
   )
 }
}

const styles=StyleSheet.create({
  container:{
    // borderRadius: 4,
    // height:50,
    backgroundColor: 'white',
    marginTop:25,
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
