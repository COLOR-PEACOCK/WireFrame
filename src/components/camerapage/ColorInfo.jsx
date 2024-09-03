import { COLOR } from '@styles/color';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/FontAwesome';

const cameraswitch = require('@icons/camera-switch.png');

const ColorInfo = ({
	selectedColor,
	parentlayout,
	setIsOpen,
	isOpen,
	setCameraType,
}) => {
	const bottomSheetRef = useRef(null);
	const cameraSwitch = () =>
		setCameraType(prevType => (prevType === 'back' ? 'front' : 'back'));

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
		<View>
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

			<TouchableOpacity
				// onPress={cameraSwitch}
				onPress={() => {
					console.log('됨?');
				}}
				style={styles.switchbuttonwrapper}>
				<Image
					source={cameraswitch}
					style={{ width: 28, height: 28 }}
				/>
			</TouchableOpacity>
		</View>
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
								borderRadius: 8,
							}}
						/>
						<View
							style={{
								gap: 6,
								width: parentlayout.width / 2.314,
							}}>
							<View>
								<Text style={styles.korcolors}>
									≈{selectedColor?.korName}
								</Text>
								<Text style={styles.engcolors}>
									{selectedColor?.engName}
								</Text>
							</View>

							<Text style={styles.hexcolors}>
								HEX:{selectedColor?.hex}
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
		marginTop: 6,
		width: 28,
		height: 28,
		right: '50%',
		backgroundColor: COLOR.GRAY_9,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 50 / 2,
		marginBottom: 6,
	},
	switchbuttonwrapper: {
		width: 48,
		height: 48,
		position: 'absolute',
		backgroundColor: COLOR.GRAY_9,
		borderRadius: 50,
		top: -16,
		right: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},

	contentContainer: {
		flex: 1,
		backgroundColor: 'rgba(11, 11, 11, 0.85)',
	},

	infowrapper: {
		flexDirection: 'row',
		height: 100,
		alignItems: 'center',
		gap: 16,
	},
	korcolors: {
		color: COLOR.WHITE,
		fontSize: 14,
		fontWeight: '700',
	},
	engcolors: {
		color: COLOR.WHITE,
		fontSize: 12,
	},
	hexcolors: {
		color: COLOR.GRAY_6,
		fontSize: 12,
		fontFamily: 'Pretendard-Light',
	},
});

export default ColorInfo;
