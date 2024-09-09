import React, { useState, useEffect } from 'react';
import {
	Modal,
	Pressable,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';

import { COLOR } from '@styles/color';
import { CustomText as Text } from '@components/common/CustomText';
import { SearchInputForm, ListValue, Dropdown } from '@components/Home';
import { ArrowGoBackSVG, FormkitSubmitSVG } from '@icons';

import useColorName from '@hooks/useColorName';
import { cmykToHex, hslToHex, rgbToHex, isValidHexCode, isValidKorean, INPUT_TYPES } from '@utils/home';

const colorConverter = {
	[INPUT_TYPES.HEX]: values => (isValidHexCode(`#${values.part1}`) ? `#${values.part1}` : null),
	[INPUT_TYPES.RGB]: values => rgbToHex(values.part1, values.part2, values.part3) ?? null,
	[INPUT_TYPES.HSL]: values => hslToHex(values.part1, values.part2, values.part3) ?? null,
	[INPUT_TYPES.CMYK]: values => cmykToHex(values.part1, values.part2, values.part3, values.part4) ?? null,
	[INPUT_TYPES.COLOR_NAME]: (values, searchNameList) => {
		const matchedColor = searchNameList.find(
			color =>
				color.name?.toUpperCase() === values.part1?.toUpperCase() ||
				color.korean_name === values.part1,
		);
		return matchedColor ? matchedColor.hex : null;
	},
};

const SearchModal = ({
	visible,
	handleCloseModal,
	onPressSearch,
}) => {
	const [selectedLabel, setSelectedLabel] = useState('색상 이름');
	const handlePressLabel = label => setSelectedLabel(label);
	const [inputValues, setInputValues] = useState({ part1: '', part2: '', part3: '', part4: '' });
	const [searchNameList, setSearchNameList] = useState([]);
	const { getSearchColorList } = useColorName();

	// 검색어 입력 시 색상 리스트 업데이트
	useEffect(() => {
		const updateSearchList = () => {
			const keyword = inputValues.part1;
			if (!keyword) {
				setSearchNameList([]);
				return;
			}
			const isKorean = isValidKorean(keyword);
			setSearchNameList(getSearchColorList(isKorean, keyword));
		};

		if (selectedLabel === INPUT_TYPES.COLOR_NAME) {
			updateSearchList();
		} else {
			setSearchNameList([]); // 다른 검색 타입 선택 시 리스트 초기화
		}
	}, [inputValues.part1, selectedLabel]); 

	// 검색 버튼 터치 시 
	const handlePressSearch = () => {
		const convertColorToHex = colorConverter[selectedLabel] || (values => values);
		const hexValue = convertColorToHex(inputValues, searchNameList); 
		if (hexValue)
			onPressSearch(hexValue);
		else console.log('fail')
	};

	// 자동완성 검색 리스트 터치 시
	const handlePressSearchList = label => {
		setInputValues({ ...{part1: label} });
		// 터치하고 자동완성 숨기기
	};

	return (
		<View>
			<Modal
				animationType="fade"
				visible={visible}
				transparent
				onRequestClose={handleCloseModal}
			>
				<Pressable style={styles.modalOverlay} onPress={handleCloseModal} />
				<View style={styles.modalView}>
					<View style={styles.modalHeader}>
						<Text style={styles.modalHeaderText}>
							원하시는 색상을 검색해서 추천하는 색상 조합을 받아보세요!
						</Text>
					</View>
					<View style={styles.modalBody}>
						<Dropdown
							list={dummy_list}
							onClickDropdown={handlePressLabel}
							layoutStyle={{ width: '100%', justifyContent: 'center' }}
							selectedLabel={selectedLabel}
						/>
						<View>
							<SearchInputForm
								selectedLabel={selectedLabel}
								inputValues={inputValues}
								setInputValues={setInputValues}
							/>
							{/* 자동완성 검색어 리스트 */}
							{searchNameList.length > 0 && (
								<ScrollView
									style={styles.searchResults}
									showsVerticalScrollIndicator={false}
									keyboardShouldPersistTaps="always" 
								>
									{searchNameList.map(item => (
										<ListValue
											key={item.hex}
											label={item.korean_name || item.name}
											onPressLabel={() => handlePressSearchList(item.korean_name || item.name)} 
										/>
									))}
								</ScrollView>
							)}
						</View>
					</View>
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={[styles.modalButton, styles.closeButton]}
							onPress={handleCloseModal}
						>
							<ArrowGoBackSVG color={COLOR.WHITE} />
							<Text style={styles.buttonText}> 이전으로</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.modalButton, styles.searchButton]}
							onPress={handlePressSearch}
						>
							<FormkitSubmitSVG color={COLOR.WHITE} />
							<Text style={styles.buttonText}> 검색하기</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	);
};

const dummy_list = ['색상 이름', 'HEX', 'RGB', 'HSL', 'CMYK'];

const styles = StyleSheet.create({
	modalView: {
		width: '85%',
		marginTop: 150,
		marginHorizontal: 'auto',
		paddingTop: 18,
		zIndex: 5,
		backgroundColor: COLOR.WHITE,
		borderRadius: 8,
		elevation: 5,
		shadowColor: COLOR.BLACK,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
	},
	modalOverlay: {
		position: 'absolute',
		width: '100%',
		height: '100%',
	},
	modalHeader: {
		width: '100%',
		paddingBottom: 18,
		marginBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: COLOR.GRAY_3,
	},
	modalHeaderText: {
		fontFamily: 'Pretendard-Bold',
		textAlign: 'center',
		color: COLOR.GRAY_6,
		fontSize: 12,
	},
	modalBody: {
		marginHorizontal: 18,
		gap: 18,
	},
	searchResults: {
		borderColor: COLOR.GRAY_6,
		borderRadius: 8,
		borderWidth: 1,
	},
	buttonContainer: {
		height: 64,
		marginTop: 18,
		flexDirection: 'row',
	},
	modalButton: {
		width: '50%',
		height: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	closeButton: {
		backgroundColor: COLOR.GRAY_6,
		borderBottomLeftRadius: 8,
	},
	searchButton: {
		backgroundColor: COLOR.PRIMARY,
		borderBottomRightRadius: 8,
	},
	buttonText: {
		fontFamily: 'Pretendard-Bold',
		color: COLOR.WHITE,
	},
});

export default SearchModal;