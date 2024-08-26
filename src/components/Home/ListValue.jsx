import { COLOR } from '@styles/color';
import React from 'react';
import { Pressable } from 'react-native';
import { CustomText as Text } from '@components/common/CustomText';

const ListValue = ({ label, isActive, disabled, onPressLabel }) => {
	const handlePressLabel = () => {
		if (onPressLabel) onPressLabel(label);
	};

	const getTextColor = () => {
		if (disabled) {
			return COLOR.GRAY_5;
		} else if (isActive) {
			return COLOR.PRIMARY;
		} else {
			return COLOR.GRAY_10;
		}
	};

	return (
		<Pressable
			style={{
				paddingLeft: 16,
				paddingVertical: 12,
			}}
			disabled={disabled}
			onPress={handlePressLabel}>
			<Text style={{ color: getTextColor() }}>{label}</Text>
		</Pressable>
	);
};

export default ListValue;
