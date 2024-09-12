import React, { useRef, useEffect } from 'react';
import {
	Text,
	TouchableOpacity,
	Animated,
	View,
	useWindowDimensions,
} from 'react-native';
import tinycolor from 'tinycolor2';
import { COLOR } from '@styles/color';

const RightCircle = ({
	right,
	top,
	diameter,
	number,
	colorCode,
	korColorName,
	engColorName,
	colorShort,
	colorDescription,
	isSelected,
	setIsSelected,
}) => {
	const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
		useWindowDimensions();

	const animatedSize = useRef(new Animated.Value(1)).current;
	const animatedFontSize = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.parallel([
			Animated.spring(animatedSize, {
				toValue:
					isSelected[number] === 'large'
						? 1.6
						: isSelected[number] === 'small'
						? 0.5
						: 1,
				useNativeDriver: false,
			}),
			Animated.timing(animatedFontSize, {
				toValue:
					isSelected[number] === 'large'
						? 1
						: isSelected[number] === 'small'
						? 0
						: 0.5,
				duration: 300,
				useNativeDriver: false,
			}),
		]).start();
	}, [isSelected]);

	const korTextColor = color => {
		return tinycolor(color).isLight() ? COLOR.GRAY_10 : COLOR.WHITE;
	};
	const engTextColor = color => {
		return tinycolor(color).isLight() ? COLOR.GRAY_9 : COLOR.GRAY_2;
	};

	const handlePress = () => {
		setIsSelected(prevSelected => {
			if (prevSelected[number] === 'large') {
				// large누르면 전부 medium으로 set
				return prevSelected.map(() => 'medium');
			} else if (prevSelected[number] === 'small') {
				// small누르면 자신은 large로 나머지는 small
				return prevSelected.map((_, index) =>
					index === number ? 'large' : 'small',
				);
			} else {
				// medium누르면 자신은 large로 나머지는 small
				return prevSelected.map((_, index) =>
					index === number ? 'large' : 'small',
				);
			}
		});
	};

	const circleStyle = {
		position: 'absolute',
		right: animatedSize.interpolate({
			inputRange: [0.5, 1, 1.6],
			outputRange: [
				right - SCREEN_WIDTH * 0.5,
				-right - SCREEN_WIDTH * 0.5,
				-right - SCREEN_WIDTH * 0.5,
			],
		}),
		top: animatedSize.interpolate({
			inputRange: [0.5, 1, 1.6],
			outputRange: [top - 24 + diameter / 4, top - 24, top - 60 - 24],
		}),
		width: animatedSize.interpolate({
			inputRange: [0.5, 1, 1.6],
			outputRange: [diameter / 2, diameter, diameter * 1.6],
		}),
		height: animatedSize.interpolate({
			inputRange: [0.5, 1, 1.6],
			outputRange: [diameter / 2, diameter, diameter * 1.6],
		}),
		borderRadius: 400,
		backgroundColor: colorCode[number],
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
		zIndex: -1,
	};

	return (
		<TouchableOpacity
			onPressOut={handlePress}
			activeOpacity={0.7}
			style={{
				zIndex: -1,
			}}>
			<Animated.View style={circleStyle}>
				<Animated.Text
					style={{
						fontFamily: 'Pretendard-Bold',
						fontSize: animatedSize.interpolate({
							inputRange: [0.5, 1, 1.6],
							outputRange: [14, 20, 26],
						}),
						color: korTextColor(colorCode[number]),
					}}>
					{korColorName[number]}
				</Animated.Text>
				<Animated.Text
					style={{
						fontFamily: 'Pretendard-Medium',
						fontSize: animatedSize.interpolate({
							inputRange: [0.5, 1, 1.6],
							outputRange: [12, 16, 20],
						}),
						color: engTextColor(colorCode[number]),
						marginTop: -2,
						marginBottom: 5,
					}}>
					{engColorName[number]}
				</Animated.Text>
				<Animated.Text
					style={{
						fontFamily: 'Pretendard-Regular',
						fontSize: animatedFontSize.interpolate({
							inputRange: [0, 0.5, 1],
							outputRange: [0, 16, 18],
						}),
						color: korTextColor(colorCode[number]),
						paddingHorizontal: 45,
					}}>
					{isSelected[number] === 'large'
						? colorDescription[number]
						: colorShort[number]}
				</Animated.Text>
			</Animated.View>
		</TouchableOpacity>
	);
};

export default RightCircle;
