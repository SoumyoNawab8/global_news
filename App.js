import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,Image,
  ActivityIndicator,
  View, Alert,
  TouchableOpacity,
} from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Home} from './App_1';
import ChoseCountry from './screens/chooseCountry';

export default createAppContainer(
	createStackNavigator({
        Home:Home,
        chooseCountry:ChoseCountry
		
	},{
        initialRouteName:'chooseCountry',
    	headerMode: 'none',
    })
);