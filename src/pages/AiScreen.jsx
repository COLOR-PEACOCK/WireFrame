import React, { useState, useEffect } from 'react';
import {
	View,
	StyleSheet,
	Alert,
	TextInput,
	Image,
	TouchableOpacity,
	ActivityIndicator,
	KeyboardAvoidingView,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import { GoogleGenerativeAI } from '@google/generative-ai';
import BasicHeader from '@components/common/BasicHeader';
import { CustomText as Text } from '@components/common/CustomText';
import { COLOR } from '@styles/color';

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const AiScreen = ({ navigation }) => {
	const [imageUri, setImageUri] = useState(null);
	const [responseText, setResponseText] = useState('');
	const [itemInImage, setItemInImage] = useState('');
	const [itemToRecommend, setItemToRecommend] = useState('');
	const [isLoading, setIsLoading] = useState(false);

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

				try {
					const base64Image = await RNFS.readFile(
						uri.replace('file://', ''),
						'base64',
					);
				} catch (error) {
					console.error('Failed to convert image to Base64', error);
				}
			}
		} catch (error) {
			console.log('Error in selectImage:', error);
			Alert.alert(
				'Error',
				`An unexpected error occurred while picking the image: ${error.message}`,
			);
		}
	};

	const runAIModel = async () => {
		setIsLoading(true);
		const prompt = `너에게 제공된 이미지에서 ${itemInImage}와 어울리는 ${itemToRecommend} 색상을 5가지 이내로 추천하고, 각각의 색의 효과에 1500자이내로 설명해줘. 추천한 색상의 헥스코드들을 JSON으로 응답할 때 카테고리 분리 없이 recommeneded_color_list의 밸류에 배열로 나열해줘:
    { 'type': 'object',
    'properties': {
      'recommeneded_color_explain': { 'type': 'string' },
      'recommeneded_color_list' : {'type':'array'}
    }
  }`;

		try {
			const base64Image = await RNFS.readFile(
				imageUri.replace('file://', ''),
				'base64',
			);

			const imagePart = {
				inlineData: {
					data: base64Image,
					mimeType: 'image/jpeg',
				},
			};

			const model = genAI.getGenerativeModel({
				model: 'gemini-1.5-pro',
				generationConfig: {
					responseMimeType: 'application/json',
				},
			});

			const result = await model.generateContent([prompt, imagePart]);
			const response = await result.response;
			const text = await response.text();
			setResponseText(text);
			console.log(text);
			navigation.navigate('AiResponseScreen', { responseText: text });
		} catch (error) {
			console.error('Error generating content:', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		selectImage();
	}, []);

	const canRunAIAnalysis = () => {
		return imageUri && itemInImage && itemToRecommend && !isLoading;
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
					onPress={runAIModel}>
					{isLoading ? (
						<ActivityIndicator color="#fff" />
					) : (
						<Text style={styles.analysisButtonText}>
							AI 분석 실행
						</Text>
					)}
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
		height: 40, // 높이를 조금 늘림
		borderBottomColor: '#fff',
		borderBottomWidth: 1,
		color: '#fff', // 텍스트 색상을 흰색으로 설정
		backgroundColor: 'transparent', // 배경색을 투명하게 설정 (필요에 따라 변경 가능)
		placeholderTextColor: '#ccc', // 플레이스홀더 색상을 회색으로 설정
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
