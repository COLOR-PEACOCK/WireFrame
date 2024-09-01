import React from 'react';
import { Pressable } from 'react-native';
import { COLOR } from '@styles/color';
import { CustomText as Text } from '@components/common/CustomText';

const ListValue = ({ label, textStyle, isActive, disabled, onPressLabel }) => {
	const handlePressLabel = () => {
		if (onPressLabel) onPressLabel(label);
	};

	const getTextColor = () => {
		if (isActive) {
			return COLOR.WHITE;
		} else if (disabled) {
			return COLOR.GRAY_6;
		} else {
			return COLOR.GRAY_10;
		}
	};

	const getBackgroundColor = () => {
		if (isActive) {
			return COLOR.PRIMARY;
		} else {
			return COLOR.WHITE;
		}
	};

	return (
		<Pressable
			style={{
				paddingLeft: 8,
				paddingVertical: 8,
				borderRadius: 4,
				backgroundColor: getBackgroundColor(),
			}}
			onPress={handlePressLabel}>
			<Text style={[textStyle, { color: getTextColor() }]}>{label}</Text>
		</Pressable>
	);
};

export default ListValue;
