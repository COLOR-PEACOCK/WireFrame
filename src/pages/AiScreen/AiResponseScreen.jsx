import React, { useState, useEffect } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	View,
	TouchableOpacity,
	useWindowDimensions,
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

	const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
		useWindowDimensions();

	const [korColorNameList, setKorColorNameList] = useState([]);
	const [engColorNameList, setEngColorNameList] = useState([]);
	const [colorCodeList, setColorCodeList] = useState([]);
	const [colorDescriptionList, setColorDescriptionList] = useState([]);
	const [colorShortList, setColorShortList] = useState([]);

	const [background, setBackground] = useState(true);

	// 원 관련
	const RADIUS = 205; //원의 지름
	const DISTANCE = 20; // 첫화면에서 원이 화면 바깥으로 벗어나있는 정도
	const paddingVertical = 40; // 첫번째 원과 헤더바의 거리
	const circleUnitVertical =
		(SCREEN_HEIGHT - 64 - paddingVertical * 2 - RADIUS) / 4; // 64는 헤더바 height

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

	useEffect(() => {
		const runAIModel = async () => {
			const prompt = `너에게 제공된 이미지에서 ${itemInImage}에 대한 색상과 분위기에 대한 설명과 해당 컬러 헥스 코드를 추출해주고, 그리고 그 아이템과 어울리는 ${itemToRecommend} 색상을 recommended_colors에 5종류를 한국말로 추천해줘. 각 색상의 효과를 포함하여 JSON 형식으로 응답해줘. hexcode_list에는 언급된 hexcode들을 차례로 정리해줘. recommended_colors.description은 한글로 공백 포함 80자가 넘지않게 작성해줘. JSON 응답의 형식은 아래와 같아야 해:

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

	//배경 무늬 색상 컨트롤
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
		'분석한 색상들의 원을 터치해 보세요! 각 색상에 대해서 자세히 알려드립니다!';

	// 팝업 메세지
	const popupMessage =
		'분석한 색상들의 원을 터치해 보세요!\n• 각 색상에 대해서 자세히 알려드립니다!';

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
					<>
						<View style={styles.responseContainer}>
							<AiCircle
								type={'left'}
								distance={DISTANCE}
								top={paddingVertical}
								diameter={RADIUS}
								number={0}
								colorCode={colorCodeList}
								korColorName={korColorNameList}
								engColorName={engColorNameList}
								colorShort={colorShortList}
								colorDescription={colorDescriptionList}
								isSelected={isSelected}
								setIsSelected={setIsSelected}
							/>
							<AiCircle
								type={'right'}
								distance={DISTANCE}
								top={paddingVertical + circleUnitVertical}
								diameter={RADIUS}
								number={1}
								colorCode={colorCodeList}
								korColorName={korColorNameList}
								engColorName={engColorNameList}
								colorShort={colorShortList}
								colorDescription={colorDescriptionList}
								isSelected={isSelected}
								setIsSelected={setIsSelected}
							/>
							<AiCircle
								type={'left'}
								distance={DISTANCE}
								top={paddingVertical + circleUnitVertical * 2}
								diameter={RADIUS}
								number={2}
								colorCode={colorCodeList}
								korColorName={korColorNameList}
								engColorName={engColorNameList}
								colorShort={colorShortList}
								colorDescription={colorDescriptionList}
								isSelected={isSelected}
								setIsSelected={setIsSelected}
							/>
							<AiCircle
								type={'right'}
								distance={DISTANCE}
								top={paddingVertical + circleUnitVertical * 3}
								diameter={RADIUS}
								number={3}
								colorCode={colorCodeList}
								korColorName={korColorNameList}
								engColorName={engColorNameList}
								colorShort={colorShortList}
								colorDescription={colorDescriptionList}
								isSelected={isSelected}
								setIsSelected={setIsSelected}
							/>
							<AiCircle
								type={'left'}
								distance={DISTANCE}
								top={paddingVertical + circleUnitVertical * 4}
								diameter={RADIUS}
								number={4}
								colorCode={colorCodeList}
								korColorName={korColorNameList}
								engColorName={engColorNameList}
								colorShort={colorShortList}
								colorDescription={colorDescriptionList}
								isSelected={isSelected}
								setIsSelected={setIsSelected}
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
					</>
				)}
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	responseContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		padding: 20,
	},
});

export default AiResponseScreen;
