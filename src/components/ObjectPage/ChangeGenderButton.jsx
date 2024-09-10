import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COLOR } from '@styles/color';
import { CustomText as Text } from '@components/common/CustomText';

import { GenderMale, GenderFemale } from '@icons/objecticon/objectIcon.js';

const ChangeGenderButton = ({ gender, setGender }) => {
	return (
		<TouchableOpacity
			onPress={() => setGender(Gender => !Gender)}
			style={styles.genderChangeButton}>
			{gender ? (
				<Image source={GenderMale} style={{ width: 34, height: 34 }} />
			) : (
				<Image
					source={GenderFemale}
					style={{ width: 34, height: 34 }}
				/>
			)}

			<Text style={styles.changeText}>변경</Text>
			<Text style={styles.engText}>gender change</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	genderChangeButton: {
		width: 64,
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: COLOR.GRAY_6,
	},
	changeText: {
		fontFamily: 'Pretendard-Medium',
		color: COLOR.GRAY_10,
	},
	engText: {
		fontSize: 12,
		color: COLOR.GRAY_6,
	},
});
export default ChangeGenderButton;
