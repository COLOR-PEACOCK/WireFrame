import React, { useState } from 'react';
import {
	View,
	StyleSheet,
	Button,
	Platform,
	PermissionsAndroid,
	Alert,
	ScrollView,
	TextInput,
	Image,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import { GoogleGenerativeAI } from '@google/generative-ai';
import BasicHeader from '@components/common/BasicHeader';
import { CustomText as Text } from '@components/common/CustomText';

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const AiScreen = ({ navigation }) => {
	const [imageUri, setImageUri] = useState(null);
	const [responseText, setResponseText] = useState('');
	const [itemInImage, setItemInImage] = useState(''); // 사진 속 선택할 아이템
	const [itemToRecommend, setItemToRecommend] = useState(''); // 추천받을 아이템

	const requestStoragePermission = async () => {
		if (Platform.OS === 'android') {
			try {
				const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
					{
						title: 'Storage Permission',
						message:
							'App needs access to your storage to select images.',
						buttonNeutral: 'Ask Me Later',
						buttonNegative: 'Cancel',
						buttonPositive: 'OK',
					},
				);
				return granted === PermissionsAndroid.RESULTS.GRANTED;
			} catch (err) {
				console.error('Failed to request permission', err);
				return false;
			}
		}
		return true;
	};

	const selectImage = async () => {
		try {
			const response = await launchImageLibrary({ mediaType: 'photo' });
			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
				Alert.alert('Error', response.error);
			} else if (response.assets && response.assets[0].uri) {
				const uri = response.assets[0].uri;
				setImageUri(uri);

				// Base64 인코딩을 실행하지 않고 파일 경로를 그대로 사용했기 때문에 발생한 문제
				// 아래 코드로 수정합니다.
				try {
					const base64Image = await RNFS.readFile(
						uri.replace('file://', ''),
						'base64',
					); // 'file://'를 제거
					runAIModel(base64Image); // base64 인코딩된 이미지를 전달
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

	const runAIModel = async base64Image => {
		const prompt = `너에게 제공된 이미지에서 ${itemInImage}와 어울리는 ${itemToRecommend} 색상을 추천하고, 각각의 색의 효과에 대해 설명해줘. 추천한 색상의 헥스코드들을 JSON으로 응답할 때 카테고리 분리 없이 recommeneded_color_list의 밸류에 배열로 나열해줘:
    { 'type': 'object',
    'properties': {
      'recommeneded_color_explain': { 'type': 'string' },
      'recommeneded_color_list' : {'type':'array'}
    }
  }`;

		try {
			const imagePart = {
				inlineData: {
					data: base64Image, // 올바르게 인코딩된 Base64 데이터 사용
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
		} catch (error) {
			console.error('Error generating content:', error);
		}
	};

	return (
		<View style={styles.container}>
			<BasicHeader title="색상 추천 화면" />

			{/* 이미지 선택 버튼 */}
			<Button title="Select Image" onPress={selectImage} />

			{/* 선택된 이미지 표시 */}
			{imageUri && (
				<Image source={{ uri: imageUri }} style={styles.image} />
			)}

			{/* 텍스트 입력 필드: 사진 속 아이템 */}
			<TextInput
				style={styles.input}
				placeholder="사진 속 선택할 아이템"
				value={itemInImage}
				onChangeText={setItemInImage}
			/>

			{/* 텍스트 입력 필드: 추천받을 아이템 */}
			<TextInput
				style={styles.input}
				placeholder="추천받을 아이템"
				value={itemToRecommend}
				onChangeText={setItemToRecommend}
			/>

			<Button
				title="AI 분석 실행"
				onPress={() => {
					if (imageUri) selectImage();
				}}
			/>

			{/* AI 응답 표시 */}
			<ScrollView contentContainerStyle={styles.responseContainer}>
				<Text style={styles.responseTitle}>AI Generated Response</Text>
				<Text style={styles.responseText}>{responseText}</Text>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: '#FFFFFF',
	},
	navbar: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#E5E5E5',
		marginBottom: 20,
	},
	backText: {
		fontSize: 20,
		marginRight: 10,
	},
	navTitle: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	input: {
		height: 40,
		borderColor: '#ccc',
		borderWidth: 1,
		marginBottom: 20,
		paddingHorizontal: 8,
	},
	image: {
		width: '100%',
		height: 300,
		resizeMode: 'contain',
		marginBottom: 20,
		borderRadius: 10,
	},
	responseContainer: {
		paddingVertical: 20,
	},
	responseTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 10,
		textAlign: 'center',
	},
	responseText: {
		fontSize: 16,
		textAlign: 'center',
	},
});

export default AiScreen;
