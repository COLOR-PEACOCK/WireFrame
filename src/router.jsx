import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '@pages/Splash';

const Stack = createNativeStackNavigator();

const Router = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false, gestureEnabled: false }}>
            <Stack.Screen name="Splash" component={Splash} />
        </Stack.Navigator>
    );
};

export default Router;