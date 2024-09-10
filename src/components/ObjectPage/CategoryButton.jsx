import { COLOR } from '@styles/color';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { CustomText as Text } from '@components/common/CustomText';

import {
	ClothesTop,
	ClothesBottom,
	Shoes,
	Cap,
} from '@icons/objecticon/objectIcon.js';

// 탭 데이터
const tabs = [
	{
		key: 'clothesTop',
		title: '상의',
		subtitle: 'clothes top',
		icon: ClothesTop,
	},
	{
		key: 'clothesBottom',
		title: '하의',
		subtitle: 'clothes bottom',
		icon: ClothesBottom,
	},
	{ key: 'shoes', title: '신발', subtitle: 'shoes', icon: Shoes },
	{ key: 'caps', title: '모자', subtitle: 'caps', icon: Cap },
];

const CategoryButton = ({ setActiveTab }) => {
	// 탭 버튼 이벤트
	const buttonEvent = ({ item }) => {
		setActiveTab(item.key);
	};
	return (
		<View style={styles.categoryContainer}>
			{tabs.map(item => (
				<TouchableOpacity
					key={item.key}
					style={styles.categoryWrapper}
					onPress={() => buttonEvent({ item })}>
					<Image
						source={item.icon}
						style={{ width: 44, height: 44 }}
					/>
					<View>
						<Text style={styles.title}>{item.title}</Text>
						<Text style={styles.subtitle}>{item.subtitle}</Text>
					</View>
				</TouchableOpacity>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	categoryContainer: { flexDirection: 'row', flexWrap: 'wrap' },
	categoryWrapper: {
		flexDirection: 'row',
		gap: 4,
		width: 173,
		height: 77,
		borderLeftWidth: 1,
		borderBottomWidth: 1,
		borderColor: COLOR.GRAY_5,
		alignItems: 'center',
		paddingHorizontal: 16,
	},
	title: {
		fontFamily: 'Prentendard-Medium',
		fontSize: 18,
		color: COLOR.GRAY_10,
	},
	subtitle: {
		color: COLOR.GRAY_7,
	},
});
export default CategoryButton;
