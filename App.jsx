import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Router from './src/router';

function App() {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
}

export default App;