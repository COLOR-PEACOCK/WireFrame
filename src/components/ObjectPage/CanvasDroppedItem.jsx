import React from 'react';
import {
	Image,
	Pressable,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import { COLOR } from '@styles/color';
import {
	ClothesTopGray,
	ClothesBottomGray,
	ShoesGray,
	Socks,
	DisableSocks,
	TrashIcon,
} from '@icons/objecticon/objectIcon.js';

const CanvasDroppedItem = ({ item, isSelected, onSelect, onDelete }) => {
	const getItemPosition = item => ({
		left: item.canvasX,
		top: item.canvasY,
		width: item.canvasWidth,
		height: item.canvasHeight,
		zIndex: item.zIndex,
	});

	const getFocusButtonPosition = category => {
		const positions = {
			clothesTop: { top: -352, right: -142 },
			clothesBottom: { top: -230, right: -142 },
			shoes: { top: -90, right: -150 },
			socks: { top: -100, right: 90 },
		};
		return positions[category] || { top: -90, right: -100 };
	};

	const getCategoryIcon = category => {
		const icons = {
			clothesTop: ClothesTopGray,
			clothesBottom: ClothesBottomGray,
			shoes: ShoesGray,
			socks: Socks,
		};
		return icons[category];
	};

	const focusButtonPosition = getFocusButtonPosition(item.category);

	return (
		<View>
			<Pressable
				onPress={onSelect}
				style={[styles.droppedItem, getItemPosition(item)]}>
				{React.cloneElement(item.svg, {
					width: item.canvasWidth,
					height: item.canvasHeight,
					fill: item.color || '#FBFBFB',
				})}
			</Pressable>
			<TouchableOpacity
				style={[
					styles.focusButton,
					isSelected && styles.focusButtonSelected,
					focusButtonPosition,
				]}
				onPress={onSelect}>
				<Image
					source={getCategoryIcon(item.category)}
					style={{ width: 28, height: 28 }}
				/>
			</TouchableOpacity>
			{isSelected && (
				<TouchableOpacity
					style={[
						styles.trashButton,
						{
							top: focusButtonPosition.top - 3,
							right: focusButtonPosition.right - 49,
						},
					]}
					onPress={() => onDelete(item.id)}>
					<Image
						source={TrashIcon}
						style={{ width: 15, height: 23 }}
					/>
				</TouchableOpacity>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	droppedItem: {
		position: 'absolute',
	},
	focusButton: {
		position: 'absolute',
		backgroundColor: COLOR.GRAY_1,
		borderRadius: 50,
		borderWidth: 2,
		borderColor: COLOR.GRAY_4,
		width: 48,
		height: 48,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1001,
	},
	focusButtonSelected: {
		borderColor: COLOR.PRIMARY,
	},
	trashButton: {
		position: 'absolute',
		backgroundColor: COLOR.GRAY_3,
		flexDirection: 'row',
		borderRadius: 50,
		width: 100,
		height: 54,
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingRight: 20,
		zIndex: 1000,
	},
});
export default CanvasDroppedItem;
