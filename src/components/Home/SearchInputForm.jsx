import { StyleSheet, TextInput, View } from 'react-native';
import { CustomText as Text } from '@components/common/CustomText';
import { COLOR } from '@styles/color';
import {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from 'react';

const SearchInputForm = ({ selectedLabel }) => {
	const [inputValue, setInputValue] = useState('');
	const [inputPart1, setInputPart1] = useState('');
	const [inputPart2, setInputPart2] = useState('');
	const [inputPart3, setInputPart3] = useState('');
	const [inputPart4, setInputPart4] = useState('');

	const inputRef = useRef(null);

	useEffect(() => {
		setInputPart1('');
		setInputPart2('');
		setInputPart3('');
		setInputPart4('');
	}, [selectedLabel]);

	const handleChangeValue = text => setInputValue(text);

	const handleInput1 = text => {
		setInputPart1(text);
		if (selectedLabel === 'RGB' || selectedLabel === 'HSL' || selectedLabel === 'CMYK') {
			if (text.length >= 3) inputRef.current.input2.focus();
		}
	};
	const handleInput2 = text => {
		setInputPart2(text);
		if (selectedLabel === 'RGB' || selectedLabel === 'HSL' || selectedLabel === 'CMYK') {
			if (text.length >= 3) inputRef.current.input3.focus();
		}
	};
	const handleInput3 = text => {
		setInputPart3(text);
		if (selectedLabel === 'CMYK') {
			if (text.length >= 3) inputRef.current.input4.focus();
		}
	};
	const handleInput4 = text => {
		setInputPart4(text);
	};

	switch (selectedLabel) {
		case '색상 이름':
			return (
				<NameForm
					ref={inputRef}
					value={inputPart1}
					onChangeText={handleInput1}
				/>
			);
		case 'HEX':
			return (
				<HexForm
					ref={inputRef}
					value={inputPart1}
					onChangeText={handleInput1}
				/>
			);
		case 'RGB':
			return (
				<RGBForm
					ref={inputRef}
					input1Props={{
						value: inputPart1,
						onChangeText: handleInput1,
					}}
					input2Props={{
						value: inputPart2,
						onChangeText: handleInput2,
					}}
					input3Props={{
						value: inputPart3,
						onChangeText: handleInput3,
					}}
				/>
			);
		case 'CMYK':
			return (
				<CMYKForm
					ref={inputRef}
					input1Props={{
						value: inputPart1,
						onChangeText: handleInput1,
					}}
					input2Props={{
						value: inputPart2,
						onChangeText: handleInput2,
					}}
					input3Props={{
						value: inputPart3,
						onChangeText: handleInput3,
					}}
					input4Props={{
						value: inputPart4,
						onChangeText: handleInput4,
					}}
				/>
			);
		case 'HSL':
			return (
				<HSLForm
					ref={inputRef}
					input1Props={{
						value: inputPart1,
						onChangeText: handleInput1,
					}}
					input2Props={{
						value: inputPart2,
						onChangeText: handleInput2,
					}}
					input3Props={{
						value: inputPart3,
						onChangeText: handleInput3,
					}}
				/>
			);
		default:
			<NameForm />;
	}
};

const NameForm = forwardRef((props, ref) => {
	useEffect(() => {
		inputRef1.current.focus();
	}, []);
	const inputRef1 = useRef(null);

	useImperativeHandle(ref, () => ({
		input1: inputRef1.current,
	}));

	return (
		<View style={styles.inputContainer}>
			<TextInput
				ref={inputRef1}
				style={[styles.inputForm, { width: '80%' }]}
				placeholder={'(한글, 영어)'}
				placeholderTextColor={COLOR.GRAY_6}
				{...props}
			/>
		</View>
	);
});

const HexForm = forwardRef((props, ref) => {
	return (
		<View style={styles.inputContainer}>
			<Text>#</Text>
			<TextInput
				ref={ref}
				style={[styles.inputForm, { width: '80%' }]}
				placeholder={'ffffff'}
				placeholderTextColor={COLOR.GRAY_6}
				maxLength={6}
			/>
		</View>
	);
});

const RGBForm = forwardRef((props, ref) => {
	useEffect(() => {
		inputRef1.current.focus();
	}, []);
	const inputRef1 = useRef(null);
	const inputRef2 = useRef(null);
	const inputRef3 = useRef(null);

	useImperativeHandle(ref, () => ({
		input1: inputRef1.current,
		input2: inputRef2.current,
		input3: inputRef3.current,
	}));

	return (
		<View style={styles.inputContainer}>
			<TextInput
				ref={inputRef1}
				style={[styles.inputForm, { width: '25%' }]}
				placeholder={'R'}
				placeholderTextColor={COLOR.GRAY_6}
				keyboardType="number-pad"
				maxLength={3}
				{...props.input1Props}
			/>
			<TextInput
				ref={inputRef2}
				style={[styles.inputForm, { width: '25%' }]}
				key={'G'}
				placeholder={'G'}
				placeholderTextColor={COLOR.GRAY_6}
				keyboardType="number-pad"
				maxLength={3}
				{...props.input2Props}
			/>
			<TextInput
				ref={inputRef3}
				style={[styles.inputForm, { width: '25%' }]}
				placeholder={'B'}
				placeholderTextColor={COLOR.GRAY_6}
				keyboardType="number-pad"
				maxLength={3}
				{...props.input3Props}
			/>
		</View>
	);
});

const CMYKForm = forwardRef((props, ref) => {
	useEffect(() => {
		inputRef1.current.focus();
	}, []);
	const inputRef1 = useRef(null);
	const inputRef2 = useRef(null);
	const inputRef3 = useRef(null);
	const inputRef4 = useRef(null);

	useImperativeHandle(ref, () => ({
		input1: inputRef1.current,
		input2: inputRef2.current,
		input3: inputRef3.current,
		input4: inputRef4.current,
	}));
	return (
		<View style={styles.inputContainer}>
			<TextInput
				ref={inputRef1}
				style={[styles.inputForm, { width: '25%' }]}
				placeholder={'C'}
				placeholderTextColor={COLOR.GRAY_6}
				keyboardType="number-pad"
				maxLength={3}
				{...props.input1Props}
			/>
			<TextInput
				ref={inputRef2}
				style={[styles.inputForm, { width: '25%' }]}
				placeholder={'M'}
				placeholderTextColor={COLOR.GRAY_6}
				keyboardType="number-pad"
				maxLength={3}
				{...props.input2Props}
			/>
			<TextInput
				ref={inputRef3}
				style={[styles.inputForm, { width: '25%' }]}
				placeholder={'Y'}
				placeholderTextColor={COLOR.GRAY_6}
				keyboardType="number-pad"
				maxLength={3}
				{...props.input3Props}
			/>
			<TextInput
				ref={inputRef4}
				style={[styles.inputForm, { width: '25%' }]}
				placeholder={'K'}
				placeholderTextColor={COLOR.GRAY_6}
				keyboardType="number-pad"
				maxLength={3}
				{...props.input4Props}
			/>
		</View>
	);
});

const HSLForm = forwardRef((props, ref) => {
	useEffect(() => {
		inputRef1.current.focus();
	}, []);
	const inputRef1 = useRef(null);
	const inputRef2 = useRef(null);
	const inputRef3 = useRef(null);

	useImperativeHandle(ref, () => ({
		input1: inputRef1.current,
		input2: inputRef2.current,
		input3: inputRef3.current,
	}));
	return (
		<View style={styles.inputContainer}>
			<TextInput
				ref={inputRef1}
				style={[styles.inputForm, { width: '25%' }]}
				placeholder={'H'}
				placeholderTextColor={COLOR.GRAY_6}
				keyboardType={'number-pad'}
				maxLength={3}
				{...props.input1Props}
			/>
			<TextInput
				ref={inputRef2}
				style={[styles.inputForm, { width: '25%' }]}
				placeholder={'S'}
				placeholderTextColor={COLOR.GRAY_6}
				keyboardType={'number-pad'}
				maxLength={3}
				{...props.input2Props}
			/>
			<TextInput
				ref={inputRef3}
				style={[styles.inputForm, { width: '25%' }]}
				placeholder={'L'}
				placeholderTextColor={COLOR.GRAY_6}
				keyboardType={'number-pad'}
				maxLength={3}
				{...props.input3Props}
			/>
		</View>
	);
});

const NumberInput = ({ style, ...rest }) => {
	return (
		<TextInput
			style={style}
			placeholderTextColor={COLOR.GRAY_6}
			keyboardType={'number-pad'}
			maxLength={3}
			{...rest}
		/>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		width: 205,
		flexDirection: 'row',
		alignItems: 'center',
	},
	inputForm: {
		borderBottomWidth: 1,
		borderRadius: 8,
		borderColor: COLOR.GRAY_8,
	},
});

export default SearchInputForm;
