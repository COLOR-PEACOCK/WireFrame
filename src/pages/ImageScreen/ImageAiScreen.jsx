import React, { useState, useEffect } from 'react';
import {
	SafeAreaView,
	View,
	StyleSheet,
	ScrollView,
	Alert,
} from 'react-native';
import tinycolor from 'tinycolor2';
import { COLOR } from '@styles/color';
import { BasicHeader, LoadingScreen } from '@components/common';
import { ColorPalette, MainColorInfo } from '@components/ColorRecommend';
import { useColorName, useGemini } from '@hooks';
import { getColorInfo } from '@utils/colorRecommendUtils';

const ImageAiScreen = ({ route, navigation }) => {
	const { mainColor } = route.params;
	const hexValue = mainColor.hexVal;
	const [data, setData] = useState(null);
	const [colorInfo, setColorInfo] = useState({
		engName: '',
		korName: '',
		hexVal: '',
		rgbVal: '',
		hslVal: '',
		cmykVal: '',
	});
	const { getKorColorName, getEngColorNameLocal } = useColorName();
	const { run } = useGemini();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		setColorInfo(() => {
			const colorData = getColorInfo(hexValue.replace('#', ''));
			return {
				engName: getEngColorNameLocal(hexValue),
				korName: getKorColorName(hexValue),
				hexVal: colorData.hexVal,
				rgbVal: colorData.rgbVal,
				hslVal: colorData.hslVal,
				cmykVal: colorData.cmykVal,
			};
		});
	}, [data]);

	const fetchData = async () => {
		setIsLoading(true);
		const response = await run(hexValue);
		setIsLoading(false);
		if (response) setData(response);
		else
			Alert.alert('알림', 'AI 분석중 오류가 발생했습니다.', [
				{ text: '확인', onPress: () => navigation.goBack() },
			]);
	};

	const textColor = tinycolor(hexValue).isLight()
		? COLOR.GRAY_9
		: COLOR.GRAY_6;
	const labelColor = tinycolor(hexValue).isLight()
		? COLOR.GRAY_10
		: COLOR.WHITE;

	const handleColorSelect = selectedColors => {
		navigation.navigate('ObjectScreen', selectedColors);
	};

	const infoText =
		'• 선택하신 색상을 기반으로 AI가 테마 선정해 색상을 추천해 드립니다. \n• 색상을 터치해 간단한 추천 이유와 함께 색상 정보를 확인하세요!';
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<BasicHeader
				titleIcon={'AI'}
				title={'AI 테마 추천'}
				subTitle={'ai theme recs'}
				rightIcon={'info'}
				infoText={infoText}
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
				<ScrollView
					style={{ paddingHorizontal: 18 }}
					showsVerticalScrollIndicator={false}>
					<View
						style={[
							styles.colorBox,
							{ backgroundColor: hexValue },
						]}>
						<MainColorInfo
							colorInfo={colorInfo}
							textColor={textColor}
							labelColor={labelColor}
							setIsPickerVisible={null}
						/>
					</View>
					<View style={{ marginBottom: 18 }}>
						{data &&
							data.recommended_themes_and_colors?.map(item => (
								<ColorPalette
									key={item.theme_name_kr}
									titleKor={item.theme_name_kr}
									titleEng={item.theme_name_eng}
									colors={[
										data?.base_color[0].hexCode,
									].concat(item.theme_hexCode_list)}
									onColorSelect={handleColorSelect}
									description={item.colors}
								/>
							))}
					</View>
				</ScrollView>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	colorBox: {
		flexDirection: 'row',
		width: '100%',
		height: 214,
		marginVertical: 24,
		paddingHorizontal: 18,
		paddingVertical: 12,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: COLOR.GRAY_3,
	},
	loadingSpinner: {
		top: 100,
		alignItems: 'center',
		justifyContent: 'center',
		color: COLOR.PRIMARY,
	},
});

export default ImageAiScreen;
