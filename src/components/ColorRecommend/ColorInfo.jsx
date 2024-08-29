import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ColorInfo = ({ colorInfo, textColor }) => (
	<View style={styles.colorInfoContainer}>
		<Text style={[styles.colorName, { color: textColor }]}>
			{colorInfo.engName}
		</Text>
		<Text style={[styles.colorDetails, { color: textColor }]}>
			{colorInfo.rgbVal}
		</Text>
		<Text style={[styles.colorDetails, { color: textColor }]}>
			{colorInfo.hexVal}
		</Text>
		<Text style={[styles.colorDetails, { color: textColor }]}>
			{colorInfo.hslVal}
		</Text>
		<Text style={[styles.colorDetails, { color: textColor }]}>
			{colorInfo.cmykVal}
		</Text>
	</View>
);

const styles = StyleSheet.create({
	colorInfoContainer: {
		flex: 1,
		marginRight: 10,
	},
	colorName: {
		fontSize: 20,
	},
	colorDetails: {
		marginTop: 5,
	},
});

export default ColorInfo;
