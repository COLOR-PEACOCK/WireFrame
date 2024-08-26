// ColorRecommendScreen.jsx 백업 with "color-namer, color-convert" library

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
import namer from 'color-namer';
import convert from 'color-convert';
import tinycolor from 'tinycolor2';

const ColorDisplay = ({ title, colors, onColorPress }) => {
	return (
		<View style={styles.section}>
			<Text>{title}</Text>
			<View style={styles.colorSet}>
				<View
					style={[
						styles.colorContainer,
						{ width: `${colors.length * (100 / colors.length)}%` },
					]}>
					{colors.map((color, index) => (
						<TouchableOpacity
							key={index}
							style={[
								styles.colorBox,
								{
									backgroundColor: color,
									flex: 1 / colors.length,
								},
							]}
							onPress={() =>
								onColorPress(color)
							}></TouchableOpacity>
					))}
				</View>
				<TouchableOpacity style={styles.iconContainer}>
					<Icon name="chevron-right" size={24} />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const ColorRecommendScreen = ({ mainColor }) => {
	const [color, setColor] = useState(mainColor.hexVal);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isPickerVisible, setIsPickerVisible] = useState(false);
	const [tempColor, setTempColor] = useState(mainColor.hexVal);
	const [colorInfo, setColorInfo] = useState(mainColor);
	const [selectedColor, setSelectedColor] = useState(null);

	useEffect(() => {
		const hexVal = tempColor.replace('#', '');
		const rgbArray = convert.hex.rgb(hexVal);
		const hslArray = convert.hex.hsl(hexVal);
		const cmykArray = convert.hex.cmyk(hexVal);
		const nameResults = namer(`#${hexVal}`, { pick: ['ntc'] });

		setColorInfo({
			engName: nameResults.ntc[0].name,
			hexVal: `#${hexVal.slice(0, 6)}`,
			rgbVal: `rgb(${rgbArray.join(', ')})`,
			hslVal: `hsl(${hslArray[0]}, ${hslArray[1]}%, ${hslArray[2]}%)`,
			cmykVal: `CMYK(${cmykArray.join('%, ')}%)`,
		});
	}, [color]);

	const openColorInfoModal = color => {
		const hexVal = color.replace('#', '');
		const rgbArray = convert.hex.rgb(hexVal);
		const hslArray = convert.hex.hsl(hexVal);
		const cmykArray = convert.hex.cmyk(hexVal);
		const nameResults = namer(`#${hexVal}`, { pick: ['ntc'] });

		setSelectedColor({
			engName: nameResults.ntc[0].name,
			hexVal: `#${hexVal}`,
			rgbVal: `rgb(${rgbArray.join(', ')})`,
			hslVal: `hsl(${hslArray[0]}, ${hslArray[1]}%, ${hslArray[2]}%)`,
			cmykVal: `CMYK(${cmykArray.join('%, ')}%)`,
		});
		setIsModalVisible(true);
	};

	const openPickerModal = () => {
		setTempColor(color);
		setIsPickerVisible(true);
	};

	const closePickerModal = () => {
		setIsPickerVisible(false);
	};

	const closeModal = () => {
		setIsModalVisible(false);
	};
	const saveColor = () => {
		setColor(tempColor);
		closePickerModal();
	};

	const handleColorChange = selectedColor => {
		setTempColor(selectedColor.hex);
	};

	const complementary = [tinycolor(color).complement().toHexString()];
	const analogous = tinycolor(color)
		.analogous()
		.map(t => t.toHexString());
	const triadic = tinycolor(color)
		.triad()
		.map(t => t.toHexString());
	const splitComplementary = tinycolor(color)
		.splitcomplement()
		.map(t => t.toHexString());
	const monochromatic = tinycolor(color)
		.monochromatic()
		.map(t => t.toHexString());
	const tetradic = tinycolor(color)
		.tetrad()
		.map(t => t.toHexString());

	return (
		<SafeAreaView style={styles.safeAreaView}>
			<BasicHeader title={'색상 추천 화면'} />
			<View style={styles.mainColorBox}>
				<View
					style={[
						styles.mainColorSquare,
						{ backgroundColor: color },
					]}></View>
				<View style={styles.mainColorInfoBox}>
					<Text>{colorInfo.engName}</Text>
					<Text>{colorInfo.hexVal}</Text>
					<Text>{colorInfo.rgbVal}</Text>
					<Text>{colorInfo.cmykVal}</Text>
					<Text>{colorInfo.hslVal}</Text>
				</View>
				<TouchableOpacity onPress={openPickerModal}>
					<Icon name={'sliders'} size={24} />
				</TouchableOpacity>
			</View>
			<ScrollView>
				<ColorDisplay
					title="보색"
					colors={complementary}
					onColorPress={openColorInfoModal}
				/>
				<ColorDisplay
					title="유사색"
					colors={analogous}
					onColorPress={openColorInfoModal}
				/>
				<ColorDisplay
					title="3색 조화"
					colors={triadic}
					onColorPress={openColorInfoModal}
				/>
				<ColorDisplay
					title="분할 보색"
					colors={splitComplementary}
					onColorPress={openColorInfoModal}
				/>
				<ColorDisplay
					title="단색"
					colors={monochromatic}
					onColorPress={openColorInfoModal}
				/>
				<ColorDisplay
					title="4색 조화"
					colors={tetradic}
					onColorPress={openColorInfoModal}
				/>
			</ScrollView>

			{/* 컬러 피커 모달 */}
			{isPickerVisible && (
				<Modal
					animationType="slide"
					transparent={true}
					visible={isPickerVisible}
					onRequestClose={closePickerModal}>
					<View style={styles.modalContainer}>
						<View style={styles.modalContent}>
							<ColorPicker
								value={tempColor}
								onComplete={handleColorChange}>
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
									onPress={closePickerModal}>
									<Text style={styles.closeModalText}>
										취소
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>
			)}

			{/* 색상 정보 모달 */}
			{isModalVisible && selectedColor && (
				<Modal
					animationType="slide"
					transparent={true}
					visible={isModalVisible}
					onRequestClose={closeModal}>
					<View style={styles.modalContainer}>
						<View style={styles.modalContent}>
							<Text style={styles.modalTitle}>색상 정보</Text>
							<View
								style={[
									styles.colorPreview,
									{ backgroundColor: selectedColor.hexVal },
								]}
							/>
							<Text>{selectedColor.engName}</Text>
							<Text>{selectedColor.hexVal}</Text>
							<Text>{selectedColor.rgbVal}</Text>
							<Text>{selectedColor.hslVal}</Text>
							<Text>{selectedColor.cmykVal}</Text>
							<TouchableOpacity
								onPress={closeModal}
								style={styles.closeModalBtn}>
								<Text style={styles.closeModalText}>닫기</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	colorSet: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	section: {
		marginBottom: 20,
		marginHorizontal: 16,
	},
	colorContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		flex: 1,
	},
	colorBox: {
		height: 100,
		justifyContent: 'center',
		alignItems: 'center',
	},
	colorText: {
		color: '#fff',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	iconContainer: {
		paddingLeft: 10,
	},
	safeAreaView: {
		flex: 1,
	},
	mainColorBox: {
		flexDirection: 'row',
		margin: 28,
	},
	mainColorSquare: {
		width: 90,
		height: 140,
		borderRadius: 8,
	},
	mainColorInfoBox: {
		marginHorizontal: 28,
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
	modalTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	colorPreview: {
		width: '100%',
		height: 200,
		marginBottom: 10,
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
		color: '#fff',
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
		color: '#fff',
		fontWeight: 'bold',
	},
});

const ParentComponent = () => {
	const dummyMainColor = {
		engName: 'Lavender Purple',
		korName: '라벤더 퍼플',
		hexVal: '#8E6E97', // 헥스코드 확인
		rgbVal: 'rgb(142, 110, 151)',
		cmykVal: 'CMYK(6%, 27%, 0%, 41%)',
		hslVal: 'hsl(284, 17%, 51%)',
	};

	return <ColorRecommendScreen mainColor={dummyMainColor} />;
};

export default ParentComponent;
