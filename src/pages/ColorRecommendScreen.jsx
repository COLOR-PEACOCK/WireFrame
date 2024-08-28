import React, { useState, useEffect } from 'react';
import BasicHeader from '@components/common/BasicHeader';
import {
	SafeAreaView,
	View,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Modal,
} from 'react-native';
import { CustomText as Text } from '@components/common/CustomText';
import { COLOR } from '@styles/color';
import ColorPicker, {
	Panel1,
	Swatches,
	Preview,
	OpacitySlider,
	HueSlider,
} from 'reanimated-color-picker';
import Icon from 'react-native-vector-icons/FontAwesome6';
import convert from 'color-convert'; // hex, hsl, cmyk, rgb 변환
import nearestColor from 'nearest-color'; // 색상 없을 때 가장 근접한 색상 불러오기
import tinycolor from 'tinycolor2'; // 메인 컬러 색상에 따라 어두우면 밝은 글씨 밝으면 어두운 글씨

import colorNames from './Best_of_names_subset.json';
import {
	getComplementaryColor,
	getAnalogousColors,
	getTriadicColors,
	getSplitComplementaryColors,
	getMonochromaticColors,
	getTetradicColors,
} from '../utils/colorRecommendUtils'; // 추천 팔레트 계산

const colors = colorNames.reduce((acc, { name, hex }) => {
	acc[name.toUpperCase()] = hex.slice(0, 7);
	return acc;
}, {});

const nearest = nearestColor.from(colors);

const getColorInfo = hexVal => {
	hexVal = hexVal.length > 6 ? hexVal.slice(0, 6) : hexVal;

	const nearestMatch = nearest(`#${hexVal}`);

	const rgbArray = convert.hex.rgb(hexVal.replace('#', ''));
	const hslArray = convert.hex.hsl(hexVal.replace('#', ''));
	const cmykArray = convert.hex.cmyk(hexVal.replace('#', ''));
	// TODO: cmyk 정확도 확인해야함

	return {
		engName: nearestMatch.name || 'Unknown Color',
		hexVal: `#${hexVal}`,
		rgbVal: `rgb(${rgbArray.join(', ')})`,
		hslVal: `hsl(${hslArray[0]}, ${hslArray[1]}%, ${hslArray[2]}%)`,
		cmykVal: `CMYK(${cmykArray.join('%, ')}%)`,
	};
};

const ColorPalette = ({ titleKor, titleEng, colors, textColor }) => (
	<View style={styles.paletteContainer}>
		<View style={styles.paletteName}>
			<Text style={[styles.paletteTitle, { color: textColor }]}>
				{titleKor}
			</Text>
			<Text style={[styles.paletteTitleEng, { color: textColor }]}>
				{titleEng}
			</Text>
		</View>
		<View style={styles.colorRow}>
			{colors.map((color, index) => (
				<View
					key={index}
					style={[
						styles.colorBox,
						{ backgroundColor: tinycolor(color).toHexString() },
					]}
				/>
			))}
		</View>
	</View>
);

