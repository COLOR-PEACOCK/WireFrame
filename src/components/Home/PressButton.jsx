import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLOR } from '@styles/color';
import SVGIcon from '@components/common/SVGIcon';
import usePressButtonState from '@hooks/home/usePressButtonState';

const size = 48;
const PressButton = ({ iconName, onPress, engText, text }) => {
	const { contentColor, buttonColor, handleTouchStart, handleTouchEnd } = usePressButtonState();
    
	return (
		<Pressable
			onPress={onPress}
			onPressIn={handleTouchStart}
			onPressOut={handleTouchEnd}
			underlayColor={COLOR.PRIMARY}
			style={[styles.button, { backgroundColor: buttonColor }]}>
			<SVGIcon
				name={iconName}
				width={size}
				height={size}
				color={contentColor}
				style={styles.icon}
			/>
			<View>
				<Text
					style={[
						styles.buttonEngText,
						{ color: contentColor + 70 },
					]}>
					{engText}
				</Text>
				<Text style={[styles.buttonText, { color: contentColor }]}>
					{text}
				</Text>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		width: '100%',
		maxWidth: 376,
		height: 84,
		marginHorizontal: 18,
		borderRadius: 8,
		alignItems: 'center',
		flexDirection: 'row',
		backgroundColor: COLOR.WHITE,
		// Android 그림자 설정
		elevation: 4,
		// iOS 그림자 설정
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowRadius: 4,
		shadowColor: COLOR.BLACK,
		shadowOpacity: 0.2,
	},
	icon: {
		marginLeft: 74,
	},
	buttonEngText: {
		fontFamily: 'Pretendard-Medium',
		fontSize: 12,
        fontWeight: 500,
		letterSpacing: 0.3,
        textTransform: 'uppercase',

	},
	buttonText: {
		fontFamily: 'Pretendard-Bold',
		fontSize: 16,
		letterSpacing: 0.8,
	},
});

export default PressButton;
