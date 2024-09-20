import React, { forwardRef } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { CustomText as Text } from '@components/common';
import { COLOR } from '@styles/color';
import { useInputState } from '@hooks/home';

const SearchInputForm = ({ selectedLabel, inputValues, setInputValues }) => {

	const {
		inputOption,
		inputRef,
		handleFocusNext,
		handleAutoFocus,
		handlePressInputForm,
	} = useInputState(selectedLabel);

	const handleTextChange = (index, text) => {
		setInputValues(prevValues => ({
			...prevValues,
			[`part${index + 1}`]: text,
		}));
	};

	return (
		<View style={styles.inputContainer}>
			{inputOption.labels.map((label, index) => (
				<InputForm
					key={index}
					ref={element => (inputRef.current[index] = element)}
					value={inputValues[`part${index + 1}`]}
					label={label}
					placeholder={inputOption.placeholders?.[index]}
					placeholderTextColor={COLOR.GRAY_6}
					unit={inputOption.unit?.[index]}
					maxLength={inputOption.maxLength}
					onPress={() => handlePressInputForm(index)}
					onChangeText={text => {
						handleTextChange(index, text);
						handleAutoFocus(index, text);
					}}
					onSubmitEditing={() => handleFocusNext(index)}
					keyboardType={inputOption.keyboardType}
					returnKeyType={'next'}
				/>
			))}
		</View>
	);
};

const InputForm = forwardRef(({ label, unit, onPress, ...rest }, ref) => {
	return (
		<Pressable
			style={[styles.inputForm, { width: '100%' }]}
			onPress={onPress}>
			<View style={styles.inputLabel}>
				<Text style={styles.labelText}>{label}</Text>
			</View>
			<View style={styles.textInput}>
				<TextInput
					ref={ref}
					{...rest}
					style={{ color: COLOR.GRAY_10 }}
				/>
				{unit && <Text style={{ fontSize: 16 }}>{unit}</Text>}
			</View>
		</Pressable>
	);
});

const styles = StyleSheet.create({
	inputContainer: {
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 10,
		zIndex: 11,
	},
	inputLabel: {
		width: 48,
		height: 48,
		justifyContent: 'center',
		alignItems: 'center',
		borderRightColor: COLOR.GRAY_3,
		borderRightWidth: 1,
	},
	labelText: {
		fontFamily: 'Pretendard-Bold',
		fontSize: 16,
		color: COLOR.PRIMARY,
	},
	inputForm: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 8,
		borderColor: COLOR.GRAY_6,
		borderWidth: 1,
	},
	textInput: {
		width: '75%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginLeft: 10,
	},
});

export default SearchInputForm;
