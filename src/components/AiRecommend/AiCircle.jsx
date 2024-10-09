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
import { heightScale, widthScale } from '@utils/scaling';

const AiCircle = ({
	type,
	number,
	colorCode,
	korColorName,
	engColorName,
	colorShort,
	colorDescription,
	isSelected,
	setIsSelected,
	containerHeight,
}) => {
	const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
		useWindowDimensions();

	const animatedSize = useRef(new Animated.Value(1)).current;
	const animatedFontSize = useRef(new Animated.Value(0)).current;

	const distance = 20;
	const diameter = heightScale(205);
	const beforeDivideLarge = containerHeight - 1.2 * diameter; // 큰 원끼리 간격 나누기 전의 길이(나중에 4로 나누게 됨)
	const beforeDivideMiddle = containerHeight - 0.8 * diameter;
	const beforeDivideSmall = containerHeight - diameter;

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
				// medium누르면 자신은 large로 나머지 small
				return prevSelected.map((_, index) =>
					index === number ? 'large' : 'small',
				);
			}
		});
	};

	const circleStyle = {
		position: 'absolute',
		...(type == 'left'
			? {
					left: animatedSize.interpolate({
						inputRange: [0.5, 1, 1.6],
						outputRange: [
							distance - SCREEN_WIDTH * 0.5,
							-distance - SCREEN_WIDTH * 0.5,
							-distance - SCREEN_WIDTH * 0.5,
						],
					}),
			  }
			: {
					right: animatedSize.interpolate({
						inputRange: [0.5, 1, 1.6],
						outputRange: [
							distance - SCREEN_WIDTH * 0.5,
							-distance - SCREEN_WIDTH * 0.5,
							-distance - SCREEN_WIDTH * 0.5,
						],
					}),
			  }),
		top: animatedSize.interpolate({
			inputRange: [0.5, 1, 1.6],
			outputRange: [
				0.25 * diameter + (number * beforeDivideSmall) / 4,
				-0.1 * diameter + (number * beforeDivideMiddle) / 4,
				-0.2 * diameter + (number * beforeDivideLarge) / 4,
			],
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
						fontSize: animatedFontSize.interpolate({
							inputRange: [0, 0.5, 1],
							outputRange: [
								heightScale(14),
								heightScale(20),
								heightScale(26),
							],
						}),
						color: korTextColor(colorCode[number]),
					}}>
					{korColorName[number]}
				</Animated.Text>
				<Animated.Text
					style={{
						fontFamily: 'Pretendard-Medium',
						fontSize: animatedFontSize.interpolate({
							inputRange: [0, 0.5, 1],
							outputRange: [
								heightScale(12),
								heightScale(16),
								heightScale(20),
							],
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
							outputRange: [0, heightScale(16), heightScale(18)],
						}),
						color: korTextColor(colorCode[number]),
						paddingHorizontal: 30,
					}}>
					{isSelected[number] === 'large'
						? colorDescription[number]
						: colorShort[number]}
				</Animated.Text>
			</Animated.View>
		</TouchableOpacity>
	);
};

export default AiCircle;
