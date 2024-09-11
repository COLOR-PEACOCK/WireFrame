import React, { useState } from 'react';
import {
	View,
	Modal,
	Text,
	StyleSheet,
	Image,
	Pressable,
} from 'react-native';
import ColorPicker, { Panel1, HueSlider } from 'reanimated-color-picker';
import { COLOR } from '@styles/color';
import tinycolor from 'tinycolor2';

// icons
import GoBackIcon from '@icons/go-back.png';
import DownloadIcon from '@icons/download.png';

const ColorPickerModal = ({
	isVisible,
	tempColor,
	setTempColor,
	onCancel,
	setIsPickerVisible,
}) => {
	const [currentColor, setCurrentColor] = useState(tempColor);
	const textColor = tinycolor(tempColor).isLight()
		? COLOR.GRAY_9
		: COLOR.GRAY_2;

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={isVisible}
			onRequestClose={onCancel}>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<ColorPicker
						value={currentColor}
						onComplete={selectedColor =>
							setCurrentColor(selectedColor.hex)
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
									{ backgroundColor: currentColor },
								]}>
								<Text
									style={[
										styles.colorText,
										{ color: textColor },
									]}>
									{currentColor.toUpperCase()}
								</Text>
							</View>
						</View>
					</ColorPicker>

					<View style={styles.buttonContainer}>
						<Pressable
							style={({ pressed }) => [
								{
									backgroundColor: pressed
										? COLOR.GRAY_7
										: COLOR.GRAY_6,
								},
								styles.button,
							]}
							onPress={onCancel}>
							<Image
								source={GoBackIcon}
								style={styles.buttonIcon}
							/>
							<Text style={styles.buttonText}>이전으로</Text>
						</Pressable>

						<Pressable
							style={({ pressed }) => [
								{
									backgroundColor: pressed
										? '#5F1AB6'
										: COLOR.PRIMARY,
								},
								styles.button,
							]}
							onPress={() => {
								setIsPickerVisible(false);
								setTempColor(currentColor);
							}}>
							<Image
								source={DownloadIcon}
								style={styles.buttonIcon}
							/>
							<Text style={styles.buttonText}>저장하기</Text>
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
		width: 342,
		height: 560,
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
		marginTop: 18,
	},
	hueSlider: {
		width: 306,
		height: 18,
		marginTop: 6,
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
		fontFamily: 'Pretendard-Bold',
		fontSize: 12,
	},
	buttonContainer: {
		width: '100%',
		flexDirection: 'row',
	},
	button: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: 48,
		flexDirection: 'row',
	},
	buttonText: {
		color: COLOR.WHITE,
		fontFamily: 'Pretendard-Bold',
		fontSize: 14,
		marginRight: 6,
	},
	buttonIcon: {
		width: 14,
		height: 14,
        marginRight: 6
	},
});

export default ColorPickerModal;
