import React from 'react';
import { View, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { CustomText as Text } from '@components/common/CustomText';

const ImagePicker = ({ imageUri, setImageUri }) => {
	const selectImage = async () => {
		try {
			const response = await launchImageLibrary({ mediaType: 'photo' });
			if (response.didCancel) {
				Alert.alert(
					'Image selection canceled',
					'No image was selected.',
				);
			} else if (response.error) {
				Alert.alert('Error', response.error);
			} else if (response.assets && response.assets[0].uri) {
				setImageUri(response.assets[0].uri);
			}
		} catch (error) {
			Alert.alert('Error', `An error occurred: ${error.message}`);
		}
	};

	return (
		<TouchableOpacity style={styles.imageContainer} onPress={selectImage}>
			{imageUri ? (
				<Image source={{ uri: imageUri }} style={styles.image} />
			) : (
				<View style={styles.placeholder}>
					<Text style={styles.placeholderText}>
						이미지를 선택하세요
					</Text>
				</View>
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	imageContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 40,
	},
	image: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	},
	placeholder: {
		width: '100%',
		height: '100%',
		borderRadius: 10,
		backgroundColor: '#f0f0f0',
		justifyContent: 'center',
		alignItems: 'center',
	},
	placeholderText: {
		color: '#888',
		fontSize: 16,
	},
});

export default ImagePicker;
