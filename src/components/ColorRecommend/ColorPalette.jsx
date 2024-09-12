import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { getColorInfo } from '@utils/colorRecommendUtils';
import useColorName from '@hooks/useColorName';
import tinycolor from 'tinycolor2';
import HangerIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ColorInfoModal from '@components/ColorRecommend/ColorInfoModal';
import { CustomText as Text } from '@components/common/CustomText';
import { COLOR } from '@styles/color';

const ColorPalette = ({
	titleKor,
	titleEng,
	colors,
	onColorSelect,
	description,
}) => {
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
			const updateColorInfo = () => {
				const colorKey = selectedColor.replace('#', '');
				const colorData = getColorInfo(colorKey) || {};
				const engName = getEngColorNameLocal(selectedColor);
				const korName = getKorColorName(selectedColor);

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
				<Pressable
					style={[
						styles.iconContainer,
						{
							backgroundColor: isButtonPressed
								? COLOR.PRIMARY
								: COLOR.WHITE,
						},
					]}
					activeOpacity={1}
					onPressIn={() => setIsButtonPressed(true)}
					onPress={() => {
						onColorSelect(
							colors.map(c => tinycolor(c).toHexString()),
						);
					}}
					onPressOut={() => setIsButtonPressed(false)}>
					<HangerIcon
						name="hanger"
						size={24}
						color={isButtonPressed ? COLOR.WHITE : COLOR.PRIMARY}
					/>
				</Pressable>
			</View>

			<ColorInfoModal
				isVisible={isModalVisible}
				onClose={closeModal}
				colorInfo={colorInfo}
				selectedColor={selectedColor}
				description={
					description &&
					selectedColor &&
					description.find(
						item =>
							item.hexCode &&
							item.hexCode.toLowerCase() ===
								selectedColor.toLowerCase(),
					)?.harmony_description
				}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginVertical: 6,
	},
	header: {
		flexDirection: 'row',
		marginBottom: 3,
	},
	titleKor: {
		color: COLOR.GRAY_10,
		fontSize: 18,
		fontFamily: 'Pretendard-Bold',
		marginLeft: 3,
	},
	titleEng: {
		color: COLOR.GRAY_7,
		fontSize: 12,
		fontFamily: 'Pretendard-medium',
		marginLeft: 6,
		alignSelf: 'flex-end',
	},
	paletteContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: 50,
	},
	colorRow: {
		flexDirection: 'row',
		flex: 1,
		marginRight: 10,
		borderRadius: 8,
		borderWidth: 2,
		borderColor: COLOR.GRAY_3,
	},
	colorBox: {
		flex: 1,
		height: 50,
		marginHorizontal: -1, // 팔레트 칩 사이 간격 최소화
	},
	iconContainer: {
		width: 50,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 8,
		backgroundColor: COLOR.WHITE,
		borderWidth: 2,
		borderColor: COLOR.GRAY_3,
	},
});

export default ColorPalette;
