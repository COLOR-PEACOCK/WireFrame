import React, { useState, useEffect } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	View,
	TouchableOpacity,
	useWindowDimensions,
	Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { COLOR } from '@styles/color';
import { BasicHeader, LoadingScreen, CustomPopup } from '@components/common';
import { AiCircle, Background } from '@components/AiRecommend';

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const AiResponseScreen = ({ route }) => {
	const { itemInImage, itemToRecommend, base64Image } = route.params;
	const [isLoading, setIsLoading] = useState(true);
	const [colors, setColors] = useState([]);
	const [responseExplanation, setResponseExplanation] = useState('');
	const [isButtonPressed, setIsButtonPressed] = useState(false);
	const [itemColor, setItemColor] = useState(null);
	// AI 결과 나오는 원 컨테이너 세로 길이 값 저장
	const [containerHeight, setContainerHeight] = useState(0);

	const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
		useWindowDimensions();

	const [korColorNameList, setKorColorNameList] = useState([]);
	const [engColorNameList, setEngColorNameList] = useState([]);
	const [colorCodeList, setColorCodeList] = useState([]);
	const [colorDescriptionList, setColorDescriptionList] = useState([]);
	const [colorShortList, setColorShortList] = useState([]);

	const [background, setBackground] = useState(true);

	// 원 상태 변화
	const [isSelected, setIsSelected] = useState([
		'medium',
		'medium',
		'medium',
		'medium',
		'medium',
	]);

	const defaultColors = [
		'#FF5733',
		'#33FF57',
		'#3357FF',
		'#F1C40F',
		'#9B59B6',
	];

	// 테스트 때 사용할 더미데이터
	// useEffect(() => {
	// 	const text = {
	// 		image_explain:
	// 			'이미지에는 짙은 녹색 후드티가 놓여 있습니다. 후드티는  짙은 녹색 바탕에  흰 색 글씨로 디자인되어 있습니다. 후드티 안쪽은 회색으로 되어있습니다.',
	// 		item_color: {
	// 			color_name_korean: '짙은 녹색',
	// 			color_name_english: 'Dark Green',
	// 			hex_code: '#1B4F35',
	// 			description:
	// 				'짙은 녹색은 안정감과 차분함을 주는 색상입니다. 깊고 풍부한 느낌을 주어 시크하면서도 세련된 분위기를 연출합니다. 짙은 녹색 후드티는  다양한 스타일에 매치하기 용이하며,  특히 캐주얼룩이나 스트릿 패션에 잘 어울립니다.',
	// 		},
	// 		recommended_colors: [
	// 			{
	// 				color_name_korean: '검정색',
	// 				color_name_english: 'Black',
	// 				hex_code: '#000000',
	// 				description:
	// 					'검정색은 어떤 색상과도 잘 어울리는  모던하고 시크한 색상입니다. 짙은 녹색과  조화롭게  어울려 세련되고  스타일리시한  느낌을  줍니다.',
	// 				description_Very_Short_Ver:
	// 					'모던하고 시크한 색상으로 짙은 녹색과 잘 어울립니다.',
	// 			},
	// 			{
	// 				color_name_korean: '흰색',
	// 				color_name_english: 'White',
	// 				hex_code: '#FFFFFF',
	// 				description:
	// 					'흰색은  깨끗하고  시원한 느낌을 주는 색상입니다. 짙은 녹색과  대비를  이루어  밝고  산뜻한  스타일을  연출할  수 있습니다.',
	// 				description_Very_Short_Ver:
	// 					'깨끗하고 시원한 느낌, 밝고 산뜻한 스타일 연출 가능',
	// 			},
	// 			{
	// 				color_name_korean: '베이지색',
	// 				color_name_english: 'Beige',
	// 				hex_code: '#F5F5DC',
	// 				description:
	// 					'베이지색은 부드럽고 따뜻한 느낌을 주는 색상입니다. 짙은 녹색과 조화롭게  어울려  차분하고  고급스러운  느낌을  줍니다.',
	// 				description_Very_Short_Ver:
	// 					'부드럽고 따뜻한 느낌, 차분하고 고급스러운 연출 가능',
	// 			},
	// 			{
	// 				color_name_korean: '회색',
	// 				color_name_english: 'Gray',
	// 				hex_code: '#808080',
	// 				description:
	// 					'회색은  차분하고  세련된  느낌을 주는 색상입니다. 짙은 녹색과  조화롭게  어울려  모던하고  시크한  스타일을  연출할  수 있습니다.',
	// 				description_Very_Short_Ver:
	// 					'차분하고 세련된 느낌, 모던하고 시크한 스타일 연출',
	// 			},
	// 			{
	// 				color_name_korean: '카키색',
	// 				color_name_english: 'Khaki',
	// 				hex_code: '#8B7D6B',
	// 				description:
	// 					'카 키색은 자연스럽고 편안한 느낌을 주는 색상입니다.  짙은 녹색과 비슷한 계열의 색상으로 통일감을 주어  안정적인 스타일을 연출할 수 있습니다.',
	// 				description_Very_Short_Ver:
	// 					'자연스럽고 편안한 느낌, 안정적인 스타일 연출',
	// 			},
	// 		],
	// 		hexcode_list: [
	// 			'#1B4F35',
	// 			'#000000',
	// 			'#FFFFFF',
	// 			'#F5F5DC',
	// 			'#808080',
	// 			'#8B7D6B',
	// 		],
	// 	};
	// 	try {
	// 		const responseJson = text;

	// 		if (
	// 			responseJson &&
	// 			responseJson.image_explain &&
	// 			responseJson.item_color &&
	// 			responseJson.recommended_colors &&
	// 			responseJson.hexcode_list &&
	// 			Array.isArray(responseJson.recommended_colors)
	// 		) {
	// 			setItemColor(responseJson.item_color.hex_code);

	// 			const recommendedKorColorNames =
	// 				responseJson.recommended_colors.map(
	// 					color => color.color_name_korean,
	// 				);
	// 			setKorColorNameList(recommendedKorColorNames);

	// 			const recommendedEngColorNames =
	// 				responseJson.recommended_colors.map(
	// 					color => color.color_name_english,
	// 				);
	// 			setEngColorNameList(recommendedEngColorNames);

	// 			const recommendedHexCodes = responseJson.recommended_colors.map(
	// 				color => color.hex_code,
	// 			);
	// 			setColorCodeList(recommendedHexCodes);

	// 			const recommendedDescriptions =
	// 				responseJson.recommended_colors.map(
	// 					color => color.description,
	// 				);
	// 			setColorDescriptionList(recommendedDescriptions);

	// 			const recommendedShortDescriptions =
	// 				responseJson.recommended_colors.map(
	// 					color => color.description_Very_Short_Ver,
	// 				);
	// 			setColorShortList(recommendedShortDescriptions);

	// 			const objectHexCodes = responseJson.hexcode_list;
	// 			setColors(objectHexCodes);
	// 		} else {
	// 			console.error('Invalid responseText format:', responseJson);
	// 			setResponseExplanation('AI 응답이 올바르지 않습니다.');
	// 		}
	// 	} catch (error) {
	// 		console.error('Error parsing JSON:', error, 'with text:', text);
	// 		setResponseExplanation(
	// 			'AI 응답을 처리하는 중 오류가 발생했습니다.',
	// 		);
	// 		setColors(defaultColors);
	// 	} finally {
	// 		setIsLoading(false);
	// 	}
	// }, []);

	useEffect(() => {
		const runAIModel = async () => {
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
						console.log(
							'Invalid responseText format:',
							responseJson,
						);
						// setResponseExplanation('AI 응답이 올바르지 않습니다.');
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
					console.log(
						'Error parsing JSON:',
						error,
						'with text:',
						text,
					);
					// setResponseExplanation(
					// 	'AI 응답을 처리하는 중 오류가 발생했습니다.',
					// );
					// setColors(defaultColors);
					const explantion =
						'AI 응답을 처리하는 중 오류가 발생했습니다.';
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
				// setIsLoading(false);
				// setResponseExplanation('AI 응답 생성 중 오류가 발생했습니다.');
				// setColors(defaultColors);
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

		runAIModel();
	}, [itemInImage, itemToRecommend, base64Image]);

	// 배경 무늬 색상 컨트롤

	useEffect(() => {
		if (itemColor) {
			const shouldUseWhiteColor = hexColor => {
				const r = parseInt(hexColor.substr(1, 2), 16);
				const g = parseInt(hexColor.substr(3, 2), 16);
				const b = parseInt(hexColor.substr(5, 2), 16);
				const yiq = (r * 299 + g * 587 + b * 114) / 1000;
				return setBackground(yiq < 220);
			};
			shouldUseWhiteColor(itemColor);
		}
	}, [itemColor]);

	// 오브젝트 화면으로 네비게이트
	const navigation = useNavigation();
	const navigateObjectScreen = () => {
		navigation.navigate('ObjectScreen', colors);
	};

	// 헤더 인포 텍스트
	const infotext =
		'• 분석한 색상들의 원을 터치해 보세요!\n• 각 색상에 대해서 자세히 알려드립니다!';

	// 팝업 메세지
	const popupMessage =
		'분석한 색상들의 원을 터치해 보세요!\n• 각 색상에 대해서 자세히 알려드립니다!';

	// AI 결과 원 컨테이너의 세로길이 구하는 함수
	const handleLayout = event => {
		const { height } = event.nativeEvent.layout;
		setContainerHeight(height); // 세로 길이를 상태에 저장
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ flex: 1, backgroundColor: itemColor }}>
				<BasicHeader
					titleIcon={'AI'}
					title={'AI 분석'}
					subTitle={'ai recs'}
					rightIcon={'info'}
					infoText={infotext}
				/>
				{isLoading ? (
					<View
						style={{
							flex: 1,
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						<LoadingScreen />
					</View>
				) : (
					<View style={{ flex: 1, zIndex: -1 }}>
						<View
							style={styles.responseContainer}
							onLayout={handleLayout}>
							<AiCircle
								type={'left'}
								number={0}
								colorCode={colorCodeList}
								korColorName={korColorNameList}
								engColorName={engColorNameList}
								colorShort={colorShortList}
								colorDescription={colorDescriptionList}
								isSelected={isSelected}
								setIsSelected={setIsSelected}
								containerHeight={containerHeight}
							/>
							<AiCircle
								type={'right'}
								number={1}
								colorCode={colorCodeList}
								korColorName={korColorNameList}
								engColorName={engColorNameList}
								colorShort={colorShortList}
								colorDescription={colorDescriptionList}
								isSelected={isSelected}
								setIsSelected={setIsSelected}
								containerHeight={containerHeight}
							/>
							<AiCircle
								type={'left'}
								number={2}
								colorCode={colorCodeList}
								korColorName={korColorNameList}
								engColorName={engColorNameList}
								colorShort={colorShortList}
								colorDescription={colorDescriptionList}
								isSelected={isSelected}
								setIsSelected={setIsSelected}
								containerHeight={containerHeight}
							/>
							<AiCircle
								type={'right'}
								number={3}
								colorCode={colorCodeList}
								korColorName={korColorNameList}
								engColorName={engColorNameList}
								colorShort={colorShortList}
								colorDescription={colorDescriptionList}
								isSelected={isSelected}
								setIsSelected={setIsSelected}
								containerHeight={containerHeight}
							/>
							<AiCircle
								type={'left'}
								number={4}
								colorCode={colorCodeList}
								korColorName={korColorNameList}
								engColorName={engColorNameList}
								colorShort={colorShortList}
								colorDescription={colorDescriptionList}
								isSelected={isSelected}
								setIsSelected={setIsSelected}
								containerHeight={containerHeight}
							/>

							<Background
								color={background ? '#ffffff' : COLOR.GRAY_3}
							/>
							<TouchableOpacity
								onPressIn={() => setIsButtonPressed(true)}
								onPressOut={() => setIsButtonPressed(false)}
								onPress={navigateObjectScreen}
								activeOpacity={1}
								style={{
									position: 'absolute',
									bottom: 14,
									right: 12,
									width: 185,
									height: 62,
									width: 70,
									height: 70,
									borderRadius: 64,
									backgroundColor: isButtonPressed
										? COLOR.PRIMARY
										: '#ffffff',
									justifyContent: 'center',
									alignItems: 'center',
									borderWidth: 2,
									borderColor: COLOR.GRAY_3,
								}}>
								<Icon
									name="hanger"
									size={30}
									color={
										isButtonPressed
											? COLOR.GRAY_1
											: COLOR.PRIMARY
									}
								/>
							</TouchableOpacity>
						</View>
						<CustomPopup message={popupMessage} />
					</View>
				)}
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	responseContainer: {
		flex: 1,
		position: 'relative',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
});

export default AiResponseScreen;
