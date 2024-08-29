import React from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native';
import ColorPicker, { Panel1, HueSlider } from 'reanimated-color-picker';

const ColorPickerModal = ({
	isVisible,
	tempColor,
	setTempColor,
	onSave,
	onCancel,
}) => (
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
					<Panel1 style={styles.panel} />
					<HueSlider style={styles.hueSlider} />
					<View style={styles.colorPreviewContainer}>
						<View
							style={[
								styles.colorPreview,
								{ backgroundColor: tempColor },
							]}>
							<Text style={styles.colorText}>
								{tempColor.toUpperCase()}
							</Text>
						</View>
					</View>
				</ColorPicker>

				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={[styles.button, styles.cancelButton]}
						onPress={onCancel}>
						<Text style={styles.buttonText}>취소</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.button, styles.saveButton]}
						onPress={onSave}>
						<Text style={styles.buttonText}>저장</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	</Modal>
);

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modalContent: {
		width: 300,
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 10,
		alignItems: 'center',
	},
	colorPicker: {
		padding: 20,
		borderRadius: 10,
		backgroundColor: 'white',
		width: '100%',
	},
	panel: {
		height: 300,
		width: '100%',
		marginBottom: 20,
	},
	hueSlider: {
		marginBottom: 20,
		height: 40,
		borderRadius: 20,
		width: '100%',
	},
	colorPreviewContainer: {
		marginBottom: 20,
		alignItems: 'center',
		width: '100%',
	},
	colorPreview: {
		height: 40,
		borderRadius: 20,
		marginBottom: 20,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	colorText: {
		color: '#333',
		textAlign: 'center',
		lineHeight: 40,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 20,
	},
	button: {
		padding: 10,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	cancelButton: {
		backgroundColor: '#CCC',
		marginRight: 10,
	},
	saveButton: {
		backgroundColor: '#6200EE',
	},
	buttonText: {
		color: '#FFF',
		fontWeight: 'bold',
	},
});

export default ColorPickerModal;
