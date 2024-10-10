import { useState } from 'react';
import { Alert } from 'react-native';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useNavigation } from '@react-navigation/native';

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const useRunAi = () => {
	const [korColorNameList, setKorColorNameList] = useState([]);
	const [engColorNameList, setEngColorNameList] = useState([]);
	const [colorCodeList, setColorCodeList] = useState([]);
	const [colorDescriptionList, setColorDescriptionList] = useState([]);
	const [colorShortList, setColorShortList] = useState([]);

	const [isLoading, setIsLoading] = useState(true);
	const [colors, setColors] = useState([]);
	const [itemColor, setItemColor] = useState(null);

	const navigation = useNavigation();

	const runAIModel = async (itemInImage, itemToRecommend, base64Image) => {
		const prompt = `너에게 제공된 이미지에서 ${itemInImage}에 대한 색상과 분위기에 대한 설명과 해당 컬러 헥스 코드를 추출해주고, 그리고 그 아이템과 어울리는 ${itemToRecommend} 색상을 recommended_colors에 5종류를 한국말로 추천해줘. 각 색상의 효과를 포함하여 JSON 형식으로 응답해줘. hexcode_list에는 언급된 hexcode들을 차례로 정리해줘. recommended_colors.description은 한글로 공백 포함 80자 이내로 작성해줘. JSON 응답의 형식은 아래와 같아야 해:

{
  "image_explain": "string",
  "item_color": {
    "color_name_korean": "string",
 "color_name_english": "string",
    "hex_code": "string",
    "description": "string"
  },
  "recommended_colors": [
    {
      "color_name_korean": "string",
 "color_name_english": "string",
      "hex_code": "string",
      "description": "string",
      "description_Very_Short_Ver": "string"
    }
  ],
  "hexcode_list" : ["string"]
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
					responseJson.item_color &&
					responseJson.recommended_colors &&
					responseJson.hexcode_list &&
					Array.isArray(responseJson.recommended_colors)
				) {
					setItemColor(responseJson.item_color.hex_code);

					const recommendedKorColorNames =
						responseJson.recommended_colors.map(
							color => color.color_name_korean,
						);
					setKorColorNameList(recommendedKorColorNames);

					const recommendedEngColorNames =
						responseJson.recommended_colors.map(
							color => color.color_name_english,
						);
					setEngColorNameList(recommendedEngColorNames);

					const recommendedHexCodes =
						responseJson.recommended_colors.map(
							color => color.hex_code,
						);
					setColorCodeList(recommendedHexCodes);

					const recommendedDescriptions =
						responseJson.recommended_colors.map(
							color => color.description,
						);
					setColorDescriptionList(recommendedDescriptions);

					const recommendedShortDescriptions =
						responseJson.recommended_colors.map(
							color => color.description_Very_Short_Ver,
						);
					setColorShortList(recommendedShortDescriptions);

					const objectHexCodes = responseJson.hexcode_list;
					setColors(objectHexCodes);
				} else {
					console.log('Invalid responseText format:', responseJson);
					const explantion = 'AI 응답이 올바르지 않습니다.';
					Alert.alert('오류', explantion, [
						{
							text: '확인',
							onPress: () => {
								navigation.goBack();
							},
						},
					]);
				}
			} catch (error) {
				console.log('Error parsing JSON:', error, 'with text:', text);

				const explantion = 'AI 응답을 처리하는 중 오류가 발생했습니다.';
				Alert.alert('오류', explantion, [
					{
						text: '확인',
						onPress: () => {
							navigation.goBack();
						},
					},
				]);
			} finally {
				setIsLoading(false);
			}
		} catch (error) {
			console.log('Error generating content:', error);

			const explantion = 'AI 응답 생성 중 오류가 발생했습니다.';
			Alert.alert('오류', explantion, [
				{
					text: '확인',
					onPress: () => {
						navigation.goBack();
					},
				},
			]);
		}
	};

	return {
		runAIModel,
		korColorNameList,
		engColorNameList,
		colorCodeList,
		colorDescriptionList,
		colorShortList,
		isLoading,
		colors,
		itemColor,
	};
};

export default useRunAi;
