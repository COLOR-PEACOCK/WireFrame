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
				<NameForm
					ref={inputRef}
					value={inputValues.part1}
					onChangeText={handleInput1}
				/>
			);
		case 'HEX':
			return (
				<HexForm
					ref={inputRef}
					value={inputValues.part1}
					onChangeText={handleInput1}
				/>
			);
		case 'RGB':
			return (
				<ColorValueForm
					ref={inputRef}
					labels={['R', 'G', 'B']}
					unitWidth={'30%'}
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
				<ColorValueForm
					ref={inputRef}
					labels={['H', 'S', 'L']}
					unitWidth={'30%'}
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
				<CMYKForm
					ref={inputRef}
					labels={['C', 'M', 'Y', 'K']}
					unitWidth={'45%'}
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
			<NameForm />;
	}
};

const NameForm = forwardRef((props, ref) => {
	const inputRef1 = useRef(null);
	useImperativeHandle(ref, () => ({
		input1: inputRef1.current,
	}));
	return (
		<View style={styles.inputContainer}>
			<View style={[styles.inputForm, { width: '100%' }]}>
				<TextInput
					ref={inputRef1}
					placeholder={'(한글, 영어)'}
					placeholderTextColor={COLOR.GRAY_6}
					{...props}
				/>
			</View>
		</View>
	);
});

const HexForm = forwardRef((props, ref) => {
	const inputRef1 = useRef(null);
	useImperativeHandle(ref, () => ({
		input1: inputRef1.current,
	}));
	return (
		<View style={styles.inputContainer}>
			<View style={[styles.inputForm, { width: '100%' }]}>
				<Text> #</Text>
				<TextInput
					ref={inputRef1}
					placeholder={'ffffff'}
					placeholderTextColor={COLOR.GRAY_6}
					maxLength={6}
					{...props}
				/>
			</View>
		</View>
	);
});

const ColorValueForm = forwardRef(
	(
		{
			labels,
			unitWidth,
			values,
			onChangeTexts,
			TextInputCommonProps,
			unit,
		},
		ref,
	) => {
		const inputRefs = useRef([]);

		useImperativeHandle(ref, () => {
			return labels.reduce((acc, _, index) => {
				acc[`input${index + 1}`] = inputRefs.current[index];
				return acc;
			}, {});
		});

		return (
			<View
				style={[
					styles.inputContainer,
					{ justifyContent: 'space-between' },
				]}>
				{labels.map((label, index) => (
					<Pressable
						key={index}
						style={[styles.inputForm, { width: unitWidth }]}
						onPress={() => inputRefs.current[index].focus()}>
						<Text style={{ fontSize: 16 }}> {label} :</Text>
						<TextInput
							ref={el => (inputRefs.current[index] = el)}
							value={values[index]}
							onChangeText={onChangeTexts[index]}
							onSubmitEditing={() =>
								index < 2 &&
								inputRefs.current[index + 1].focus()
							}
							{...TextInputCommonProps}
						/>
						{unit && <Text style={{ fontSize: 16 }}>{unit}</Text>}
					</Pressable>
				))}
			</View>
		);
	},
);

const CMYKForm = forwardRef(
	(
		{
			labels,
			unitWidth,
			values,
			onChangeTexts,
			TextInputCommonProps,
			unit,
		},
		ref,
	) => {
		const inputRefs = useRef([]);

		useImperativeHandle(ref, () => {
			return labels.reduce((acc, _, index) => {
				acc[`input${index + 1}`] = inputRefs.current[index];
				return acc;
			}, {});
		});

		const renderInputField = (label, index) => (
			<Pressable
				key={index}
				style={[styles.inputForm, { width: unitWidth }]}
				onPress={() => inputRefs.current[index].focus()}>
				<Text style={{ fontSize: 16 }}> {label} :</Text>
				<TextInput
					ref={el => (inputRefs.current[index] = el)}
					value={values[index]}
					onChangeText={onChangeTexts[index]}
					onSubmitEditing={() =>
						index < 3 && inputRefs.current[index + 1].focus()
					}
					{...TextInputCommonProps}
				/>
				<Text style={{ fontSize: 16 }}>{unit}</Text>
			</Pressable>
		);
		return (
			<View style={{ gap: 10, width: '75%' }}>
				{labels.slice(0, 2).map((label, index) => (
					<View key={`row1-${index}`} style={styles.inputContainer}>
						{renderInputField(label, index)}
						{renderInputField(labels[index + 2], index + 2)}
					</View>
				))}
			</View>
		);
	},
);

const styles = StyleSheet.create({
	inputContainer: {
		width: '100%',
		height: 40,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		zIndex: 11,
	},
	inputForm: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 5,
		borderColor: COLOR.GRAY_10,
		borderWidth: 1,
	},
});

export default SearchInputForm;
