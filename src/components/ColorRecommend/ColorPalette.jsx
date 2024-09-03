import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { getColorInfo } from '@utils/colorRecommendUtils';
import useColorName from '@hooks/useColorName';
import tinycolor from 'tinycolor2';
import HangerIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ColorInfoModal from '@components/ColorRecommend/ColorInfoModal';
import { CustomText as Text } from '@components/common/CustomText';

const ColorPalette = ({ titleKor, titleEng, colors, onColorSelect }) => {
	const [isButtonPressed, setIsButtonPressed] = useState(false);
	const [selectedColor, setSelectedColor] = useState(null);
	const [isModalVisible, setIsModalVisible] = useState(false);
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

	useEffect(() => {
		if (selectedColor) {
			const updateColorInfo = async () => {
				const colorKey = selectedColor.replace('#', '');
				const colorData = getColorInfo(colorKey) || {};
				const engName = await getEngColorNameLocal(selectedColor);
				const korName = await getKorColorName(selectedColor);

				setColorInfo({
					engName,
					korName,
					hexVal: colorData.hexVal,
					rgbVal: colorData.rgbVal,
					hslVal: colorData.hslVal,
					cmykVal: colorData.cmykVal,
				});
			};

			updateColorInfo();
		}
	}, [selectedColor]);

	const handleColorPress = color => {
		setSelectedColor(color);
		setIsModalVisible(true);
	};

	const closeModal = () => {
		setIsModalVisible(false);
		setSelectedColor(null);
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.titleKor}>{titleKor}</Text>
				<Text style={styles.titleEng}>{titleEng}</Text>
			</View>
			<View style={styles.paletteContainer}>
				<View style={styles.colorRow}>
					{colors.map((color, index) => (
						<TouchableOpacity
							key={index}
							style={[
								styles.colorBox,
								{
									backgroundColor:
										tinycolor(color).toHexString(),
								},
							]}
							onPress={() =>
								handleColorPress(tinycolor(color).toHexString())
							}
						/>
					))}
				</View>
				<TouchableOpacity
					style={styles.iconContainer}
					onPress={() => {
						setIsButtonPressed(!isButtonPressed);
						onColorSelect(
							colors.map(c => tinycolor(c).toHexString()),
						);
						setTimeout(() => setIsButtonPressed(false), 100);
					}}>
					<HangerIcon
						name="hanger"
						size={50}
						color={isButtonPressed ? '#6200EE' : '#AAA'}
					/>
				</TouchableOpacity>
			</View>

			<ColorInfoModal
				isVisible={isModalVisible}
				onClose={closeModal}
				colorInfo={colorInfo}
				selectedColor={selectedColor}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginVertical: 10,
		padding: 10,
	},
	header: {
		flexDirection: 'row',
		marginBottom: 10,
	},
	titleKor: {
		color: '#333',
		fontSize: 18,
		fontWeight: 'bold',
		marginHorizontal: 4,
	},
	titleEng: {
		color: '#333',
		fontSize: 14,
		marginHorizontal: 4,
		alignSelf: 'flex-end',
	},
	paletteContainer: {
		flexDirection: 'row',
	},
	colorRow: {
		flexDirection: 'row',
		flex: 1,
		marginRight: 10,
	},
	colorBox: {
		flex: 1,
		height: 50,
		borderRadius: 4,
		marginRight: 2,
	},
	iconContainer: {
		width: 50,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default ColorPalette;
