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
import { heightScale } from '@utils/scaling';

const CanvasDroppedItem = ({ item, isSelected, onSelect, onDelete }) => {
	const getItemPosition = item => ({
		left: heightScale(item.canvasX),
		top: heightScale(item.canvasY),
		width: heightScale(item.canvasWidth),
		height: heightScale(item.canvasHeight),
		zIndex: item.zIndex,
	});

	const getFocusButtonPosition = category => {
		const positions = {
			clothesTop: { top: heightScale(-352), right: heightScale(-148) },
			clothesBottom: { top: heightScale(-230), right: heightScale(-148) },
			shoes: { top: heightScale(-90), right: heightScale(-148) },
			socks: { top: heightScale(-100), right: heightScale(90) },
		};
		return (
			positions[category] || {
				top: heightScale(-90),
				right: heightScale(-100),
			}
		);
	};

	const getCategoryIcon = (category, isVisible) => {
		const icons = {
			clothesTop: ClothesTopGray,
			clothesBottom: ClothesBottomGray,
			shoes: ShoesGray,
			socks: isVisible ? DisableSocks : Socks,
		};
		return icons[category];
	};

	const focusButtonPosition = getFocusButtonPosition(item.category);

	return (
		<View>
			{(item.category !== 'socks' || item.isVisible !== false) && (
				<Pressable
					onPress={onSelect}
					style={[styles.droppedItem, getItemPosition(item)]}>
					{React.cloneElement(item.svg, {
						width: '100%',
						height: ' 100%',
						fill: item.color || '#FBFBFB',
					})}
				</Pressable>
			)}
			<TouchableOpacity
				style={[
					styles.focusButton,
					isSelected && styles.focusButtonSelected,
					focusButtonPosition,
				]}
				onPress={onSelect}>
				<Image
					source={getCategoryIcon(item.category, item.isVisible)}
					style={{ width: heightScale(28), height: heightScale(28) }}
				/>
			</TouchableOpacity>
			{isSelected && item.category !== 'socks' && (
				<TouchableOpacity
					style={[
						styles.trashButton,
						{
							top: focusButtonPosition.top - heightScale(3),
							right: focusButtonPosition.right - heightScale(49),
						},
					]}
					onPress={() => onDelete(item.id)}>
					<Image
						source={TrashIcon}
						style={{
							width: heightScale(15),
							height: heightScale(23),
						}}
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
		borderRadius: heightScale(50),
		borderWidth: heightScale(2),
		borderColor: COLOR.GRAY_4,
		width: heightScale(48),
		height: heightScale(48),
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
		width: heightScale(100),
		height: heightScale(54),
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingRight: heightScale(20),
		zIndex: 1000,
	},
});
export default CanvasDroppedItem;
