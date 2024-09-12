import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { COLOR } from '@styles/color';
import { CustomText as Text } from '@components/common/CustomText';

import { BackButton } from '@icons/objecticon/objectIcon.js';
import ChangeGenderButton from './ChangeGenderButton.jsx';
import CategoryButton from './CategoryButton.jsx';
import RenderItemList from './RenderItemList.jsx';

import maleItemData from '../../assets/data/objectdata/maleItemData';
import femaleItemData from '../../assets/data/objectdata/femaleItemData';

const ObjectBottomCotainer = ({
	setDroppedItems,
	gender,
	setGender,
	setIsColorPickerOpen,
	setSelectedItemId,
	setDefaultItems,
	activeTab,
	setActiveTab,
}) => {
	const [itemData, setItemData] = useState(null);

	// 마운트 시 초기 아이템
	useEffect(() => {
		const initialItemData = gender ? maleItemData : femaleItemData;
		setItemData(initialItemData);
		const defaultItems = getDefaultItems(initialItemData);
		setDroppedItems(defaultItems);
		setDefaultItems(defaultItems);
	}, []);

	// 기본 아이템 선택 함수
	const getDefaultItems = useCallback(data => {
		return [data.clothesTop[0], data.clothesBottom[0], data.socks[0]];
	}, []);

	// 성별과 아이템 아이템 변경 함수
	const handleGenderChange = useCallback(() => {
		const newGender = !gender;
		const newItemData = newGender ? maleItemData : femaleItemData;
		const defaultItems = getDefaultItems(newItemData);

		setGender(newGender);
		setDroppedItems(defaultItems);
		setDefaultItems(defaultItems);
		setItemData(newItemData);
	}, [gender]);

	return (
		<View style={styles.bottomContainer}>
			<View style={styles.categoryBar}>
				<Text style={styles.barkorname}>분류항목</Text>
				<Text style={styles.barengname}>CATEGORY</Text>
			</View>
			{activeTab ? (
				<View style={styles.tabViewContainer}>
					<TouchableOpacity
						onPress={() => setActiveTab(null)}
						style={styles.backButtonWrapper}>
						<Image
							source={BackButton}
							style={{ width: 24, height: 25 }}
						/>
					</TouchableOpacity>
					<RenderItemList
						setDroppedItems={setDroppedItems}
						itemData={itemData}
						activeTab={activeTab}
						setIsColorPickerOpen={setIsColorPickerOpen}
						setSelectedItemId={setSelectedItemId}
					/>
				</View>
			) : (
				<View style={styles.tabViewContainer}>
					<ChangeGenderButton
						gender={gender}
						genderChange={handleGenderChange}
					/>
					<CategoryButton setActiveTab={setActiveTab} />
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	bottomContainer: {
		flex: 1,
	},
	categoryBar: {
		height: 29,
		backgroundColor: '#873EF1',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		gap: 6,
	},
	barkorname: {
		color: COLOR.GRAY_1,
		fontFamily: 'Pretendard-Medium',
		fontSize: 14,
	},
	barengname: {
		color: COLOR.WHITE,
		fontFamily: 'Pretendard-Light',
		fontSize: 12,
	},
	tabViewContainer: {
		flex: 1,
		flexDirection: 'row',
	},
	backButtonWrapper: {
		width: 64,
		justifyContent: 'center',
		alignItems: 'center',
		borderRightWidth: 1,
		borderRightColor: COLOR.GRAY_5,
		borderBottomWidth: 1,
		borderBottomColor: COLOR.GRAY_5,
	},
});
export default ObjectBottomCotainer;
