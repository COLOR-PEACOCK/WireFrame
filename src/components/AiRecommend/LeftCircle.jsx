import React from 'react';
import {
	Text,
	TouchableOpacity,
	useWindowDimensions,
	View,
} from 'react-native';
import tinycolor from 'tinycolor2';
import { COLOR } from '@styles/color';

const LeftCircle = ({
	left,
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

	const korTextColor = color => {
		return tinycolor(color).isLight() ? COLOR.GRAY_10 : COLOR.WHITE;
	};
	const engTextColor = color => {
		return tinycolor(color).isLight() ? COLOR.GRAY_8 : COLOR.GRAY_2;
	};
	// console.log(isSelected[number]);

	const handleCircle = () => {
		if (isSelected[number] === 'medium') {
			return (
				<TouchableOpacity
					onPress={() => {
						setIsSelected(
							isSelected.map((select, index) => {
								if (index === number) {
									return 'large';
								} else {
									return 'small';
								}
							}),
						);
					}}
					activeOpacity={0.7}
					style={{
						position: 'absolute',
						left: -left,
						top: top,
						width: diameter,
						height: diameter,
						borderRadius: 400,
						backgroundColor: colorCode[number],
						justifyContent: 'center',
						alignItems: 'center',
						zIndex: -1,
					}}>
					<Text
						style={{
							fontFamily: 'Pretendard-Bold',
							fontSize: 20,
							color: korTextColor(colorCode[number]),
						}}>
						{korColorName[number]}
					</Text>
					<Text
						style={{
							fontFamily: 'Pretendard-Medium',
							fontSize: 16,
							color: engTextColor(colorCode[number]),
						}}>
						{engColorName[number]}
					</Text>
					<Text
						style={{
							fontFamily: 'Pretendard-Regular',
							fontSize: 16,
							color: korTextColor(colorCode[number]),
							padding: 6,
						}}>
						{colorShort[number]}
					</Text>
				</TouchableOpacity>
			);
		} else if (isSelected[number] === 'small') {
			return (
				<TouchableOpacity
					onPress={() => {
						setIsSelected(
							isSelected.map((select, index) => {
								if (index === number) {
									return 'large';
								} else {
									return 'small';
								}
							}),
						);
					}}
					activeOpacity={0.7}
					style={{
						position: 'absolute',
						left: left,
						top: top + diameter / 4,
						width: diameter / 2,
						height: diameter / 2,
						borderRadius: 400,
						backgroundColor: colorCode[number],
						justifyContent: 'center',
						alignItems: 'center',
						zIndex: -1,
					}}>
					<Text
						style={{
							fontFamily: 'Pretendard-Bold',
							fontSize: 14,
							color: korTextColor(colorCode[number]),
						}}>
						{korColorName[number]}
					</Text>
					<Text
						style={{
							fontFamily: 'Pretendard-Medium',
							fontSize: 12,
							color: engTextColor(colorCode[number]),
						}}>
						{engColorName[number]}
					</Text>
				</TouchableOpacity>
			);
		} else if (isSelected[number] === 'large') {
			return (
				<TouchableOpacity
					onPress={() => {
						setIsSelected(
							isSelected.map(() => {
								return 'medium';
							}),
						);
					}}
					activeOpacity={0.7}
					style={{
						position: 'absolute',
						left: -left,
						top: top - 60,
						width: diameter * 1.6,
						height: diameter * 1.6,
						borderRadius: 400,
						backgroundColor: colorCode[number],
						justifyContent: 'center',
						alignItems: 'center',
						zIndex: -1,
					}}>
					<Text
						style={{
							fontFamily: 'Pretendard-Bold',
							fontSize: 26,
							color: korTextColor(colorCode[number]),
						}}>
						{korColorName[number]}
					</Text>
					<Text
						style={{
							fontFamily: 'Pretendard-Bold',
							fontSize: 20,
							color: engTextColor(colorCode[number]),
						}}>
						{engColorName[number]}
					</Text>
					<Text
						style={{
							fontFamily: 'Pretendard-Bold',
							fontSize: 20,
							color: korTextColor(colorCode[number]),
							padding: 6,
						}}>
						{colorCode[number]}
					</Text>
					<Text
						style={{
							fontFamily: 'Pretendard-Regular',
							fontSize: 18,
							color: korTextColor(colorCode[number]),
							paddingHorizontal: 45,
						}}>
						{colorDescription[number]}
					</Text>
				</TouchableOpacity>
			);
		}
	};
	return handleCircle();
};

export default LeftCircle;
