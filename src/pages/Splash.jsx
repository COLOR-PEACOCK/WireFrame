import React, { useEffect, useRef } from 'react';
import { View, SafeAreaView, Animated, Easing } from 'react-native';
import { CustomText as Text } from '@components/common/CustomText';
import logoPeacock from '@components/Splash/ColorPeacock_logo.png';

// 스플래시 화면 텍스트에 색 지나가는 애니메이션
const WaveText = ({ text, colors }) => {
	const animations = useRef(
		text.split('').map(() => new Animated.Value(0)),
	).current;

	useEffect(() => {
		const createAnimation = anim => {
			return Animated.sequence([
				Animated.timing(anim, {
					toValue: colors.length - 1,
					duration: colors.length * 200,
					useNativeDriver: false,
				}),
				Animated.timing(anim, {
					toValue: 0,
					duration: colors.length * 200,
					useNativeDriver: false,
				}),
			]);
		};

		const animation = Animated.loop(
			Animated.stagger(
				30,
				animations.map(anim => createAnimation(anim)),
			),
		);

		animation.start();
	}, [colors]);

	return (
		<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
			{text.split('').map((char, index) => (
				<Animated.Text
					key={index}
					style={{
						color: animations[index].interpolate({
							inputRange: colors.map((_, i) => i),
							outputRange: colors,
						}),
						fontSize: 28,
						fontFamily: 'CookieRun-Black',
						// fontWeight: '900',
					}}>
					{char}
				</Animated.Text>
			))}
		</View>
	);
};

// 로고 이미지 움직이는 애니메이션
const RotateLogo = () => {
	const rotateAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const createAnimation = anim => {
			return Animated.sequence([
				Animated.timing(anim, {
					toValue: 5,
					duration: 500,
					easing: Easing.inOut(Easing.quad),
					useNativeDriver: true,
				}),
				Animated.timing(anim, {
					toValue: -15,
					duration: 300,
					easing: Easing.inOut(Easing.quad),
					useNativeDriver: true,
				}),
				Animated.timing(anim, {
					toValue: -5,
					duration: 200,
					easing: Easing.inOut(Easing.quad),
					useNativeDriver: true,
				}),
				Animated.timing(anim, {
					toValue: -15,
					duration: 200,
					easing: Easing.inOut(Easing.quad),
					useNativeDriver: true,
				}),
				Animated.timing(anim, {
					toValue: 0,
					duration: 700,
					easing: Easing.inOut(Easing.quad),
					useNativeDriver: true,
				}),
				Animated.timing(anim, {
					toValue: 0,
					duration: 500,
					easing: Easing.inOut(Easing.quad),
					useNativeDriver: true,
				}),
			]);
		};

		const animation = Animated.loop(createAnimation(rotateAnim));

		animation.start();
	}, [rotateAnim]);

	const rotateInterpolate = rotateAnim.interpolate({
		inputRange: [-20, 5],
		outputRange: ['-20deg', '5deg'],
	});

	return (
		<Animated.Image
			source={logoPeacock}
			style={{
				width: 164,
				height: 164,
				transform: [{ rotate: rotateInterpolate }],
			}}
		/>
	);
};

const Splash = ({ navigation }) => {
	// useEffect(() => {
	// 	setTimeout(() => {
	// 		navigation.navigate('Home');
	// 	}, 1000);
	// }, []);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: '#873EF1',
				}}>
				{/* <Text>Splash</Text> */}
				<RotateLogo />
				<WaveText
					text="COLOR PEACOCK"
					colors={[
						'#ffffff',
						'#FFB0B2',
						'#0B99BD',
						'#FF9B49',
						'#51E4E0',
						'#ffffff',
					]}
				/>
			</View>
		</SafeAreaView>
	);
};

export default Splash;
