import React, { useEffect } from 'react';
import { View, Image, Animated, Easing } from 'react-native';
import spinner from '../../assets/loadingSpinner.png';

const Spinner = () => {
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
	}, [spinValue]);

	const spin = spinValue.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '360deg'],
	});

	return (
		<View>
			<Animated.Image
				source={spinner} // 스피너 이미지 경로
				style={{
					width: 100, // 이미지 크기
					height: 100,
					transform: [{ rotate: spin }],
				}}
			/>
		</View>
	);
};

export default Spinner;
