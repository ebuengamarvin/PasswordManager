import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeNavigator from './home.routes';
import LoginScreen from '../screens/LoginScreen';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {Avatar} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNavigation from '../components/App/RootNavigation';
import UpdateScreen from '../screens/UpdateScreen';

const RootStack = createStackNavigator();

const removeStorage = async () => {
  try {
    await AsyncStorage.removeItem('mrx');
  } catch (e) {
    // remove error
  }
};

const Router = props => {
  return (
    <RootStack.Navigator iinitialRouteName="Login">
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          title: 'MRX',
          headerTitleStyle: {color: 'grey'},
          headerTintColor: '#000',
          headerLeft: () => (
            <View style={styles.leftIcon}>
              <Avatar rounded source={require('../assets/images/marvin.jpg')} />
            </View>
          ),
          headerRight: () => (
            <View style={styles.rightIcon}>
              <TouchableOpacity
                onPress={() => {
                  removeStorage();
                  RootNavigation.replace('Login');
                }}
                activeOpacity={0.5}
                style={styles.container}>
                <AntDesignIcon name="logout" size={24} color="black" />
                <Text>Logout</Text>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <RootStack.Screen name="Update" component={UpdateScreen} />
    </RootStack.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 75,
  },
  rightIcon: {
    marginRight: 10,
  },
  leftIcon: {
    marginLeft: 30,
  },
});
