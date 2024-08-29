import { COLOR } from '@styles/color';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/FontAwesome';

const ColorInfo = ({ selectedColor, parentlayout, setIsOpen, isOpen }) => {
	const bottomSheetRef = useRef(null);

	useEffect(() => {
		isOpen
			? bottomSheetRef.current?.snapToIndex(1)
			: bottomSheetRef.current?.snapToIndex(0);
	}, [isOpen]);

	const handleSheetChanges = useCallback(index => {
		//index는 0,1값만 가짐
		setIsOpen(index);
	}, []);

	//터치가 잘 안돼서 일단 유기
	// const tapAction = () => {
	// 	bottomSheetRef.current?.snapToIndex(0);
	// 	console.log('work');
	// };

	const CustomHandle = () => (
		<TouchableOpacity
			// onPress={tapAction}
			style={[
				styles.customHandle,
				{ left: parentlayout.width / 2 - 17.5 },
			]}>
			{isOpen ? (
				<Icon name={'angle-down'} color={COLOR.PRIMARY} size={24} />
			) : (
				<Icon name={'angle-up'} color={COLOR.PRIMARY} size={24} />
			)}
		</TouchableOpacity>
	);

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<BottomSheet
				ref={bottomSheetRef}
				snapPoints={[40, 140]}
				onChange={handleSheetChanges}
				handleComponent={CustomHandle}
				backgroundComponent={null}>
				<BottomSheetView style={styles.contentContainer}>
					<View style={styles.infowrapper}>
						<View
							style={{
								width: 74,
								height: 74,
								backgroundColor: selectedColor?.rgb,
								marginLeft: 70,
							}}
						/>
						<View>
							<Text style={styles.engcolors}>Light Blue</Text>
							<Text
								style={{
									color: COLOR.WHITE,
									fontSize: 12,
								}}>
								≈연한 파랑
							</Text>
							<Text style={styles.codecolors}>
								HEX:{selectedColor?.hex}
							</Text>
							<Text style={styles.codecolors}>
								HSL: 18.5, 5.2%, 48.8%
							</Text>
						</View>
					</View>
				</BottomSheetView>
			</BottomSheet>
		</GestureHandlerRootView>
	);
};
const styles = StyleSheet.create({
	customHandle: {
		width: 35,
		height: 35,
		right: '50%',
		backgroundColor: COLOR.GRAY_9,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 50 / 2,
		marginBottom: 6,
	},

	contentContainer: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
	},

	infowrapper: {
		flexDirection: 'row',
		height: 100,
		alignItems: 'center',
		gap: 16,
	},
	engcolors: {
		color: COLOR.WHITE,
		fontSize: 14,
		fontWeight: '700',
	},
	codecolors: {
		color: COLOR.GRAY_6,
		fontSize: 12,
		fontFamily: 'Pretendard-Light',
	},
});

export default ColorInfo;
