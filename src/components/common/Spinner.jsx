import React, { useEffect, useState } from 'react';
import { View, Image, Animated, Easing, Text } from 'react-native';
import spinner from '../../assets/loadingSpinner.png';
import logoIcon from '../../assets/icons/logo.png';

const Spinner = () => {
	// 스피너
	const spinValue = new Animated.Value(0);

	useEffect(() => {
		const startRotation = () => {
			spinValue.setValue(0); // 초기화
			Animated.timing(spinValue, {
				toValue: 1,
				duration: 1000, // 회전 속도 조정
				easing: Easing.linear,
				useNativeDriver: true,
			}).start(() => startRotation()); // 무한 반복
		};

		startRotation();
	}, []);

	const spin = spinValue.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '360deg'],
	});

	return (
		<View
			style={{
				position: 'relative',
				justifyContent: 'center',
				alignItems: 'center',
				width: 68,
				height: 68,
			}}>
			<Animated.Image
				source={spinner} // 스피너 이미지 경로
				style={{
					position: 'absolute',
					width: 68, // 이미지 크기
					height: 68,
					transform: [{ rotate: spin }],
				}}
			/>
			<Image source={logoIcon} style={{ width: 48, height: 48 }} />
		</View>
	);
};

export default Spinner;
