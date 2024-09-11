import React from 'react';
import { View, Modal, Text, StyleSheet, Pressable, Image } from 'react-native';
import tinycolor from 'tinycolor2';
import { COLOR } from '@styles/color';

// icons
import GoBackIcon from '@icons/go-back.png';

const extractNumbers = str => {
	if (!str) return '';
	const matchedNumbers = str.match(/\d+%?/g) || [];
	return matchedNumbers.join(', ');
};

const ColorInfoModal = ({
	isVisible,
	onClose,
	colorInfo,
	selectedColor,
	description,
}) => {
	const korTextColor = tinycolor(selectedColor).isLight()
		? COLOR.GRAY_10
		: COLOR.WHITE;
	const engTextColor = tinycolor(selectedColor).isLight()
		? COLOR.GRAY_9
		: COLOR.GRAY_3;
	const rgbNumbers = extractNumbers(colorInfo.rgbVal);
	const hexNumbers = colorInfo.hexVal.slice(1, 8);
	const hslNumbers = extractNumbers(colorInfo.hslVal);
	const cmykNumbers = extractNumbers(colorInfo.cmykVal);

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={isVisible}
			onRequestClose={onClose}>
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
								{description &&<Text
									style={[
										styles.engColorName,
										{ color: engTextColor,
											paddingBottom: 10
										},
									]}>
									{description}
								</Text>}
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
									{hexNumbers.toUpperCase()}
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
						<Pressable
							style={({ pressed }) => [
								{
									backgroundColor: pressed
										? '#5F1AB6'
										: COLOR.PRIMARY,
								},
								styles.button,
							]}
							onPress={onClose}>
							<Image
								source={GoBackIcon}
								style={styles.buttonIcon}
							/>
							<Text style={styles.buttonText}>이전으로</Text>
						</Pressable>
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
		overflow: 'hidden',
		width: 342,
		height: 512,
		padding: 0,
		backgroundColor: COLOR.WHITE,
		borderWidth: 1,
		borderRadius: 8,
		borderColor: COLOR.GRAY_3,
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
		height: 348,
		position: 'relative',
		justifyContent: 'flex-end',
		gap: 4,
	},
	korColorName: {
		marginHorizontal: 18,
		fontSize: 24,
		fontFamily: 'Pretendard-Bold',
	},
	engColorName: {
		marginHorizontal: 18,
		fontSize: 18,
		fontFamily: 'Pretendard-Regular',
		textTransform: 'lowercase',
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
	buttonText: {
		color: COLOR.WHITE,
		fontSize: 14,
		fontFamily: 'Pretendard-Bold',
		marginLeft: 6,
	},
	buttonIcon: {
		width: 14,
		height: 14,
	},
	valueContainer: {
		width: '100%',
		paddingVertical: 12,
		paddingHorizontal: 18,
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
		color: COLOR.GRAY_5,
	},
	colorDetails: {
		fontSize: 14,
		fontFamily: 'Pretendard-Regular',
		color: COLOR.GRAY_10,
	},
});

export default ColorInfoModal;
