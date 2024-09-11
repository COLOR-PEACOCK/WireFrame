import React, { useState, useEffect, useMemo } from 'react';
import {
	SafeAreaView,
	View,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	ActivityIndicator,
} from 'react-native';
import { getColorInfo } from '@utils/colorRecommendUtils';
import useColorName from '@hooks/useColorName';
import tinycolor from 'tinycolor2';
import SliderIcon from 'react-native-vector-icons/FontAwesome6';
import BasicHeader from '@components/common/BasicHeader';
import ColorPickerModal from '@components/ColorRecommend/ColorPickerModal';
import ColorPalette from '@components/ColorRecommend/ColorPalette';
import MainColorInfo from '@components/ColorRecommend/MainColorInfo';
import { COLOR } from '@styles/color';
import useGemini from '@hooks/useGemini';
import Spinner from '@components/common/Spinner';

const ImageAiScreen = ({ route, navigation }) => {
	const { mainColor } = route.params;
	const hexValue = mainColor.hexVal;
	const [data, setData] = useState([]);
	const [colorInfo, setColorInfo] = useState({
		engName: '',
		korName: '',
		hexVal: '',
		rgbVal: '',
		hslVal: '',
		cmykVal: '',
	});
	const { getEngColorName, getKorColorName, getEngColorNameLocal } =
		useColorName();
	const { run, isLoading } = useGemini();
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
		setData(await run(hexValue));
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
		'선택하신 색상을 기반으로 AI가 테마를 선정해 각 테마에 어울리는 색상을 추천해 드립니다.';

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
						backgroundColor: COLOR.WHITE,
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<Spinner />
				</View>
			) : (
				<>
					<View
						style={[
							styles.colorBox,
							{ backgroundColor: hexValue },
						]}>
						<MainColorInfo
							colorInfo={colorInfo}
							textColor={textColor}
							labelColor={labelColor}
						/>
					</View>
					<ScrollView style={{paddingHorizontal: 18}}>
						{data.recommended_themes_and_colors?.map(item => (
							<ColorPalette
								key={item.theme_name_kr}
								titleKor={item.theme_name_kr}
								titleEng={item.theme_name_eng}
								colors={[data?.base_color[0].hexCode].concat(
									item.theme_hexCode_list,
								)}
								onColorSelect={handleColorSelect}
                description={item.colors}
							/>
						))}
					</ScrollView>
				</>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	colorBox: {
		flexDirection: 'row',
		width: 376,
		height: 214,
		marginHorizontal: 18,
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
