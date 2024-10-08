import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import MaleBodySvg from '@images/objectitems/bodyimages/male_body.svg';
import FeMaleBodySvg from '@images/objectitems/bodyimages/female__body.svg';
import CanvasDroppedItem from '@components/ObjectPage/CanvasDroppedItem';
import { heightScale, widthScale } from '@utils/scaling';

const ObjectCanvas = ({
	droppedItems,
	setDroppedItems,
	setSelectedItemId,
	selectedItemId,
	gender,
	defaultItems,
	activeTab,
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
		//탭 관리
		if (activeTab === null) {
			if (newSelectedId !== null) {
				setActiveTab(category);
			}
		} else {
			setActiveTab(prevTab => (prevTab === category ? null : category));
		}
		// 컬러피커 바텀시트 관리
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
			// 기본 아이템이 아닌 경우 삭제
			setDroppedItems(prevItems =>
				prevItems.filter(item => item.id !== id),
			);
		}
		// 기본 아이템인 경우 유지

		setSelectedItemId(null);
		setIsColorPickerOpen(false);
		setActiveTab(null);
	};
	return (
		<View style={styles.canvas}>
			<View style={styles.avatarContainer}>
				{gender ? (
					<MaleBodySvg width="100%" height="100%" />
				) : (
					<FeMaleBodySvg width="100%" height="100%" />
				)}
				{droppedItems.map(item => (
					<CanvasDroppedItem
						key={item.id}
						item={item}
						isSelected={selectedItemId === item.id}
						onSelect={() =>
							handleItemSelect(item.id, item.category)
						}
						onDelete={() =>
							handleItemDelete(item.id, item.category)
						}
					/>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	canvas: {
		flex: 1,
		borderRadius: 10,
		marginTop: heightScale(18),
		marginBottom: heightScale(88),
		alignItems: 'center',
		justifyContent: 'center',
	},
	avatarContainer: {
		width: heightScale(170),
		height: heightScale(480),
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default ObjectCanvas;
