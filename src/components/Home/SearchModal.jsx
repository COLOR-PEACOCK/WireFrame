import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { COLOR } from '@styles/color';
import { CustomText as Text } from '@components/common';
import { SearchInputForm, ListValue, Dropdown } from '@components/Home';
import { useSearchModalState } from '@hooks/home';
import { ArrowGoBackSVG, FormkitSubmitSVG } from '@icons';

const SearchModal = ({ visible, handleCloseModal, onPressSearch }) => {
	const {
		selectedLabel,
		inputValues,
		setInputValues,
		searchNameList,
		isKeywordKor,
		handlePressLabel,
		handlePressSearch,
		handlePressSearchList,
	} = useSearchModalState(onPressSearch);

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
												key={item.hex ?? 'list'}
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
