import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CreateScreen from '../screens/CreateScreen/CreateScreen';
import FoundationIcons from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import HomeGroupRoutes from './homeGroup.routes';

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
      <Tab.Screen name="Home" component={HomeGroupRoutes} />
      <Tab.Screen name="Create" component={CreateScreen} />
    </Tab.Navigator>
  );
};

export default HomeRoutes;
