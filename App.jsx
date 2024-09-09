import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Router from './src/router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App() {
	return (
		<NavigationContainer>
			<GestureHandlerRootView>
				<Router />
			</GestureHandlerRootView>
		</NavigationContainer>
	);
}

export default App;
