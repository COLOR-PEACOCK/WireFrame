import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const extractNumbers = str => {
	return str.match(/\d+%?/g).join(', ');
};

const MainColorInfo = ({ colorInfo, labelColor, textColor }) => {
	const rgbNumbers = extractNumbers(colorInfo.rgbVal);
	const hexNumbers = colorInfo.hexVal.slice(1, 8);
	const hslNumbers = extractNumbers(colorInfo.hslVal);
	const cmykNumbers = extractNumbers(colorInfo.cmykVal);

	return (
		<View style={styles.colorInfoContainer}>
			<View style={styles.colorNameContainer}>
				<Text style={[styles.korColorName, { color: labelColor }]}>
					≈{colorInfo.korName}
				</Text>
				<Text style={[styles.engColorName, { color: textColor }]}>
					{colorInfo.engName}
				</Text>
			</View>
			<View style={styles.valueContainer}>
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
					<Text style={[styles.colorDetails, { color: labelColor }]}>
						{hexNumbers}
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
		justifyContent: 'space-between',
	},
	colorNameContainer: {},
	korColorName: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	engColorName: {
		fontSize: 20,
	},
	valueContainer: {
		marginTop: 16,
	},
	valueRow: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginBottom: 3,
	},
	label: {
		width: 50,
		fontSize: 16,
		fontWeight: 'bold',
	},
	colorDetails: {
		fontSize: 16,
		marginLeft: 12,
	},
});

export default MainColorInfo;
