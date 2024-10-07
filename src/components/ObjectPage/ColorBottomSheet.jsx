import React, { useEffect, useRef, useState } from 'react';
import {
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLOR } from '@styles/color';
import { heightScale } from '@utils/scaling';

const colorContainer = require('@images/objectitems/background/cricle__wrapper.png');

const ColorBottomSheet = ({
	colors,
	selectedItemId,
	setDroppedItems,
	isColorPickerOpen,
	setIsColorPickerOpen,
}) => {
	const bottomSheetRef = useRef(null);

	// const colors = ['#576490', '#A52A2A', '#D8BFD8', '#FBFBFB', '#3F3A3A'];

	//컬러 팔레트 터치 이벤트
	const handleColorSelect = color => {
		if (selectedItemId) {
			setDroppedItems(prevItems =>
				prevItems.map(item =>
					item.id === selectedItemId
						? { ...item, color: color }
						: item,
				),
			);
		}
	};
	useEffect(() => {
		isColorPickerOpen
			? bottomSheetRef.current?.snapToIndex(1)
			: bottomSheetRef.current?.snapToIndex(0);
	}, [isColorPickerOpen]);

	// 커스텀 핸들러 터치 이벤트
	const handlerTouchEvent = () => {
		setIsColorPickerOpen(!isColorPickerOpen);
	};

	// 커스텀 핸들 렌더링
	const CustomHandle = () => (
		<View style={styles.customHandlerContainer}>
			<TouchableOpacity
				onPress={handlerTouchEvent}
				style={[styles.customHandle]}>
				{isColorPickerOpen ? (
					<Icon
						name={'angle-down'}
						color={COLOR.PRIMARY}
						size={heightScale(24)}
					/>
				) : (
					<Icon
						name={'angle-up'}
						color={COLOR.PRIMARY}
						size={heightScale(24)}
					/>
				)}
			</TouchableOpacity>
		</View>
	);

	return (
		<View style={styles.colorContainer}>
			<BottomSheet
				ref={bottomSheetRef}
				snapPoints={[heightScale(40), heightScale(108)]}
				enableHandlePanningGesture={false}
				handleComponent={CustomHandle}
				backgroundComponent={null}>
				<ImageBackground
					source={colorContainer}
					style={{
						flex: 1,
					}}>
					<View style={styles.colorWrapper}>
						{colors.map((color, index) => (
							<TouchableOpacity
								key={index}
								style={[
									styles.colorBox,
									{ backgroundColor: color },
								]}
								onPress={() => handleColorSelect(color)}
							/>
						))}
					</View>
				</ImageBackground>
			</BottomSheet>
		</View>
	);
};

const styles = StyleSheet.create({
	customHandlerContainer: {
		height: heightScale(40),
		alignItems: 'center',
	},
	customHandle: {
		width: heightScale(28),
		height: heightScale(28),
		backgroundColor: COLOR.GRAY_9,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 50,
		marginTop: heightScale(1),
	},
	colorContainer: {
		position: 'absolute',
		// height: 105,
		height: '100%',
		// backgroundColor: 'red',
		width: '100%',
		zIndex: 1000,
	},
	colorWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		paddingTop: heightScale(20),
	},
	colorBox: {
		width: heightScale(60),
		height: heightScale(24),
		borderRadius: 4,
	},
});
export default ColorBottomSheet;
