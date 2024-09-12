import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '@pages/Home';

import ImageScreen from '@pages/ImageScreen/ImageScreen';
import ImageAiScreen from '@pages/ImageScreen/ImageAiScreen';
import AiScreen from '@pages/AiScreen/AiScreen';
import AiOnboardingScreen from '@pages/AiScreen/AiOnboardingScreen';
import AiResponseScreen from '@pages/AiScreen/AiResponseScreen';

import CameraScreen from '@pages/CameraScreen';
import ColorRecommendScreen from '@pages/ColorRecommendScreen';
import ObjectScreen from '@pages/ObjectScreen';

const Stack = createNativeStackNavigator();

const Router = () => {
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false, gestureEnabled: false }}>
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen
				name="AiOnboardingScreen"
				component={AiOnboardingScreen}
			/>
			<Stack.Screen name="AiScreen" component={AiScreen} />
			<Stack.Screen
				name="AiResponseScreen"
				component={AiResponseScreen}
			/>
			<Stack.Screen name="ImageScreen" component={ImageScreen} />
			<Stack.Screen
				name="ColorRecommendScreen"
				component={ColorRecommendScreen}
			/>
			<Stack.Screen name="CameraScreen" component={CameraScreen} />
			<Stack.Screen name="ObjectScreen" component={ObjectScreen} />
			<Stack.Screen name="ImageAiScreen" component={ImageAiScreen} />
		</Stack.Navigator>
	);
};

export default Router;
