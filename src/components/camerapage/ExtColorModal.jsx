import { COLOR } from '@styles/color';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const cameraswitch = require('@icons/camera-switch.png');

const ExtColorModal = ({ parentlayout, extColor, setCameraType }) => {
	const cameraSwitch = () =>
		setCameraType(prevType => (prevType === 'back' ? 'front' : 'back'));

	return (
		<View
			style={[
				styles.colormodal,
				{
					height: parentlayout.height / 7.15,
				},
			]}>
			<View
				style={{
					width: 78,
					height: 78,
					backgroundColor: extColor.bgColor,
					marginLeft: 70,
				}}
			/>
			<View>
				<Text style={styles.engcolors}>Light Blue</Text>
				<Text style={{ color: COLOR.WHITE, fontSize: 12 }}>
					≈연한 파랑
				</Text>
				<Text style={styles.codecolors}>HEX:{extColor.hexColor}</Text>
				<Text style={styles.codecolors}>HSL: 18.5, 5.2%, 48.8%</Text>
			</View>
			<TouchableOpacity
				onPress={cameraSwitch}
				style={styles.switchbuttonwrapper}>
				<Image
					source={cameraswitch}
					style={{ width: 28, height: 28 }}
				/>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	colormodal: {
		position: 'absolute',
		width: '100%',
		backgroundColor: 'rgba(11, 11, 11, 0.8)',
		flexDirection: 'row',
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
	switchbuttonwrapper: {
		width: 48,
		height: 48,
		backgroundColor: COLOR.GRAY_9,
		borderRadius: 50,
		top: 80,
		right: -16,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
export default ExtColorModal;
