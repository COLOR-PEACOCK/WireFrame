import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import MaleBodySvg from '@images/objectitems/bodyimages/male_body.svg';
import FeMaleBodySvg from '@images/objectitems/bodyimages/female__body.svg';
import CanvasDroppedItem from '@components/ObjectPage/CanvasDroppedItem';

const ObjectCanvas = ({
	droppedItems,
	setDroppedItems,
	setSelectedItemId,
	selectedItemId,
	gender,
	defaultItems,
	setActiveTab,
	setIsColorPickerOpen,
}) => {
	const toggleSocksVisibility = id => {
		setDroppedItems(prevItems =>
			prevItems.map(item =>
				item.id === id ? { ...item, isVisible: !item.isVisible } : item,
			),
		);
	};

	const handleItemSelect = (id, category) => {
		if (category === 'socks') {
			toggleSocksVisibility(id);
			setSelectedItemId(prevId => (prevId === id ? null : id));
			return;
		}

		const newSelectedId = id === selectedItemId ? null : id;
		setSelectedItemId(newSelectedId);
		setActiveTab(prevTab => (prevTab === category ? null : category));

		if (newSelectedId !== null) {
			setIsColorPickerOpen(true);
		} else {
			setIsColorPickerOpen(false);
		}
	};

	const handleItemDelete = (id, category) => {
		const itemToDelete = droppedItems.find(item => item.id === id);

		if (
			itemToDelete.category === 'clothesTop' ||
			itemToDelete.category === 'clothesBottom'
		) {
			// 상의나 하의인 경우, 해당 카테고리의 기본 아이템으로 교체
			const defaultItem = defaultItems.find(
				item => item.category === itemToDelete.category,
			);
			setDroppedItems(prevItems =>
				prevItems.map(item =>
					item.id === id ? { ...defaultItem, id: item.id } : item,
				),
			);
		} else if (!itemToDelete.isDefault) {
			// 기본 아이템이 아닌 경우(신발, 양말, 모자 등), 완전히 삭제
			setDroppedItems(prevItems =>
				prevItems.filter(item => item.id !== id),
			);
			setActiveTab(prevCategory =>
				prevCategory === category ? null : category,
			);
		}
		// 기본 아이템(isDefault가 true)인 경우는 아무 작업도 하지 않습니다.

		setSelectedItemId(null);
		setIsColorPickerOpen(false);
	};
	return (
		<View style={styles.canvas}>
			{gender ? (
				<MaleBodySvg width={170} height={480} />
			) : (
				<FeMaleBodySvg width={170} height={480} />
			)}
			{droppedItems.map(item => (
				<CanvasDroppedItem
					key={item.id}
					item={item}
					isSelected={selectedItemId === item.id}
					onSelect={() => handleItemSelect(item.id, item.category)}
					onDelete={() => handleItemDelete(item.id, item.category)}
				/>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	canvas: {
		flex: 1,
		borderRadius: 10,
		marginTop: 16,
		alignItems: 'center',
	},
});

export default ObjectCanvas;
