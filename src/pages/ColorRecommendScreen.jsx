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
} from '@utils/colorRecommendUtils';
import { getColorInfo } from '@utils/colorRecommendUtils';
import useColorName from '@hooks/useColorName';
import tinycolor from 'tinycolor2';
import convert from 'color-convert';
import Icon from 'react-native-vector-icons/FontAwesome6';
import BasicHeader from '@components/common/BasicHeader';
import ColorPickerModal from '@components/ColorRecommend/ColorPickerModal';
import ColorPalette from '@components/ColorRecommend/ColorPalette';
import MainColorInfo from '@components/ColorRecommend/MainColorInfo';
import { COLOR } from '@styles/color';

const ColorRecommendScreen = ({ route, navigation }) => {
	const { mainColor } = route.params;
	const [color, setColor] = useState(mainColor.hexVal);
	const [isPickerVisible, setIsPickerVisible] = useState(false);
	const [tempColor, setTempColor] = useState(mainColor.hexVal);
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
	}, [tempColor]);

	const textColor = tinycolor(color).isLight() ? COLOR.GRAY_9 : COLOR.GRAY_2;

	const saveColor = () => {
		setColor(tempColor);
		setIsPickerVisible(false);
	};

	const handleColorSelect = selectedColors => {
		console.log('선택 팔레트', selectedColors);
		// TODO: 선택 팔레트 넘겨주기
	};

	const hslColor = convert.hex.hsl(color.replace('#', ''));

	const complementaryColors = useMemo(
		() => [color, getComplementaryColor(hslColor)],
		[color, hslColor],
	);

	const analogousColors = useMemo(
		() => [color, ...getAnalogousColors(hslColor)],
		[color, hslColor],
	);

	const triadicColors = useMemo(
		() => [
			color,
			...getTriadicColors(hslColor).map(hsl =>
				tinycolor(hsl).toHexString(),
			),
		],
		[color, hslColor],
	);

	const splitComplementaryColors = useMemo(
		() => [color, ...getSplitComplementaryColors(hslColor)],
		[color, hslColor],
	);

	const monochromaticColors = useMemo(
		() => [color, ...getMonochromaticColors(hslColor)],
		[color, hslColor],
	);

	const tetradicColors = useMemo(
		() => [color, ...getTetradicColors(hslColor)],
		[color, hslColor],
	);
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<BasicHeader title={'색상 추천 화면'} />
			<View style={[styles.colorBox, { backgroundColor: color }]}>
				<MainColorInfo colorInfo={colorInfo} textColor={textColor} />
				<TouchableOpacity onPress={() => setIsPickerVisible(true)}>
					<Icon name="sliders" size={24} color={textColor} />
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
				onSave={saveColor}
				onCancel={() => setIsPickerVisible(false)}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	colorBox: {
		flexDirection: 'row',
		margin: 28,
		justifyContent: 'space-between',
		padding: 20,
		borderRadius: 10,
	},
});

export default ColorRecommendScreen;
