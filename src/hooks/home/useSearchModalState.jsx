import { useEffect, useState } from 'react';
import { useColorName } from '@hooks';
import {
	INPUT_TYPES,
	colorConverter,
	isValidKorean,
	stringFormat,
} from '@utils/home';

const useSearchModalState = onPressSearch => {
	const initValue = {
		part1: '',
		part2: '',
		part3: '',
		part4: '',
	};

	const [selectedLabel, setSelectedLabel] = useState('색상 이름');
	const [inputValues, setInputValues] = useState(initValue);
	const [searchNameList, setSearchNameList] = useState(['l']);
	const [isKeywordKor, setIsKeywordKor] = useState(false);
	const { getSearchColorList } = useColorName();

	const handlePressLabel = label => setSelectedLabel(label);

	// 검색어 입력 시 색상 리스트 업데이트
	useEffect(() => {
		const updateSearchList = () => {
			const keyword = stringFormat(inputValues.part1);
			if (!keyword) {
				setSearchNameList([]);
				return;
			}
			setIsKeywordKor(isValidKorean(keyword));
			setSearchNameList(
				getSearchColorList(isValidKorean(keyword), keyword),
			);
		};
		if (selectedLabel === INPUT_TYPES.COLOR_NAME) {
			updateSearchList();
		} else {
			setSearchNameList([]); // 다른 검색 타입 선택 시 리스트 초기화
		}
	}, [inputValues.part1, selectedLabel]);

	useEffect(() => {
		setInputValues(initValue);
	}, [selectedLabel]);

	// 검색 버튼 터치 시
	const handlePressSearch = () => {
		const convertValueToHex =
			colorConverter[selectedLabel] || (values => values);
		const hexValue = convertValueToHex(inputValues, searchNameList);
		if (hexValue) onPressSearch(hexValue);
		else console.log('fail');
	};

	// 자동완성 검색 리스트 터치 시
	const handlePressSearchList = label => {
		setInputValues({ ...{ part1: label } });
		// 자동완성 터치하면 숨기기?
	};

	return {
		selectedLabel,
		inputValues,
		setInputValues,
		searchNameList,
		isKeywordKor,
		handlePressLabel,
		handlePressSearch,
		handlePressSearchList,
	};
};

export default useSearchModalState;
