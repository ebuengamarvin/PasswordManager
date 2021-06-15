import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import {ThemeProvider} from 'react-native-elements';
import CreateScreen from './src/screens/CreateScreen/CreateScreen';
import Router from './src/router';
import {navigationRef} from './src/components/App/RootNavigation';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer ref={navigationRef}>
        <Router />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
