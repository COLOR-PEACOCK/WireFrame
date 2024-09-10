import { useEffect, useRef, useState } from 'react';
import { INPUT_TYPES } from '@utils/home';

const useInputState = selectedLabel => {
	const inputRef = useRef([]);
	const [inputOption, setInputOption] = useState(inputTypeMap['색상 이름']);
	useEffect(() => {
		setInputOption(inputTypeMap[selectedLabel]);
		inputRef.current[0]?.focus();
	}, [selectedLabel]);

	const handleFocusNext = index => {
		if (index < inputOption.labels.length - 1) {
			inputRef.current[index + 1]?.focus();
		}
	};

	const handleAutoFocus = (index, text) => {
		if (text.length >= inputOption.maxLength) {
			handleFocusNext(index, text);
		}
	};

	const handlePressInputForm = index => {
		inputRef.current[index]?.focus();
	};

	return {
		inputOption,
		inputRef,
		handleFocusNext,
		handleAutoFocus,
		handlePressInputForm,
	};
};

const inputTypeMap = {
	[INPUT_TYPES.COLOR_NAME]: {
		labels: ['입력'],
		placeholders: ['(한글, 영어)'],
		maxLength: undefined,
		keyboardType: 'default',
	},
	[INPUT_TYPES.HEX]: {
		labels: ['#'],
		placeholders: ['ffffff'],
		maxLength: 6,
		keyboardType: 'default',
	},
	[INPUT_TYPES.RGB]: {
		labels: ['R', 'G', 'B'],
		placeholders: ['0~255', '0~255', '0~255'],
		unit: ['', '', ''],
		maxLength: 3,
		keyboardType: 'number-pad',
	},
	[INPUT_TYPES.HSL]: {
		labels: ['H', 'S', 'L'],
		placeholders: ['0~360', '0~100', '0~100'],
		unit: ['°', '%', '%'],
		maxLength: 3,
		keyboardType: 'number-pad',
	},
	[INPUT_TYPES.CMYK]: {
		labels: ['C', 'M', 'Y', 'K'],
		placeholders: ['0~100', '0~100', '0~100', '0~100'],
		unit: ['%', '%', '%', '%'],
		maxLength: 3,
		keyboardType: 'number-pad',
	},
};

export default useInputState;
