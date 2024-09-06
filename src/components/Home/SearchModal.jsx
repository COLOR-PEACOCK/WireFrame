import { COLOR } from '@styles/color';
import {
	Modal,
	Pressable,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import { CustomText as Text } from '@components/common/CustomText';
import { SearchInputForm, ListValue, Dropdown, PressButton } from '@components/Home';
import { useEffect, useState } from 'react';
import { cmykToHex, hslToHex, rgbToHex } from '@utils/convertToHex';
import { ArrowGoBackSVG, Formkit_submitSVG } from '@icons';
import { isValidHexCode, isValidKorean } from '@utils/inputValidation';
import useColorName from '@hooks/useColorName';

const SearchModal = ({
	list,
	visible,
	selectedLabel,
	handleCloseModal,
	onPressLabel,
	onPressSearch,
	inputColorValue,
	setInputColorValue,
}) => {
	const [inputValues, setInputValues] = useState({
		part1: '',
		part2: '',
		part3: '',
		part4: '',
	});
	const [searchNameList, setSearchNameList] = useState([]);
	const { getSearchColorList } = useColorName();
	const { contentColor, buttonColor, handleTouchStart, handleTouchEnd } =
		usePressButtonState();

	// 입력 정보 처리
	const handlePressSearch = () => {
		const converters = {
			HEX: values =>
				isValidHexCode(`#${values.part1}`) ? `#${values.part1}` : null,
			RGB: values => rgbToHex(values.part1, values.part2, values.part3),
			HSL: values => hslToHex(values.part1, values.part2, values.part3),
			CMYK: values =>
				cmykToHex(
					values.part1,
					values.part2,
					values.part3,
					values.part4,
				),
			'색상 이름': values => {
				if (isMatch(values)) return searchNameList[0]?.hex;
				else return null;
			},
		};

		const convertToHex = converters[selectedLabel] || (values => values);

		const hexValue = convertToHex(inputValues);
		setInputColorValue(hexValue);
	};

	const isMatch = values => {
		return (
			searchNameList[0]?.name.toLocaleUpperCase() ===
				values.part1.toLocaleUpperCase() ||
			searchNameList[0]?.korean_name === values.part1
		);
	};

	// inputColorValue가 변경됐다는 건 검색 버튼이 눌렸다는 것
	useEffect(() => {
		if (inputColorValue) onPressSearch();
		setInputColorValue('');
	}, [inputColorValue]);

	// 파일 내 색상 이름 검색
	const searchInputColorName = keyword => {
		if (!keyword) {
			setSearchNameList([]);
			return;
		}

		if (isValidKorean(keyword)) {
			setSearchNameList(getSearchColorList('korean_name', keyword));
		} else {
			setSearchNameList(
				getSearchColorList('name', keyword.toLocaleUpperCase()),
			);
		}
	};

	// 자동완성 검색 리스트 찾기
	useEffect(() => {
		if (selectedLabel === '색상 이름') {
			searchInputColorName(inputValues.part1);
		}
	}, [inputValues.part1]);

	// 자동완성 검색 리스트 터치시
	const handlePressSearchList = label =>{
		setInputValues({ ...inputValues, part1: label })
		setSearchNameList([]);
	};

	// 자동완성 검색 리스트 초기화
	useEffect(() => {
		setSearchNameList([]);
	}, [selectedLabel]);

	return (
		<View>
			<Modal
				animationType={'fade'}
				visible={visible}
				transparent={true}
				onRequestClose={handleCloseModal}>
				<Pressable
					style={styles.modalOverlay}
					onPress={handleCloseModal}></Pressable>
				<View style={styles.modalView}>
					<View style={styles.modalHeader}>
						<Text style={styles.modalHeaderText}>
							원하시는 색상을 검색해서 추천하는 색상 조합을
							받아보세요!
						</Text>
					</View>
					<View style={styles.modalBody}>
						<Dropdown
							list={list}
							onClickDropdown={onPressLabel}
							layoutStyle={{
								width: '100%',
								justifyContent: 'center',
							}}
							selectedLabel={selectedLabel}
						/>
						<View style={{}}>
							<SearchInputForm
								selectedLabel={selectedLabel}
								inputValues={inputValues}
								setInputValues={setInputValues}
							/>

							{/* 자동완성 추천 검색어 */}
							{searchNameList.length > 0 &&
								!(searchNameList.length == 1 && isMatch(inputValues)) && (
									<ScrollView
										style={{
											borderColor: COLOR.GRAY_6,
											borderRadius: 8,
											borderWidth: 1,
										}}
										showsVerticalScrollIndicator={false}
										keyboardShouldPersistTaps={'always'}>
										{searchNameList.map(l => (
											<ListValue
												key={l.hex}
												label={l.korean_name || l.name}
												onPressLabel={
													handlePressSearchList
												}
											/>
										))}
									</ScrollView>
								)}
						</View>
					</View>
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={[
								styles.modalButton,
								{
									backgroundColor: COLOR.GRAY_6,
									borderBottomLeftRadius: 8,
								},
							]}
							onPress={handleCloseModal}>
							<ArrowGoBackSVG color={COLOR.WHITE} />
							<Text style={styles.buttonText}> 이전으로</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={[
								styles.modalButton,
								{
									backgroundColor: COLOR.PRIMARY,
									borderBottomRightRadius: 8,
								},
							]}
							onPress={handlePressSearch}>
							<Formkit_submitSVG color={COLOR.WHITE} />
							<Text style={styles.buttonText}> 검색하기</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	);
};

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
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
	},
	modalOverlay: {
		position: 'absolute',
		width: '100%',
		height: '100%',
	},
	closeButton: {
		position: 'absolute',
		zIndex: 10,
		top: 0,
		right: 0,
		width: 48,
		height: 48,
		borderColor: COLOR.BLACK,
		borderWidth: 1,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
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
	buttonText: {
		fontFamily: 'Pretendard-Bold',
		color: COLOR.WHITE,
	},
});

export default SearchModal;
