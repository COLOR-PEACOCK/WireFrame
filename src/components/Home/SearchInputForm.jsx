import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { CustomText as Text } from '@components/common/CustomText';
import { COLOR } from '@styles/color';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

const SearchInputForm = ({ selectedLabel, inputValues, setInputValues }) => {
	const initValue = {
		part1: '',
		part2: '',
		part3: '',
		part4: '',
	};

	const inputRef = useRef(null);
	useEffect(() => {
		setInputValues(initValue);
		inputRef.current.input1.focus();
	}, [selectedLabel]);

	const isPartialInput = ['RGB', 'HSL', 'CMYK'];
	const handleTextChange = (part, text, nextInput) => {
		setInputValues({ ...inputValues, [part]: text });
		if (
			isPartialInput.includes(selectedLabel) &&
			text.length >= 3 &&
			nextInput
		) {
			inputRef.current[nextInput].focus();
		}
	};
	const handleInput1 = text => handleTextChange('part1', text, 'input2');
	const handleInput2 = text => handleTextChange('part2', text, 'input3');
	const handleInput3 = text =>
		handleTextChange(
			'part3',
			text,
			selectedLabel === 'CMYK' ? 'input4' : null,
		);
	const handleInput4 = text => handleTextChange('part4', text, null);

	const TextInputCommonProps = {
		placeholderTextColor: COLOR.GRAY_6,
		keyboardType: 'number-pad',
		maxLength: 3,
		returnKeyType: 'next',
	};

	switch (selectedLabel) {
		case '색상 이름':
			return (
				<ColorInputForm
					ref={inputRef}
					labels={['입력']}
					values={[inputValues.part1]}
					onChangeTexts={[handleInput1]}
				/>
			);
		case 'HEX':
			return (
				<ColorInputForm
					ref={inputRef}
					labels={['#']}
					values={[inputValues.part1]}
					onChangeTexts={[handleInput1]}
					maxLength={6}
				/>
			);
		case 'RGB':
			return (
				<ColorInputForm
					ref={inputRef}
					labels={['R', 'G', 'B']}
					values={[
						inputValues.part1,
						inputValues.part2,
						inputValues.part3,
					]}
					onChangeTexts={[handleInput1, handleInput2, handleInput3]}
					TextInputCommonProps={TextInputCommonProps}
				/>
			);
		case 'HSL':
			return (
				<ColorInputForm
					ref={inputRef}
					labels={['H', 'S', 'L']}
					values={[
						inputValues.part1,
						inputValues.part2,
						inputValues.part3,
					]}
					onChangeTexts={[handleInput1, handleInput2, handleInput3]}
					TextInputCommonProps={TextInputCommonProps}
				/>
			);
		case 'CMYK':
			return (
				<ColorInputForm
					ref={inputRef}
					labels={['C', 'M', 'Y', 'K']}
					unit="%"
					values={[
						inputValues.part1,
						inputValues.part2,
						inputValues.part3,
						inputValues.part4,
					]}
					onChangeTexts={[
						handleInput1,
						handleInput2,
						handleInput3,
						handleInput4,
					]}
					TextInputCommonProps={TextInputCommonProps}
				/>
			);

		default:
			<ColorInputForm />;
	}
};

const ColorInputForm = forwardRef((props, ref) => {
	const {
		labels,
		values,
		onChangeTexts,
		TextInputCommonProps,
		maxLength,
		unit,
	} = props;
	const inputRefs = useRef([]);
	useImperativeHandle(ref, () => {
		return labels.reduce((acc, _, index) => {
			acc[`input${index + 1}`] = inputRefs.current[index];
			return acc;
		}, {});
	});

	return (
		<View style={styles.inputContainer}>
			{labels.map((label, index) => (
				<Pressable
					key={index}
					style={[styles.inputForm, { width: '100%' }]}
					onPress={() => inputRefs.current[index].focus()}>
					<View style={styles.inputLabel}>
						<Text style={styles.labelText}>{label}</Text>
					</View>
					<View style={styles.textInput}>
						<TextInput
							ref={el => (inputRefs.current[index] = el)}
							value={values[index]}
							onChangeText={onChangeTexts[index]}
							onSubmitEditing={() =>
								index < 2 &&
								inputRefs.current[index + 1].focus()
							}
							maxLength={maxLength}
							{...TextInputCommonProps}
						/>
						{unit && <Text style={{ fontSize: 16 }}>{unit}</Text>}
					</View>
				</Pressable>
			))}
		</View>
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
