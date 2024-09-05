import { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLOR } from '@styles/color';

const PressButton = ({ iconName, onPress, text }) => {
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
			<Icon
				name={iconName}
				size={48}
				style={[styles.icon, { color: contentColor }]}
			/>
			<Text style={[styles.buttonText, { color: contentColor }]}>
				{text}
			</Text>
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
	icon: {
		marginLeft: '12.5%',
	},
	buttonText: {
		fontFamily: 'Pretendard-Medium',
		fontSize: 16,
	},
});

export default PressButton;
