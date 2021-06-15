import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import CreateScreen from '../screens/CreateScreen/CreateScreen';
import FoundationIcons from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

const HomeRoutes = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Home') {
            return <FoundationIcons name="home" size={size} color={color} />;
          }
          if (route.name === 'Create') {
            return <MaterialIcons name="create" size={size} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: '#000',
        inactiveTintColor: 'gray',
        showLabel: false,
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Create" component={CreateScreen} />
    </Tab.Navigator>
  );
};

export default HomeRoutes;

const styles = StyleSheet.create({});