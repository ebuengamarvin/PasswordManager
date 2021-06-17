import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import UpdateScreen from '../screens/UpdateScreen';

const HomeGroupStack = createStackNavigator();

const HomeGroupRoutes = ({navigation}) => {
  return (
    <HomeGroupStack.Navigator>
      <HomeGroupStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeGroupStack.Screen name="Update" component={UpdateScreen} />
    </HomeGroupStack.Navigator>
  );
};

export default HomeGroupRoutes;
