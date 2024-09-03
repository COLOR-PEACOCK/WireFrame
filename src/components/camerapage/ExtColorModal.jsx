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
					width: 64,
					height: 64,
					backgroundColor: extColor.bgColor,
					borderRadius: 8,
				}}
			/>
			<View
				style={{
					gap: 6,
					width: parentlayout.width / 2.314,
				}}>
				<View>
					<Text style={styles.korcolors}>≈{extColor.korName}</Text>
					<Text style={styles.engcolors}>{extColor.engName}</Text>
				</View>

				<Text style={styles.hexcolors}>HEX:{extColor.hexColor}</Text>
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
		justifyContent: 'center',
		gap: 16,
	},
	korcolors: {
		color: COLOR.WHITE,
		fontSize: 14,
		fontWeight: '700',
	},
	engcolors: { color: COLOR.WHITE, fontSize: 12 },
	hexcolors: {
		color: COLOR.GRAY_6,
		fontSize: 12,
		fontFamily: 'Pretendard-Light',
	},
});
export default ExtColorModal;
