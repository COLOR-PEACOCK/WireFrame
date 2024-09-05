import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLOR } from '@styles/color';

import SVGIcon from '@components/common/SVGIcon';

const PressButton = ({ iconName, onPress, engText,text }) => {
	const [contentColor, setContentColor] = useState(COLOR.GRAY_9);
	const [buttonColor, setButtonColor] = useState(COLOR.WHITE);

	const handleTouchStart = () => {
		setContentColor(COLOR.WHITE);
		setButtonColor(COLOR.PRIMARY);
	};

	const handleTouchEnd = () => {
		setContentColor(COLOR.GRAY_9);
		setButtonColor(COLOR.WHITE);
	};
	return (
		<Pressable
			onPress={onPress}
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
			underlayColor={COLOR.PRIMARY}
			style={[styles.button, { backgroundColor: buttonColor }]}>
			<SVGIcon name={iconName} color={contentColor} style={styles.icon} />
			<View style={{}}>
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
		width: '90%',
		height: 84,
		marginHorizontal: '5%',
		borderRadius: 8,
		alignItems: 'center',
		flexDirection: 'row',
		gap: 18,
		backgroundColor: COLOR.WHITE,
		elevation: 2,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowRadius: 8,
		shadowColor: COLOR.BLACK,
		shadowOpacity: 0.25,
	},
	icon: { marginLeft: '12.5%' },
	buttonEngText: {
		fontFamily: 'Pretendard-Medium',
		fontSize: 12,
	},
	buttonText: {
		fontFamily: 'Pretendard-Bold',
		fontSize: 16,
	},
});

export default PressButton;
