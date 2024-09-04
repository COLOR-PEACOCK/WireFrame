import React from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native';
import GoBackIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import tinycolor from 'tinycolor2';
import { COLOR } from '@styles/color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const extractNumbers = str => {
	if (!str) return '';
	const matchedNumbers = str.match(/\d+%?/g) || [];
	return matchedNumbers.join(', ');
};

const ColorInfoModal = ({ isVisible, onClose, colorInfo, selectedColor }) => {
	const korTextColor = tinycolor(selectedColor).isLight()
		? COLOR.GRAY_10
		: COLOR.WHITE;
	const engTextColor = tinycolor(selectedColor).isLight()
		? COLOR.GRAY_8
		: COLOR.GRAY_6;
	const rgbNumbers = extractNumbers(colorInfo.rgbVal);
	const hexNumbers = colorInfo.hexVal.slice(1, 8);
	const hslNumbers = extractNumbers(colorInfo.hslVal);
	const cmykNumbers = extractNumbers(colorInfo.cmykVal);

	return (
		<Modal transparent={true} visible={isVisible} onRequestClose={onClose}>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<View style={styles.contentContainer}>
						<View style={styles.colorPreviewContainer}>
							<View
								style={[
									styles.colorPreview,
									{ backgroundColor: selectedColor },
								]}>
								<Text
									style={[
										styles.korColorName,
										{ color: korTextColor },
									]}>
									≈{colorInfo.korName}
								</Text>
								<Text
									style={[
										styles.engColorName,
										{ color: engTextColor },
									]}>
									{colorInfo.engName}
								</Text>
							</View>
						</View>
						<View style={styles.valueContainer}>
							<View style={styles.valueRow}>
								<Text style={styles.label}>RGB</Text>
								<Text style={styles.colorDetails}>
									{rgbNumbers}
								</Text>
							</View>
							<View style={styles.valueRow}>
								<Text style={styles.label}>HEX</Text>
								<Text style={styles.colorDetails}>
									{hexNumbers}
								</Text>
							</View>
							<View style={styles.valueRow}>
								<Text style={styles.label}>HSL</Text>
								<Text style={styles.colorDetails}>
									{hslNumbers}
								</Text>
							</View>
							<View style={styles.valueRow}>
								<Text style={styles.label}>CMYK</Text>
								<Text style={styles.colorDetails}>
									{cmykNumbers}
								</Text>
							</View>
						</View>
					</View>
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={[styles.button, styles.cancelButton]}
							onPress={onClose}>
							<GoBackIcon
								name="arrow-left"
								size={16}
								color={COLOR.WHITE}
							/>
							<Text style={styles.buttonText}>이전으로</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
	},
	modalContent: {
		width: 342,
		height: 512,
		backgroundColor: 'white',
		padding: 0,
		borderRadius: 8,
		alignItems: 'center',
		overflow: 'hidden',
		borderColor: COLOR.GRAY_3,
		borderWidth: 1,
	},
	contentContainer: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
	},
	colorPreviewContainer: {
		width: '100%',
	},
	colorPreview: {
		width: '100%',
		height: 347.69,
		position: 'relative',
	},
	korColorName: {
		fontSize: 24,
		fontWeight: 'bold',
		position: 'absolute',
		left: 18,
		bottom: 40,
	},
	engColorName: {
		fontSize: 20,
		position: 'absolute',
		left: 18,
		bottom: 10,
	},
	buttonContainer: {
		width: '100%',
		position: 'absolute',
		bottom: 0,
	},
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
	},
	cancelButton: {
		backgroundColor: COLOR.PRIMARY,
	},
	buttonText: {
		color: COLOR.WHITE,
		fontWeight: 'bold',
		fontSize: 14,
		marginLeft: 8,
	},
	valueContainer: {
		marginTop: 12,
		marginLeft: 9,
		alignItems: 'flex-start',
		width: '100%',
	},
	valueRow: {
		marginLeft: 9,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginBottom: 3,
	},
	label: {
		width: 50,
		fontSize: 16,
		color: COLOR.GRAY_8,
		fontWeight: 'bold',
	},
	colorDetails: {
		fontSize: 16,
		marginLeft: 12,
		color: COLOR.GRAY_6,
	},
});

export default ColorInfoModal;
