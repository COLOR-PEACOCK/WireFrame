import React, { useState, useEffect, useMemo } from 'react';
import {
	SafeAreaView,
	View,
	StyleSheet,
	ScrollView,
} from 'react-native';
import tinycolor from 'tinycolor2';
import convert from 'color-convert';

// components
import { BasicHeader } from '@components/common';
import {
	ColorPickerModal,
	ColorPalette,
	MainColorInfo,
} from '@components/ColorRecommend';

// hook & utils
import { getColorInfo } from '@utils/colorRecommendUtils';
import { useColorName } from '@hooks';
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

// styles
import { COLOR } from '@styles/color';

const ColorRecommendScreen = ({ route, navigation }) => {
	const { mainColor } = route.params;
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
		if (tempColor) {
			const updateColorInfo = () => {
				const colorData = getColorInfo(tempColor.replace('#', ''));
				const engName = getEngColorNameLocal(tempColor);
				const korName = getKorColorName(tempColor);

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
		? COLOR.GRAY_9
		: COLOR.GRAY_3;
	const labelColor = tinycolor(tempColor).isLight()
		? COLOR.GRAY_10
		: COLOR.WHITE;

	const handleColorSelect = selectedColors => {
		// TODO: 선택 팔레트 넘겨주기
		navigation.navigate('ObjectScreen', selectedColors);
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
				titleIcon={'palette'}
				title={'색상 추천'}
				subTitle={'color palette'}
				rightIcon={'info'}
				infoText={infoText}
			/>

			<View style={styles.container}>
				<ScrollView style={styles.colorPaletteWrap}
				showsVerticalScrollIndicator={false}
				>
				<View style={[styles.colorBox, { backgroundColor: tempColor }]}>
					<MainColorInfo
						colorInfo={colorInfo}
						textColor={textColor}
						labelColor={labelColor}
						setIsPickerVisible={setIsPickerVisible}
					/>
				</View>

				<View style={styles.split}/>
				<View style={{marginBottom: 18}}>
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
					</View>
				</ScrollView>

				<ColorPickerModal
					isVisible={isPickerVisible}
					tempColor={tempColor}
					setTempColor={setTempColor}
					setIsPickerVisible={setIsPickerVisible}
					onCancel={() => setIsPickerVisible(false)}
				/>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		paddingHorizontal: 18,
	},
	colorBox: {
		flexDirection: 'row',
		width: '100%',
		height: 214,
		marginVertical: 24,
		paddingHorizontal: 18,
		paddingVertical: 12,
		borderWidth: 2,
		borderRadius: 10,
		borderColor: COLOR.GRAY_3,
	},
	colorPaletteWrap: {
		width: '100%',
	},
	split: {
		width: '100%',
		height: 4,
		marginBottom: 18,
		backgroundColor: COLOR.GRAY_1,
	},
});

export default ColorRecommendScreen;
