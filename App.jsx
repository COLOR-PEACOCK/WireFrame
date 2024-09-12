import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BootSplash from 'react-native-bootsplash';

function App() {
    
	return (
		<NavigationContainer
			onReady={() => {
				BootSplash.hide({ fade: true });
			}}>
			<GestureHandlerRootView>
				<Router />
			</GestureHandlerRootView>
		</NavigationContainer>
	);
}

export default App;
