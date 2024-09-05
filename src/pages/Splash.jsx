import React, { useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import { CustomText as Text } from '@components/common/CustomText';

const Splash = ({ navigation }) => {
	useEffect(() => {
		setTimeout(() => {
			navigation.navigate('Home');
		}, 1000);
	}, []);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<Text>Splash</Text>
			</View>
		</SafeAreaView>
	);
};

export default Splash;
