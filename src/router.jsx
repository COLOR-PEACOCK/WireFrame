import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '@pages/Splash';
import Home from '@pages/Home';
import AiScreen from '@pages/AiScreen';
import ImageScreen from '@pages/ImageScreen';
import AiResponseScreen from '@pages/AiResponseScreen';

const Stack = createNativeStackNavigator();

const Router = () => {
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false, gestureEnabled: false }}>
			<Stack.Screen name="Splash" component={Splash} />
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="AiScreen" component={AiScreen} />
			<Stack.Screen
				name="AiResponseScreen"
				component={AiResponseScreen}
			/>
			<Stack.Screen name="ImageScreen" component={ImageScreen} />
		</Stack.Navigator>
	);
};

export default Router;
