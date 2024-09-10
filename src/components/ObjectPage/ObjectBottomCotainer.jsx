import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { COLOR } from '@styles/color';
import { CustomText as Text } from '@components/common/CustomText';

import { BackButton } from '@icons/objecticon/objectIcon.js';
import ChangeGenderButton from './ChangeGenderButton.jsx';
import CategoryButton from './CategoryButton.jsx';
import RenderItemList from './RenderItemList.jsx';

const ObjectBottomCotainer = ({ setDroppedItems, gender, setGender }) => {
	const [itemData, setItemData] = useState(null);
	const [activeTab, setActiveTab] = useState('');

	//성별 데이터 분기 처리
	useEffect(() => {
		const loadItemData = async () => {
			if (gender) {
				const maleData = await import(
					//절대경로 추가해야 됨
					'../../assets/data/objectdata/maleItemData.js'
				);
				setItemData(maleData.default);
			} else {
				const femaleData = await import(
					'../../assets/data/objectdata/femaleItemData.js'
				);
				setItemData(femaleData.default);
			}
		};
		loadItemData();
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
						onPress={() => setActiveTab('')}
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
					/>
				</View>
			) : (
				<View style={styles.tabViewContainer}>
					<ChangeGenderButton gender={gender} setGender={setGender} />
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
		borderBottomWidth: 1,
		borderBottomColor: COLOR.GRAY_5,
	},
});
export default ObjectBottomCotainer;
