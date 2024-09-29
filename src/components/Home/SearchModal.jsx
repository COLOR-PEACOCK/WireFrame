import React, { useState, useEffect } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { COLOR } from '@styles/color';
import { CustomText as Text } from '@components/common';
import { SearchInputForm, ListValue, Dropdown } from '@components/Home';
import { ArrowGoBackSVG, FormkitSubmitSVG } from '@icons';

import { useColorName } from '@hooks';
import {
	isValidKorean,
	INPUT_TYPES,
	stringFormat,
	colorConverter,
} from '@utils/home';

const initValue = {
	part1: '',
	part2: '',
	part3: '',
	part4: '',
};

const SearchModal = ({ visible, handleCloseModal, onPressSearch }) => {
	const [selectedLabel, setSelectedLabel] = useState('색상 이름');
	const handlePressLabel = label => setSelectedLabel(label);
	const [inputValues, setInputValues] = useState(initValue);
	const [searchNameList, setSearchNameList] = useState([]);
	const [isKeywordKor, setIsKeywordKor] = useState(false);
	const { getSearchColorList } = useColorName();

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

	return (
		<View>
			<Modal
				animationType="fade"
				visible={visible}
				transparent
				onRequestClose={handleCloseModal}>
				<Pressable
					style={styles.modalOverlay}
					onPress={handleCloseModal}
				/>
				<View style={styles.modalView}>
					<View style={styles.modalHeader}>
						<Text style={styles.modalHeaderText}>
							원하시는 색상을 검색해서 추천하는 색상 조합을
							받아보세요!
						</Text>
					</View>
					<View style={styles.modalBody}>
						<Dropdown
							list={dummy_list}
							onClickDropdown={handlePressLabel}
							layoutStyle={{
								width: '100%',
								justifyContent: 'center',
							}}
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
									keyboardShouldPersistTaps="always">
									{searchNameList.map(item => {
										const currentKeyword = isKeywordKor
											? item.korean_name
											: item.name;
										return (
											<ListValue
												key={item.hex}
												label={currentKeyword}
												onPressLabel={() =>
													handlePressSearchList(
														currentKeyword,
													)
												}
											/>
										);
									})}
								</ScrollView>
							)}
						</View>
					</View>
					<View style={styles.buttonContainer}>
						<Pressable
							style={({ pressed }) => [
								{
									backgroundColor: pressed
										? COLOR.GRAY_7
										: COLOR.GRAY_6,
									borderBottomLeftRadius: 8,
								},
								styles.closeButton,
								styles.modalButton,
							]}
							onPress={handleCloseModal}>
							<ArrowGoBackSVG color={COLOR.WHITE} />
							<Text style={styles.buttonText}>이전으로</Text>
						</Pressable>

						<Pressable
							style={({ pressed }) => [
								{
									backgroundColor: pressed
										? '#5F1AB6'
										: COLOR.PRIMARY,
									borderBottomRightRadius: 8,
								},
								styles.searchButton,
								styles.modalButton,
							]}
							onPress={handlePressSearch}>
							<FormkitSubmitSVG color={COLOR.WHITE} />
							<Text style={styles.buttonText}>검색하기</Text>
						</Pressable>
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
		marginTop: 100,
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
		backgroundColor: 'rgba(0,0,0, 0.8)',
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
		borderBottomLeftRadius: 8,
	},
	searchButton: {
		borderBottomRightRadius: 8,
	},
	buttonText: {
		fontFamily: 'Pretendard-Bold',
		color: COLOR.WHITE,
		marginLeft: 6,
	},
});

export default SearchModal;
