import React from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

const ColorInfoModal = ({ isVisible, onClose, colorInfo, selectedColor }) => (
	<Modal transparent={true} visible={isVisible} onRequestClose={onClose}>
		<View style={styles.modalContainer}>
			<View style={styles.modalContent}>
				<TouchableOpacity onPress={onClose} style={styles.closeButton}>
					<Icon name="close" size={24} />
				</TouchableOpacity>

				<View
					style={[
						styles.colorPreview,
						{ backgroundColor: selectedColor },
					]}
				/>

				<Text style={styles.colorName}>{colorInfo.engName}</Text>
				<Text style={styles.colorInfo}>{colorInfo.rgbVal}</Text>
				<Text style={styles.colorInfo}>{colorInfo.hexVal}</Text>
				<Text style={styles.colorInfo}>{colorInfo.hslVal}</Text>
				<Text style={styles.colorInfo}>{colorInfo.cmykVal}</Text>
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
		padding: 20,
		backgroundColor: 'white',
		borderRadius: 10,
		alignItems: 'center',
	},
	closeButton: {
		position: 'absolute',
		top: 10,
		right: 10,
		padding: 5,
	},
	colorPreview: {
		marginTop: 40,
		width: '100%',
		height: 150,
		borderRadius: 10,
		marginBottom: 20,
	},
	colorName: {
		fontSize: 18,
		marginBottom: 10,
	},
	colorInfo: {
		marginBottom: 5,
	},
});

export default ColorInfoModal;
