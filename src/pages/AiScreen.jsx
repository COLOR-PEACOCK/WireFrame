import React, { useState, useEffect } from 'react';
import {
	View,
	StyleSheet,
	Alert,
	TextInput,
	Image,
	TouchableOpacity,
	KeyboardAvoidingView,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import BasicHeader from '@components/common/BasicHeader';
import { CustomText as Text } from '@components/common/CustomText';
import { COLOR } from '@styles/color';

const AiScreen = ({ navigation }) => {
	const [imageUri, setImageUri] = useState(null);
	const [itemInImage, setItemInImage] = useState('');
	const [itemToRecommend, setItemToRecommend] = useState('');

	const selectImage = async () => {
		try {
			const response = await launchImageLibrary({ mediaType: 'photo' });
			if (response.didCancel) {
				console.log('User cancelled image picker');
				Alert.alert(
					'Image selection canceled',
					'No image was selected.',
				);
				navigation.goBack();
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
				Alert.alert('Error', response.error);
			} else if (response.assets && response.assets[0].uri) {
				const uri = response.assets[0].uri;
				setImageUri(uri);
			}
		} catch (error) {
			console.log('Error in selectImage:', error);
			Alert.alert(
				'Error',
				`An unexpected error occurred while picking the image: ${error.message}`,
			);
		}
	};

	useEffect(() => {
		selectImage();
	}, []);

	const canRunAIAnalysis = () => {
		return imageUri && itemInImage && itemToRecommend;
	};

	const navigateToAiResponseScreen = async () => {
		if (canRunAIAnalysis()) {
			const base64Image = await RNFS.readFile(
				imageUri.replace('file://', ''),
				'base64',
			);
			navigation.navigate('AiResponseScreen', {
				itemInImage,
				itemToRecommend,
				base64Image,
			});
		}
	};

	return (
		<KeyboardAvoidingView style={styles.container} behavior="padding">
			<BasicHeader title="색상 추천 화면" />

			<View style={styles.imageContainer}>
				{imageUri ? (
					<Image source={{ uri: imageUri }} style={styles.image} />
				) : (
					<View style={styles.placeholder}>
						<Text style={styles.placeholderText}>
							이미지를 선택하세요
						</Text>
					</View>
				)}
			</View>

			<View style={styles.inputContainer}>
				<View style={styles.inputRow}>
					<Text style={styles.inputLabel}>사진 속 아이템:</Text>
					<TextInput
						style={styles.input}
						value={itemInImage}
						onChangeText={setItemInImage}
					/>
				</View>

				<View style={styles.inputRow}>
					<Text style={styles.inputLabel}>추천받을 아이템:</Text>
					<TextInput
						style={styles.input}
						value={itemToRecommend}
						onChangeText={setItemToRecommend}
					/>
				</View>

				<TouchableOpacity
					style={[
						styles.analysisButton,
						{
							backgroundColor: canRunAIAnalysis()
								? COLOR.PRIMARY
								: COLOR.GRAY_4,
						},
					]}
					disabled={!canRunAIAnalysis()}
					onPress={navigateToAiResponseScreen}>
					<Text style={styles.analysisButtonText}>AI 분석 실행</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
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
	inputContainer: {
		padding: 16,
		backgroundColor: COLOR.PRIMARY,
	},
	inputRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20,
		marginHorizontal: 20,
	},
	inputLabel: {
		fontSize: 14,
		color: '#fff',
		marginRight: 10,
		width: 120,
	},
	input: {
		flex: 1,
		height: 40,
		borderBottomColor: '#fff',
		borderBottomWidth: 1,
		color: '#fff',
		backgroundColor: 'transparent',
		placeholderTextColor: '#ccc',
	},
	analysisButton: {
		padding: 15,
		borderRadius: 8,
		alignItems: 'center',
		marginTop: 20,
	},
	analysisButtonText: {
		color: '#fff',
		fontWeight: 'bold',
	},
});

export default AiScreen;
