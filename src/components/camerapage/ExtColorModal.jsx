import { COLOR } from '@styles/color';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ExtColorModal = ({ parentlayout, extColor }) => {
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
					borderRadius: 8,
				}}
			/>
			<View>
				<Text style={styles.korcolors}>≈{extColor.korName}</Text>
				<Text style={{ color: COLOR.WHITE, fontSize: 12 }}>
					{extColor.engName}
				</Text>
				<Text style={styles.codecolors}>HEX:{extColor.hexColor}</Text>
				<Text style={styles.codecolors}>HSL: 18.5, 5.2%, 48.8%</Text>
			</View>
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
	korcolors: {
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
export default ExtColorModal;
