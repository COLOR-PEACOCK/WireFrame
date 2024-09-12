import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import tinycolor from 'tinycolor2';

// images
import adjustment from '@icons/adjustment.png';
import adjustment_dark from '@icons/adjustment_dark.png';

const extractNumbers = str => {
	return str.match(/\d+%?/g)?.join(', ');
};

const MainColorInfo = ({
	colorInfo,
	labelColor,
	textColor,
	setIsPickerVisible,
}) => {
	const rgbNumbers = extractNumbers(colorInfo.rgbVal);
	const hexNumbers = colorInfo.hexVal.slice(1, 8);
	const hslNumbers = extractNumbers(colorInfo.hslVal);
	const cmykNumbers = extractNumbers(colorInfo.cmykVal);

	const getIconSource = labelColor => {
		// 색상값을 통한 이미지 소스 교체
		// labelColor가 밝으면 밝은 이미지, 어두우면 어두운 이미지
		const color = tinycolor(labelColor);
		return color.isDark() ? adjustment_dark : adjustment;
	};

	return (
		<View style={styles.colorInfoContainer}>
			<View
				style={{
					flex: 1,
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'flex-start',
					width: '100%',
				}}>
				<View>
					<Text style={[styles.korColorName, { color: labelColor }]}>
						≈{colorInfo.korName}
					</Text>
					<Text style={[styles.engColorName, { color: textColor }]}>
						{colorInfo.engName}
					</Text>
				</View>
				<TouchableOpacity onPress={() => setIsPickerVisible(true)}>
					<Image
						source={getIconSource(labelColor)}
						style={[styles.icon, { tintColor: labelColor }]}
					/>
				</TouchableOpacity>
			</View>

			<View>
				<View style={styles.valueRow}>
					<Text style={[styles.label, { color: labelColor }]}>
						RGB
					</Text>
					<Text style={[styles.colorDetails, { color: textColor }]}>
						{rgbNumbers}
					</Text>
				</View>
				<View style={styles.valueRow}>
					<Text style={[styles.label, { color: labelColor }]}>
						HEX
					</Text>
					<Text style={[styles.colorDetails, { color: textColor }]}>
						{hexNumbers.toUpperCase()}
					</Text>
				</View>
				<View style={styles.valueRow}>
					<Text style={[styles.label, { color: labelColor }]}>
						HSL
					</Text>
					<Text style={[styles.colorDetails, { color: textColor }]}>
						{hslNumbers}
					</Text>
				</View>
				<View style={styles.valueRow}>
					<Text style={[styles.label, { color: labelColor }]}>
						CMYK
					</Text>
					<Text style={[styles.colorDetails, { color: textColor }]}>
						{cmykNumbers}
					</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	colorInfoContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
	korColorName: {
		fontSize: 22,
		fontFamily: 'Pretendard-Bold',
	},
	engColorName: {
		fontSize: 18,
		fontFamily: 'Pretendard-Regular',
		textTransform: 'lowercase',
	},
	valueRow: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	label: {
		width: 68,
		fontSize: 16,
		fontFamily: 'Pretendard-Bold',
		textTransform: 'uppercase',
	},
	colorDetails: {
		fontSize: 16,
		marginLeft: 12,
	},
	icon: {
		width: 38,
		height: 38,
		marginTop: 8,
	},
});

export default MainColorInfo;
