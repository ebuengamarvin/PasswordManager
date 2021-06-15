import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from 'react-native-elements';
import Router from './src/router';
import {navigationRef} from './src/components/App/RootNavigation';

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
