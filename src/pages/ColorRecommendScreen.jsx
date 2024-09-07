import React, { useState, useEffect, useMemo } from 'react';
import {
	SafeAreaView,
	View,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
} from 'react-native';
import {
	getComplementaryColor,
	getAnalogousColors,
	getTriadicColors,
	getSplitComplementaryColors,
	getMonochromaticColors,
	getTetradicColors,
	getTintColors,
	getShadowColors,
} from '@utils/colorRecommendUtils';
import { getColorInfo } from '@utils/colorRecommendUtils';
import useColorName from '@hooks/useColorName';
import tinycolor from 'tinycolor2';
import convert from 'color-convert';
import SliderIcon from 'react-native-vector-icons/FontAwesome6';
import BasicHeader from '@components/common/BasicHeader';
import ColorPickerModal from '@components/ColorRecommend/ColorPickerModal';
import ColorPalette from '@components/ColorRecommend/ColorPalette';
import MainColorInfo from '@components/ColorRecommend/MainColorInfo';
import { COLOR } from '@styles/color';

const ColorRecommendScreen = ({ route, navigation }) => {
	const { mainColor } = route.params;
	const [color, setColor] = useState(mainColor);
	const [isPickerVisible, setIsPickerVisible] = useState(false);
	const [tempColor, setTempColor] = useState(mainColor);
	const { getEngColorName, getKorColorName, getEngColorNameLocal } =
		useColorName();

	const [colorInfo, setColorInfo] = useState(() => {
		const colorData = getColorInfo(tempColor.replace('#', ''));
		return {
			engName: getEngColorNameLocal(tempColor),
			korName: getKorColorName(tempColor),
			hexVal: colorData.hexVal,
			rgbVal: colorData.rgbVal,
			hslVal: colorData.hslVal,
			cmykVal: colorData.cmykVal,
		};
	});

	useEffect(() => {
		if (tempColor) {
			const updateColorInfo = async () => {
				const colorData = getColorInfo(tempColor.replace('#', ''));
				const engName = await getEngColorNameLocal(tempColor);
				const korName = await getKorColorName(tempColor);

				setColorInfo({
					engName: engName,
					korName: korName,
					hexVal: colorData.hexVal,
					rgbVal: colorData.rgbVal,
					hslVal: colorData.hslVal,
					cmykVal: colorData.cmykVal,
				});
			};

			updateColorInfo();
		}
	}, [tempColor]);

	const textColor = tinycolor(tempColor).isLight()
		? COLOR.GRAY_8
		: COLOR.GRAY_6;
	const labelColor = tinycolor(tempColor).isLight()
		? COLOR.GRAY_10
		: COLOR.WHITE;

	const handleColorSelect = selectedColors => {
		console.log('선택 팔레트', selectedColors);
		// TODO: 선택 팔레트 넘겨주기
	};

	const hslColor = convert.hex.hsl(tempColor.replace('#', ''));

	const complementaryColors = useMemo(
		() => [...getComplementaryColor(hslColor)],
		[hslColor],
	);

	const analogousColors = useMemo(
		() => [...getAnalogousColors(hslColor)],
		[hslColor],
	);

	const triadicColors = useMemo(
		() => [
			...getTriadicColors(hslColor).map(hsl =>
				tinycolor(hsl).toHexString(),
			),
		],
		[hslColor],
	);

	const splitComplementaryColors = useMemo(
		() => [...getSplitComplementaryColors(hslColor)],
		[hslColor],
	);

	const monochromaticColors = useMemo(
		() => [...getMonochromaticColors(hslColor)],
		[hslColor],
	);

	const tetradicColors = useMemo(
		() => [...getTetradicColors(hslColor)],
		[hslColor],
	);

	const tintColors = useMemo(() => [...getTintColors(hslColor)], [hslColor]);

	const shadowColors = useMemo(
		() => [...getShadowColors(hslColor)],
		[hslColor],
	);

	const infoText =
		'추출 색상을 기반하여 색상 추천 목록을 자세히 제공. 개체를 이용해 사용자에게 색상에 대해 미리보기 또한 선사합니다.';

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<BasicHeader
				titleIcon={'picture'}
				title={'색상 추천'}
				engTitle={'color palette'}
				rightIcon={'info'}
				infoText={infoText}
			/>

			<View style={[styles.colorBox, { backgroundColor: tempColor }]}>
				<MainColorInfo
					colorInfo={colorInfo}
					textColor={textColor}
					labelColor={labelColor}
				/>
				<TouchableOpacity onPress={() => setIsPickerVisible(true)}>
					<SliderIcon
						name="sliders"
						size={38}
						color={labelColor}
						style={{ marginVertical: 9 }}
					/>
				</TouchableOpacity>
			</View>
			<ScrollView>
				<ColorPalette
					titleKor="단색"
					titleEng="Monochromatic color"
					colors={monochromaticColors}
					onColorSelect={handleColorSelect}
				/>
				<ColorPalette
					titleKor="보색"
					titleEng="Complementary color"
					colors={complementaryColors}
					onColorSelect={handleColorSelect}
				/>
				<ColorPalette
					titleKor="밝게"
					titleEng="Tint"
					colors={tintColors}
					onColorSelect={handleColorSelect}
				/>
				<ColorPalette
					titleKor="어둡게"
					titleEng="Shade"
					colors={shadowColors}
					onColorSelect={handleColorSelect}
				/>
				<ColorPalette
					titleKor="유사색"
					titleEng="Analogous colors"
					colors={analogousColors}
					onColorSelect={handleColorSelect}
				/>
				<ColorPalette
					titleKor="분할 보색"
					titleEng="Split complementary colors"
					colors={splitComplementaryColors}
					onColorSelect={handleColorSelect}
				/>
				<ColorPalette
					titleKor="3가지 색상 조화"
					titleEng="Three colors harmony"
					colors={triadicColors}
					onColorSelect={handleColorSelect}
				/>
				<ColorPalette
					titleKor="4가지 색상 조화"
					titleEng="Four colors harmony"
					colors={tetradicColors}
					onColorSelect={handleColorSelect}
				/>
			</ScrollView>
			<ColorPickerModal
				isVisible={isPickerVisible}
				tempColor={tempColor}
				setTempColor={setTempColor}
				setIsPickerVisible={setIsPickerVisible}
				onCancel={() => setIsPickerVisible(false)}
			/>
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
	},
});

export default ColorRecommendScreen;
