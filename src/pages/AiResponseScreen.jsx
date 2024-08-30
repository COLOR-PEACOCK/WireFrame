import React, { useState, useEffect } from 'react';
import {
	SafeAreaView,
	ScrollView,
	StyleSheet,
	View,
	TouchableOpacity,
	ActivityIndicator,
} from 'react-native';
import { CustomText as Text } from '@components/common/CustomText';
import BasicHeader from '@components/common/BasicHeader';
import { COLOR } from '@styles/color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ColorInfoModal from '@components/ColorRecommend/ColorInfoModal';
import { getColorInfo } from '@utils/colorRecommendUtils';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const AiResponseScreen = ({ route }) => {
	const { itemInImage, itemToRecommend, base64Image } = route.params;
	const [isLoading, setIsLoading] = useState(true);
	const [colors, setColors] = useState([]);
	const [responseExplanation, setResponseExplanation] = useState('');
	const [selectedColor, setSelectedColor] = useState(null);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isButtonPressed, setIsButtonPressed] = useState(false);

	const defaultColors = [
		'#FF5733',
		'#33FF57',
		'#3357FF',
		'#F1C40F',
		'#9B59B6',
	];

	useEffect(() => {
		const runAIModel = async () => {
			const prompt = `너에게 제공된 이미지에서 ${itemInImage}에 대한 색상과 분위기에 대한 설명과 해당 컬러 헥스 코드를 추출해주고, 그리고 그 아이템과 어울리는 ${itemToRecommend} 색상을 5가지 이내로 한국말로 추천해줘. 각 색상의 효과를 포함하여 JSON 형식으로 응답해줘. JSON 응답의 형식은 아래와 같아야 해:

{
  "image_explain": "string",
  "item_color": {
    "color_name": "string",
    "hex_code": "string",
    "description": "string"
  },
  "recommended_colors": [
    {
      "color_name": "string",
      "hex_code": "string",
      "description": "string"
    }
  ]
}`;

			try {
				const imagePart = {
					inlineData: {
						data: base64Image,
						mimeType: 'image/jpeg',
					},
				};

				const model = genAI.getGenerativeModel({
					model: 'gemini-1.5-flash',
					generationConfig: {
						responseMimeType: 'application/json',
					},
				});

				const result = await model.generateContent([prompt, imagePart]);
				const response = await result.response;
				const text = await response.text();

				console.log('Raw Response Text:', text);

				try {
					const responseJson = JSON.parse(text);

					if (
						responseJson &&
						responseJson.image_explain &&
						responseJson.recommended_colors &&
						Array.isArray(responseJson.recommended_colors)
					) {
						// 이미지 설명을 포함한 전체 설명을 설정
						const explanations = [
							`이미지 설명: ${responseJson.image_explain}`,
							...responseJson.recommended_colors.map(
								color =>
									`${color.color_name}: ${color.description}`,
							),
						].join('\n\n');

						const hexColors = responseJson.recommended_colors.map(
							color => color.hex_code,
						);

						setResponseExplanation(explanations);
						setColors(hexColors);
					} else {
						console.error(
							'Invalid responseText format:',
							responseJson,
						);
						setResponseExplanation('AI 응답이 올바르지 않습니다.');
					}
				} catch (error) {
					console.error(
						'Error parsing JSON:',
						error,
						'with text:',
						text,
					);
					setResponseExplanation(
						'AI 응답을 처리하는 중 오류가 발생했습니다.',
					);
					setColors(defaultColors);
				} finally {
					setIsLoading(false);
				}
			} catch (error) {
				console.error('Error generating content:', error);
				setIsLoading(false);
				setResponseExplanation('AI 응답 생성 중 오류가 발생했습니다.');
				setColors(defaultColors);
			}
		};

		runAIModel();
	}, [itemInImage, itemToRecommend, base64Image]);

	const handleColorPress = color => {
		const colorInfo = getColorInfo(color);
		setSelectedColor(colorInfo);
		setIsModalVisible(true);
	};

	const closeModal = () => {
		setIsModalVisible(false);
		setSelectedColor(null);
	};

	const handleColorChange = () => {
		setIsButtonPressed(true);
		console.log(colors);
		setTimeout(() => {
			setIsButtonPressed(false);
		}, 100);
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<BasicHeader title={'Ai 분석'} />
			<View style={styles.responseContainer}>
				<ScrollView style={styles.responseTextContainer}>
					{isLoading ? (
						<ActivityIndicator
							style={styles.loadingSpinner}
							size="large"
							color={COLOR.PRIMARY}
						/>
					) : (
						<Text style={styles.responseText}>
							{responseExplanation}
						</Text>
					)}
				</ScrollView>

				<View style={styles.paletteButtonContainer}>
					<View style={styles.paletteContainer}>
						{colors.length > 0 ? (
							colors.map((color, index) => (
								<TouchableOpacity
									key={index}
									style={[
										styles.colorCircle,
										{ backgroundColor: color },
									]}
									onPress={() => handleColorPress(color)}
								/>
							))
						) : (
							<Text>추천 색상이 없습니다.</Text>
						)}
					</View>
					<TouchableOpacity
						style={[
							styles.nextButton,
							{
								borderColor: isButtonPressed
									? COLOR.GRAY_1
									: COLOR.PRIMARY,
								backgroundColor: isButtonPressed
									? COLOR.PRIMARY
									: COLOR.GRAY_1,
							},
						]}
						onPress={handleColorChange}>
						<Icon
							name="hanger"
							size={24}
							color={
								isButtonPressed ? COLOR.GRAY_1 : COLOR.PRIMARY
							}
						/>
					</TouchableOpacity>

					<ColorInfoModal
						isVisible={isModalVisible}
						onClose={closeModal}
						colorInfo={selectedColor || {}}
						selectedColor={selectedColor?.hexVal || '#000'}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	responseContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: '#fff',
		padding: 20,
	},
	responseTextContainer: {
		marginVertical: 20,
		padding: 20,
		backgroundColor: COLOR.GRAY_4,
		borderColor: COLOR.PRIMARY,
		borderWidth: 2,
		borderRadius: 10,
		width: '100%',
	},
	loadingSpinner: {
		alignItems: 'center',
		justifyContent: 'center',
		color: COLOR.PRIMARY,
	},
	responseText: {
		fontSize: 20,
		color: COLOR.GRAY_8,
	},
	paletteButtonContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginVertical: 20,
		paddingHorizontal: 16,
		backgroundColor: COLOR.PRIMARY,
		borderRadius: 25,
		width: '100%',
		height: 80,
	},
	paletteContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
	},
	colorCircle: {
		width: 34,
		height: 34,
		borderRadius: 25,
		margin: 4,
	},
	nextButton: {
		width: 60,
		height: 60,
		borderRadius: 30,
		borderWidth: 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default AiResponseScreen;
