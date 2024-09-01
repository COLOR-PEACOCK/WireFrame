import { COLOR } from '@styles/color';
import { FlatList, Modal, Pressable, StyleSheet, View } from 'react-native';
import { CustomText as Text } from '@components/common/CustomText';
import { SearchInputForm, ListValue } from '@components/Home';
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
	const renderItem = ({ item }) => {
		return (
			<View style={{ width: '100%' }}>
				<ListValue
					textStyle={{
						fontFamily: 'Pretendard-Medium',
						fontSize: 16,
					}}
					key={item}
					label={item}
					isActive={item === selectedLabel}
					onPressLabel={onPressLabel}
				/>
			</View>
		);
	};
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
					`CMYK(${inputValues.part1}%, ${inputValues.part2}%, ${inputValues.part3}%)`,
				);
			default:
				return setInputColorValue(inputValues);
		}
	};
	useEffect(() => {
		onPressSearch();
	}, [inputColorValue]);
	const isCMYK = selectedLabel === 'CMYK';
	return (
		<View>
			<Modal
				animationType={'fade'}
				visible={visible}
				transparent={true}
				onRequestClose={handleCloseModal}>
				<Pressable
					style={styles.modalOverlay}
					onPress={() => {
						handleCloseModal();
					}}></Pressable>
				<View style={styles.modalView}>
					<Pressable
						style={styles.closeButton}
						onPress={() => {
							handleCloseModal();
						}}>
						<Text>X</Text>
					</Pressable>
					{/* <View style={styles.modalHeader}>
						<Text style={styles.modalHeaderText}>
							Modal Header Text
						</Text>
					</View> */}
					<View style={styles.modalBody}>
						<FlatList
							data={list}
							renderItem={renderItem}
							keyboardShouldPersistTaps={'always'}
						/>
						<View
							style={{
								gap: '25%',
								flexDirection: isCMYK ? 'row' : 'column',
								justifyContent: 'space-between',
							}}>
							<SearchInputForm
								selectedLabel={selectedLabel}
								inputValues={inputValues}
								setInputValues={setInputValues}
							/>

							<Pressable
								style={[
									styles.searchButton,
									{
										width: isCMYK ? '20%' : '30%',
										height: isCMYK ? 90 : 40,
										left: isCMYK ? 0 : '70%',
									},
								]}
								onPress={handlePressSearch}>
								<Text style={{ color: COLOR.WHITE }}>검색</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	modalView: {
		width: '85%',
		marginTop: 200,
		marginHorizontal: 'auto',
		paddingVertical: 24,
		zIndex: 5,
		backgroundColor: COLOR.WHITE,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: COLOR.PRIMARY,
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
		paddingBottom: 24,
		marginBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: COLOR.BLACK,
	},
	modalHeaderText: {
		fontFamily: 'Pretendard-Bold',
		textAlign: 'center',
		fontSize: 18,
	},
	modalBody: {
		marginHorizontal: 50,
		gap: 10,
	},
	searchButton: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLOR.SECONDARY,
		borderRadius: 5,
	},
});

export default SearchModal;