const ColorRecommendScreen = ({ mainColor }) => {
	const [color, setColor] = useState(mainColor.hexVal);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isPickerVisible, setIsPickerVisible] = useState(false);
	const [tempColor, setTempColor] = useState(mainColor.hexVal);
	const [colorInfo, setColorInfo] = useState(mainColor);
	const [selectedColor, setSelectedColor] = useState(null);

	useEffect(() => {
		setColorInfo(getColorInfo(tempColor.replace('#', '')));
	}, [color]);

	const textColor = tinycolor(color).isLight() ? COLOR.GRAY_9 : COLOR.GRAY_2;

	const openColorInfoModal = color => {
		setSelectedColor(getColorInfo(color.replace('#', '')));
		setIsModalVisible(true);
	};

	const saveColor = () => {
		setColor(tempColor);
		setIsPickerVisible(false);
	};

	const hslColor = convert.hex.hsl(color.replace('#', ''));
	const complementaryColors = [color, getComplementaryColor(hslColor)];

	const analogousColors = [color, ...getAnalogousColors(hslColor)];
	const triadicColors = [
		color,
		...getTriadicColors(hslColor).map(hsl => tinycolor(hsl).toHexString()),
	];
	const splitComplementaryColors = [
		color,
		...getSplitComplementaryColors(hslColor),
	];
	const monochromaticColors = [color, ...getMonochromaticColors(hslColor)];
	const tetradicColors = [color, ...getTetradicColors(hslColor)];

	return (
		<SafeAreaView style={styles.safeAreaView}>
			<BasicHeader title={'색상 추천 화면'} />
			<View style={[styles.mainColorBox, { backgroundColor: color }]}>
				<View style={styles.mainColorInfoBox}>
					<Text
						style={[
							styles.text,
							{ color: textColor },
							{ fontSize: 20 },
						]}>
						{colorInfo.engName}
					</Text>

					<Text style={[styles.text, { color: textColor }]}>
						{colorInfo.rgbVal}
					</Text>
					<Text style={[styles.text, { color: textColor }]}>
						{colorInfo.hexVal}
					</Text>
					<Text style={[styles.text, { color: textColor }]}>
						{colorInfo.hslVal}
					</Text>
					<Text style={[styles.text, { color: textColor }]}>
						{colorInfo.cmykVal}
					</Text>
				</View>
				<TouchableOpacity
					style={styles.colorEditIcon}
					onPress={() => setIsPickerVisible(true)}>
					<Icon name={'sliders'} size={24} color={textColor} />
				</TouchableOpacity>
			</View>

			<ScrollView>
				<ColorPalette
					titleKor="단색"
					titleEng="Monochromatic color"
					colors={monochromaticColors}
				/>
				<ColorPalette
					titleKor="보색"
					titleEng="Complementary color"
					colors={complementaryColors}
				/>
				<ColorPalette
					titleKor="유사색"
					titleEng="Analogous colors"
					colors={analogousColors}
				/>
				<ColorPalette
					titleKor="분할 보색"
					titleEng="Split complementary colors"
					colors={splitComplementaryColors}
				/>
				<ColorPalette
					titleKor="3가지 색상 조화"
					titleEng="Three colors harmony"
					colors={triadicColors}
				/>

				<ColorPalette
					titleKor="4가지 색상 조화"
					titleEng="Four colors harmony"
					colors={tetradicColors}
				/>
			</ScrollView>

			{isPickerVisible && (
				<Modal
					animationType="slide"
					transparent={true}
					visible={isPickerVisible}
					onRequestClose={() => setIsPickerVisible(false)}>
					<View style={styles.modalContainer}>
						<View style={styles.modalContent}>
							<ColorPicker
								value={tempColor}
								onComplete={selectedColor =>
									setTempColor(selectedColor.hex)
								}>
								<Panel1 />
								<HueSlider />
								<OpacitySlider />
								<Swatches />
								<Preview />
							</ColorPicker>
							<View style={styles.modalButtons}>
								<TouchableOpacity
									style={styles.saveButton}
									onPress={saveColor}>
									<Text style={styles.saveButtonText}>
										저장
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={styles.closeModalBtn}
									onPress={() => setIsPickerVisible(false)}>
									<Text style={styles.closeModalText}>
										취소
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeAreaView: {
		flex: 1,
	},
	mainColorBox: {
		flexDirection: 'row',
		margin: 28,
		justifyContent: 'space-between',
		padding: 20,
		borderRadius: 10,
	},
	mainColorInfoBox: {
		flex: 1,
		marginRight: 10,
	},
	text: {
		marginVertical: 2,
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modalContent: {
		width: 300,
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 10,
		alignItems: 'center',
	},
	modalButtons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 20,
	},
	saveButton: {
		backgroundColor: COLOR.PRIMARY,
		padding: 10,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 10,
	},
	saveButtonText: {
		color: COLOR.GRAY_1,
		fontWeight: 'bold',
	},
	closeModalBtn: {
		backgroundColor: COLOR.GRAY_4,
		padding: 10,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	closeModalText: {
		color: COLOR.GRAY_1,
		fontWeight: 'bold',
	},
	colorEditIcon: {
		marginLeft: 'auto',
	},
	paletteContainer: {
		marginVertical: 8,
		padding: 8,
	},
	paletteName: {
		flexDirection: 'row',
	},
	paletteTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 5,
		marginHorizontal: 4,
	},
	paletteTitleEng: {
		marginTop: 6,
	},
	colorRow: {
		flexDirection: 'row',
		marginVertical: 4,
	},
	colorBox: {
		flex: 1,
		height: 50,
	},
});

const ParentComponent = () => {
	const dummyMainColor = '#635143';

	return <ColorRecommendScreen mainColor={{ hexVal: dummyMainColor }} />;
};

export default ParentComponent;
