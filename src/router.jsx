import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '@pages/Splash';
import AiScreen from '@pages/AiScreen';
import ImageScreen from '@pages/ImageScreen';

const Stack = createNativeStackNavigator();

const Router = () => {
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false, gestureEnabled: false }}>
			<Stack.Screen name="Splash" component={Splash} />
			<Stack.Screen name="AiScreen" component={AiScreen} />
			<Stack.Screen name="ImageScreen" component={ImageScreen} />
		</Stack.Navigator>
	);
};

export default Router;
