import { COLOR } from '@styles/color';
import {
	FlatList,
	Modal,
	Pressable,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import { CustomText as Text } from '@components/common/CustomText';
import { SearchInputForm, ListValue, Dropdown } from '@components/Home';
import { useEffect, useState } from 'react';

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

	const handlePressSearch = () => {
		switch (selectedLabel) {
			case '색상 이름':
				return setInputColorValue(inputValues.part1);
			case 'HEX':
				return setInputColorValue('#' + inputValues.part1);
			case 'RGB':
				return setInputColorValue(
					`rgb(${inputValues.part1}, ${inputValues.part2}, ${inputValues.part3})`,
				);
			case 'HSL':
				return setInputColorValue(
					`HSL(${inputValues.part1}, ${inputValues.part2}, ${inputValues.part3})`,
				);
			case 'CMYK':
				return setInputColorValue(
					`CMYK(${inputValues.part1}%, ${inputValues.part2}%, ${inputValues.part3}% ${inputValues.part4}%)`,
				);
			default:
				return setInputColorValue(inputValues);
		}
	};
	useEffect(() => {
		onPressSearch();
	}, [inputColorValue]);

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
						</View>
					</View>
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={styles.cancelButton}
							onPress={handleCloseModal}>
							<Text style={{ color: COLOR.WHITE }}>이전으로</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.searchButton}
							onPress={handlePressSearch}>
							<Text style={{ color: COLOR.WHITE }}>검색하기</Text>
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
	cancelButton: {
		width: '50%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLOR.GRAY_6,
		borderBottomLeftRadius: 8,
	},
	searchButton: {
		width: '50%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLOR.PRIMARY,
		borderBottomRightRadius: 8,
	},
});

export default SearchModal;
