import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { getColorInfo } from '@utils/colorRecommendUtils';
import useColorName from '@hooks/useColorName';
import tinycolor from 'tinycolor2';
import HangerIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ColorInfoModal from '@components/ColorRecommend/ColorInfoModal';
import { CustomText as Text } from '@components/common/CustomText';
import { COLOR } from '@styles/color';

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
					{colors.map((color, index) => {
						const borderRadiusStyle =
							index === 0
								? {
										borderTopLeftRadius: 8,
										borderBottomLeftRadius: 8,
								  }
								: index === colors.length - 1
								? {
										borderTopRightRadius: 8,
										borderBottomRightRadius: 8,
								  }
								: {};

						return (
							<TouchableOpacity
								key={index}
								style={[
									styles.colorBox,
									{
										backgroundColor:
											tinycolor(color).toHexString(),
									},
									borderRadiusStyle,
								]}
								onPress={() =>
									handleColorPress(
										tinycolor(color).toHexString(),
									)
								}
								activeOpacity={0.9}
							/>
						);
					})}
				</View>
				<TouchableOpacity
					style={[
						styles.iconContainer,
						{
							backgroundColor: isButtonPressed
								? COLOR.PRIMARY
								: COLOR.WHITE,
						},
					]}
					activeOpacity={1}
					onPress={() => {
						setIsButtonPressed(!isButtonPressed);
						onColorSelect(
							colors.map(c => tinycolor(c).toHexString()),
						);
						setTimeout(() => setIsButtonPressed(false), 100);
					}}>
					<HangerIcon
						name="hanger"
						size={20}
						color={isButtonPressed ? COLOR.WHITE : COLOR.PRIMARY}
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
		// padding: 10,
		marginHorizontal: 18,
		marginVertical: 6,
	},
	header: {
		flexDirection: 'row',
		// marginHorizontal: 9,
		marginBottom: 3,
	},
	titleKor: {
		color: COLOR.GRAY_10,
		fontSize: 18,
		// fontWeight: 'medium',
		fontFamily: 'Pretendard-medium',
		// marginHorizontal: 4,
	},
	titleEng: {
		color: COLOR.GRAY_6,
		fontSize: 12,
		marginHorizontal: 6,
		fontFamily: 'Pretendard-medium',

		alignSelf: 'flex-end',
	},
	paletteContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: 50,
		// paddingHorizontal: 9,
		alignSelf: 'center',
	},
	colorRow: {
		flexDirection: 'row',
		flex: 1,
		marginRight: 10,
	},
	colorBox: {
		flex: 1,
		height: 50,
		marginHorizontal: -1, // 팔레트 칩 사이 간격 최소화
		marginVertical: 0,
		borderWidth: 0,
		padding: 0,
	},
	iconContainer: {
		width: 50,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 8,
		shadowColor: COLOR.GRAY_3,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		backgroundColor: 'rgba(255, 255, 255, 1)',
		borderWidth: 2,
		borderColor: 'rgba(224, 224, 224, 1)',
	},
});

export default ColorPalette;
