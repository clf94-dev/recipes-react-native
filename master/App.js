import  React, {useState, useEffect} from 'react';
import { View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from 'react-native-ionicons';

import HomeScreen from './screens/HomeScreen'
import FilterScreen from './screens/FilterScreen'
import RecipeScreen from './screens/RecipeScreen'

const Tab =createBottomTabNavigator();
function HomeTabs(){
  return (
    <Tab.Navigator screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) =>{
        let iconName;
        if(route.name==='Home')
        iconName = focused ? 'ios-information-circle': 'ios-information-circle-outline';
      else if(route.name ==='Filter')
          iconName =  'search';
      
      return <Ionicons name={iconName} size={size} color={color}/>
      },
    })}
      tabBarOptions={{
    activeTintColor: 'orange',
    inactiveTintColor: 'white',
    /* showLabel: false,*/
    style: { width: '100%', height:80,backgroundColor: 'gray',borderWidth:1,borderColor: 'gray', marginBottom:0 }
    }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Filter" component={FilterScreen} />


    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function App(){
  return (
  <SafeAreaProvider>
    <NavigationContainer>
{/*       <HomeTabs/> */}
      <Stack.Navigator headerMode='none'>

        <Stack.Screen name='Home' component={HomeTabs}/>
        <Stack.Screen name='Recipe' component={RecipeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  )
}