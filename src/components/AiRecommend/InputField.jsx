import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { CustomText as Text } from '@components/common/CustomText';

const InputField = ({ label, value, onChangeText }) => (
	<View style={styles.inputRow}>
		<Text style={styles.inputLabel}>{label}</Text>
		<TextInput
			style={styles.input}
			value={value}
			onChangeText={onChangeText}
		/>
	</View>
);

const styles = StyleSheet.create({
	inputRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20,
		marginHorizontal: 20,
	},
	inputLabel: {
		fontSize: 14,
		color: '#fff',
		marginRight: 10,
		width: 120,
	},
	input: {
		flex: 1,
		height: 40,
		borderBottomColor: '#fff',
		borderBottomWidth: 1,
		color: '#fff',
		backgroundColor: 'transparent',
		placeholderTextColor: '#ccc',
	},
});

export default InputField;
