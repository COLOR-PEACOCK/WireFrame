import { COLOR } from '@styles/color';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { CustomText as Text } from '@components/common/CustomText';

const RenderItemList = ({
	setDroppedItems,
	itemData,
	activeTab,
	setIsColorPickerOpen,
	setSelectedItemId,
}) => {
	//아이템 플랫 리스트 렌더
	const renderItem = ({ item }) => {
		return (
			<View>
				<TouchableOpacity
					onPress={() => handleItemSelect(item)}
					style={styles.touchableItem}>
					{item.svg}
					<Text style={styles.applyText}>Click to apply</Text>
				</TouchableOpacity>
			</View>
		);
	};

	//아이템 선택 이벤트
	const handleItemSelect = item => {
		setSelectedItemId(prevId => {
			// 같은 아이템을 다시 선택한 경우
			if (prevId === item.id) {
				// setIsColorPickerOpen(false);
				return null; // 선택 해제
			}

			// 새로운 아이템을 선택한 경우
			// setIsColorPickerOpen(true);
			return item.id;
		});

		setDroppedItems(prevItems => {
			//수정 가능한 동적 아이템 생성
			const newItem = {
				...item,
				svg: React.cloneElement(item.svg),
			};
			// 같은 카테고리의 아이템 인덱스 찾기
			const sameCategoryItemIndex = prevItems.findIndex(
				i => i.category === item.category,
			);
			if (sameCategoryItemIndex !== -1) {
				// 같은 카테고리의 아이템이 있으면 교체
				return prevItems.map((prevItem, index) =>
					index === sameCategoryItemIndex ? newItem : prevItem,
				);
			} else {
				// 새로운 카테고리의 아이템이면 추가
				return [...prevItems, newItem];
			}
		});
	};
	return (
		<FlatList
			data={itemData[activeTab] || []}
			renderItem={renderItem}
			horizontal={true}
			keyExtractor={item => item.id}
			contentContainerStyle={styles.flatListContent}
			showsHorizontalScrollIndicator={false}
		/>
	);
};

const styles = StyleSheet.create({
	flatListContent: {
		alignItems: 'center',
		paddingHorizontal: 10,
	},
	touchableItem: {
		width: 150,
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 5,
		borderLeftWidth: 1,
		borderLeftColor: COLOR.GRAY_5,
		gap: 4,
	},
	applyText: {
		fontFamily: 'Pretendard-Medium',
		color: COLOR.GRAY_7,
	},
});
export default RenderItemList;
