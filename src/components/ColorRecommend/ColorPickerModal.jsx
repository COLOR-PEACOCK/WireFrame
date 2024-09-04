import React from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native';
import ColorPicker, { Panel1, HueSlider } from 'reanimated-color-picker';
import { COLOR } from '@styles/color';
import tinycolor from 'tinycolor2';
import GoBackIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const ColorPickerModal = ({
	isVisible,
	tempColor,
	setTempColor,
	onSave,
	onCancel,
}) => {
	const textColor = tinycolor(tempColor).isLight()
		? COLOR.GRAY_9
		: COLOR.GRAY_2;
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={isVisible}
			onRequestClose={onCancel}>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<ColorPicker
						value={tempColor}
						onComplete={selectedColor =>
							setTempColor(selectedColor.hex)
						}
						style={styles.colorPicker}>
						<View style={styles.panelContainer}>
							<Panel1 style={styles.panel} />
						</View>
						<View style={styles.hueSliderContainer}>
							<View style={styles.titleContainer}>
								<Text style={styles.korTitle}>선택할 색상</Text>
								<Text style={styles.engTitle}>
									Choose color
								</Text>
							</View>
							<HueSlider style={styles.hueSlider} />
						</View>
						<View style={styles.colorPreviewContainer}>
							<View style={styles.titleContainer}>
								<Text style={styles.korTitle}>활성화 색상</Text>
								<Text style={styles.engTitle}>
									Reanimated color
								</Text>
							</View>
							<View
								style={[
									styles.colorPreview,
									{ backgroundColor: tempColor },
								]}>
								<Text
									style={[
										styles.colorText,
										{ color: textColor },
									]}>
									{tempColor.toUpperCase()}
								</Text>
							</View>
						</View>
					</ColorPicker>

					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={[styles.button, styles.cancelButton]}
							onPress={onCancel}>
							<GoBackIcon
								name="arrow-u-left-top"
								style={styles.buttonText}
							/>
							<Text style={styles.buttonText}>이전으로</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.button, styles.saveButton]}
							onPress={onSave}>
							<Text style={styles.buttonText}>저장하기</Text>
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
	colorPicker: {
		width: '100%',
		flex: 1,
	},
	panelContainer: {
		width: '100%',
		height: 347.69,
		marginBottom: 6,
	},
	panel: {
		flex: 1,
		borderRadius: 0,
	},
	hueSliderContainer: {
		alignItems: 'center',
		width: '100%',
		borderRadius: 30,
	},
	hueSlider: {
		width: 306,
		height: 30,
		marginBottom: 9,
		borderRadius: 30,
		opacity: 1,
		alignSelf: 'center',
	},
	titleContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		width: 306,
		marginBottom: 3,
	},
	korTitle: {
		fontSize: 12,
		fontWeight: 'bold',
		color: COLOR.GRAY_8,
		marginRight: 3,
	},
	engTitle: {
		fontSize: 10,
		color: COLOR.GRAY_6,
		marginTop: 3,
	},
	colorPreviewContainer: {
		marginBottom: 20,
		alignItems: 'center',
		width: '100%',
	},
	colorPreview: {
		height: 30,
		borderRadius: 30,
		width: 306,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 10,
		alignSelf: 'center',
	},
	colorText: {
		textAlign: 'center',
		lineHeight: 18,
		fontWeight: 'bold',
		fontSize: 12,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 18,
		width: '100%',
	},
	button: {
		padding: 12,
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	cancelButton: {
		backgroundColor: COLOR.GRAY_6,
		flexDirection: 'row',
	},
	saveButton: {
		backgroundColor: COLOR.PRIMARY,
	},
	buttonText: {
		color: COLOR.WHITE,
		fontWeight: 'bold',
		fontSize: 14,
	},
	icon: {
		width: 16,
		height: 16,
		marginRight: 8,
	},
});

export default ColorPickerModal;
