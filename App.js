import { StatusBar } from 'expo-status-bar';
import React from 'react';
import * as Font from 'expo-font';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './Screens/HomeScreen';
import Upcomming from './Screens/Upcomming';
import Cracked from './Screens/Cracked';
import Uncracked from './Screens/Uncracked';
import All from './Screens/All';
import Details from './Screens/Details';
import { Image } from 'react-native';

export default function App() {

  const [loaded] = Font.useFonts({
    Montserrat_Regular: require('./assets/fonts/Montserrat-Regular.ttf'),
    Montserrat_Medium: require('./assets/fonts/Montserrat-Medium.ttf'),
    Montserrat_SemiBold: require('./assets/fonts/Montserrat-SemiBold.ttf'),
    Futura: require('./assets/fonts/Futura_Heavy_font.ttf'),
  });

  if (!loaded) {
    return null;
  }
  
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  bottomTabNavigation = () => {
    return(
      <Tab.Navigator initialRouteName="Home" tabBarOptions={{
        activeBackgroundColor:"#161616",
        inactiveBackgroundColor:"#161616",
        showLabel: false
      }}>
        <Tab.Screen name="Cracked" component={Cracked} options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={require("./assets/bottom-bar-icons/icon3.png")} style={{width:18, height:18}} />
          ),
        }} />
        <Tab.Screen name="Upcomming" component={Upcomming} options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={require("./assets/bottom-bar-icons/icon1.png")} style={{width:18, height:18}} />
          ),
        }} />
        <Tab.Screen name="Home" component={HomeScreen} options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={require("./assets/bottom-bar-icons/icon5.png")} style={{marginTop: -40, backgroundColor: 'rgba(255, 255, 255, 0.1)' , borderRadius:60}} />
          ),
        }} />
        <Tab.Screen name="UnCracked" component={Uncracked} options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={require("./assets/bottom-bar-icons/icon2.png")} style={{width:18, height:18}} />
          ),
        }} />
        <Tab.Screen name="All" component={All} options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={require("./assets/bottom-bar-icons/icon4.png")} style={{width:18, height:18}} />
          ),
        }} />
      </Tab.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={bottomTabNavigation} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
