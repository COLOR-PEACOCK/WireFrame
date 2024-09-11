import React from 'react';
import { View } from 'react-native';
import Spinner from './Spinner';
import LoadingText from './LoadingText';
import { Text } from 'react-native';
import { COLOR } from '@styles/color';

const LoadingScreen = () => {
	return (
		<View
			style={{
				gap: 16,
				width: 75,
				height: 120,
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<Spinner />
			<View style={{ justifyContent: 'center', alignItems: 'center' }}>
				<LoadingText />
				<Text
					style={{
						fontFamily: 'Pretendard-Regular',
						fontSize: 12,
						color: COLOR.GRAY_8,
					}}>
					loading
				</Text>
			</View>
		</View>
	);
};

export default LoadingScreen;
