import React, { useState, useEffect } from 'react';
import {
	SafeAreaView,
	ScrollView,
	StyleSheet,
	View,
	TouchableOpacity,
	ActivityIndicator,
	useWindowDimensions,
	Image,
} from 'react-native';
import { CustomText as Text } from '@components/common/CustomText';
import BasicHeader from '@components/common/BasicHeader';
import { COLOR } from '@styles/color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ColorInfoModal from '@components/ColorRecommend/ColorInfoModal';
import { getColorInfo } from '@utils/colorRecommendUtils';
import useColorName from '@hooks/useColorName';
import { GoogleGenerativeAI } from '@google/generative-ai';
import tinycolor from 'tinycolor2';
import LeftCircle from '@components/AiRecommend/LeftCircle';
import RightCircle from '@components/AiRecommend/RightCircle';
import Background from '@components/AiRecommend/Background';
import Spinner from '@components/common/Spinner';
import { useNavigation } from '@react-navigation/native';

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const AiResponseScreen = ({ route }) => {
	const { itemInImage, itemToRecommend, base64Image } = route.params;
	const [isLoading, setIsLoading] = useState(true);
	const [colors, setColors] = useState([]);
	const [responseExplanation, setResponseExplanation] = useState('');
	const [selectedColor, setSelectedColor] = useState(null);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isButtonPressed, setIsButtonPressed] = useState(false);
	const [itemColor, setItemColor] = useState(null);
	const { getEngColorName, getKorColorName, getEngColorNameLocal } =
		useColorName();

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

	// useEffect(() => {
	// 	const responseJson = {
	// 		image_explain:
	// 			'이미지에는 밝은 톤의 푸른색 가죽 소파가 흰색 벽과 밝은 회색 카펫 위에 놓여 있습니다. 소파의 디자인은 모던하고 세련된 느낌을 주며, 밝은 색상은 공간에 활력을 더해줍니다.',
	// 		item_color: {
	// 			color_name_korean: '밝은 푸른색',
	// 			color_name_english: 'Light Blue',
	// 			hex_code: '#90B9D2',
	// 			description:
	// 				'밝고 시원한 느낌을 주는 푸른색으로, 차분함과 동시에 활력을 더해줍니다. 공간을 넓어 보이게 하는 효과도 있습니다.',
	// 		},
	// 		recommended_colors: [
	// 			{
	// 				color_name_korean: '따뜻한 노란색',
	// 				color_name_english: 'Warm Yellow',
	// 				hex_code: '#F2E7B2',
	// 				description:
	// 					'따뜻하고 편안한 분위기를 조성하며, 밝은 푸른색 소파와 조화롭게 어울립니다.',
	// 				description_Very_Short_Ver: '따뜻하고 편안',
	// 			},
	// 			{
	// 				color_name_korean: '은은한 베이지색',
	// 				color_name_english: 'Subtle Beige',
	// 				hex_code: '#D9D9D9',
	// 				description:
	// 					'차분하고 고급스러운 분위기를 연출하며, 밝은 푸른색 소파와 조화를 이루어 안정감을 더해줍니다.',
	// 				description_Very_Short_Ver: '차분하고 고급스러운',
	// 			},
	// 			{
	// 				color_name_korean: '부드러운 연핑크',
	// 				color_name_english: 'Soft Light Pink',
	// 				hex_code: '#E4C2D5',
	// 				description:
	// 					'부드럽고 로맨틱한 분위기를 연출하며, 밝은 푸른색 소파와 대비를 이루어 시각적으로 흥미로운 공간을 만들어줍니다.',
	// 				description_Very_Short_Ver: '부드럽고 로맨틱',
	// 			},
	// 			{
	// 				color_name_korean: '시원한 민트색',
	// 				color_name_english: 'Cool Mint',
	// 				hex_code: '#9FE2BF',
	// 				description:
	// 					'시원하고 산뜻한 분위기를 연출하며, 밝은 푸른색 소파와 통일감을 주어 편안하고 안정적인 공간을 만들어줍니다.',
	// 				description_Very_Short_Ver: '시원하고 산뜻',
	// 			},
	// 			{
	// 				color_name_korean: '깊은 회색',
	// 				color_name_english: 'Deep Gray',
	// 				hex_code: '#6E6E6E',
	// 				description:
	// 					'모던하고 세련된 분위기를 연출하며, 밝은 푸른색 소파와 대비를 이루어 시각적으로 안정감을 주는 동시에 깔끔한 느낌을 더해줍니다.',
	// 				description_Very_Short_Ver: '모던하고 세련된',
	// 			},
	// 		],
	// 		hexcode_list: [
	// 			'#90B9D2',
	// 			'#F2E7B2',
	// 			'#D9D9D9',
	// 			'#E4C2D5',
	// 			'#9FE2BF',
	// 			'#6E6E6E',
	// 		],
	// 	};

	// 	if (
	// 		responseJson &&
	// 		responseJson.image_explain &&
	// 		responseJson.item_color &&
	// 		responseJson.recommended_colors &&
	// 		responseJson.hexcode_list &&
	// 		Array.isArray(responseJson.recommended_colors)
	// 	) {
	// 		// setItemColor(responseJson.item_color.hex_code);
	// 		setItemColor('#ffffff');

	// 		const recommendedKorColorNames =
	// 			responseJson.recommended_colors.map(
	// 				color => color.color_name_korean,
	// 			);
	// 		setKorColorNameList(recommendedKorColorNames);

	// 		const recommendedEngColorNames =
	// 			responseJson.recommended_colors.map(
	// 				color => color.color_name_english,
	// 			);
	// 		setEngColorNameList(recommendedEngColorNames);

	// 		const recommendedHexCodes = responseJson.recommended_colors.map(
	// 			color => color.hex_code,
	// 		);
	// 		setColorCodeList(recommendedHexCodes);

	// 		const recommendedDescriptions = responseJson.recommended_colors.map(
	// 			color => color.description,
	// 		);
	// 		setColorDescriptionList(recommendedDescriptions);

	// 		const recommendedShortDescriptions =
	// 			responseJson.recommended_colors.map(
	// 				color => color.description_Very_Short_Ver,
	// 			);
	// 		setColorShortList(recommendedShortDescriptions);

	// 		const objectHexCodes = responseJson.recommended_colors.hexcode_list;
	// 		setColors(objectHexCodes);

	// 		//	배경 무늬 색상 컨트롤
	// 		function shouldUseWhiteColor(hexColor) {
	// 			console.log(hexColor);
	// 			const r = parseInt(hexColor.substr(1, 2), 16);
	// 			const g = parseInt(hexColor.substr(3, 2), 16);
	// 			const b = parseInt(hexColor.substr(5, 2), 16);
	// 			const yiq = (r * 299 + g * 587 + b * 114) / 1000;
	// 			return setBackground(yiq < 220);
	// 		}
	// 		if (itemColor) {
	// 			shouldUseWhiteColor(itemColor);
	// 		}
	// 	}
	// }, [itemColor]);

	const handleColorPress = async color => {
		const colorData = getColorInfo(color.replace('#', ''));
		const engName = await getEngColorNameLocal(color);
		const korName = await getKorColorName(color);

		setSelectedColor({
			korName: korName,
			engName: engName,
			hexVal: colorData.hexVal,
			rgbVal: colorData.rgbVal,
			hslVal: colorData.hslVal,
			cmykVal: colorData.cmykVal,
		});
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

	// 오브젝트 화면으로 네비게이트
	const navigation = useNavigation();
	const navigateObjectScreen = () => {
		navigation.navigate('ObjectScreen', colors);
	};

	// 헤더 인포 텍스트
	const infotext =
		'분석한 색상들의 원을 터치해 보세요! 각 색상에 대해서 자세히 알려드립니다!';

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
							backgroundColor: '#ffffff',
						}}>
						<Spinner />
					</View>
				) : (
					<View style={styles.responseContainer}>
						<LeftCircle
							left={DISTANCE}
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
						<RightCircle
							right={DISTANCE}
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
						<LeftCircle
							left={DISTANCE}
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
						<RightCircle
							right={DISTANCE}
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
						<LeftCircle
							left={DISTANCE}
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
		zIndex: -1,
	},
});

export default AiResponseScreen;
