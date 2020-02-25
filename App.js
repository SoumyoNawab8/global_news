import React, { Component } from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import App_1 from './App_1';
import ChoseCountry from './screens/chooseCountry';
import NewsDetails from './screens/newsDetails';

export default createAppContainer(
	createStackNavigator({
        Home:App_1,
        chooseCountry:ChoseCountry,
        newsDetails:NewsDetails
		
	},{
        initialRouteName:'chooseCountry',
    	headerMode: 'none',
    })
);