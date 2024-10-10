import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOR } from '@styles/color';
import { BasicHeader, LoadingScreen, CustomPopup } from '@components/common';
import { AiCircle, Background } from '@components/AiRecommend';
import useRunAi from '@hooks/AiScreen/useRunAi';

const AiResponseScreen = ({ route }) => {
	const { itemInImage, itemToRecommend, base64Image } = route.params;

	const [isButtonPressed, setIsButtonPressed] = useState(false);

	// 헤더 인포 텍스트
	const infotext =
		'• 분석한 색상들의 원을 터치해 보세요!\n• 각 색상에 대해서 자세히 알려드립니다!';

	// 팝업 메세지
	const popupMessage =
		'분석한 색상들의 원을 터치해 보세요!\n• 각 색상에 대해서 자세히 알려드립니다!';

	// AI 결과 나오는 원 컨테이너 세로 길이 값 저장
	const [containerHeight, setContainerHeight] = useState(0);

	// 오브젝트 화면으로 네비게이트
	const navigation = useNavigation();
	const navigateObjectScreen = () => {
		navigation.navigate('ObjectScreen', colors);
	};

	// AI 결과 원 컨테이너의 세로길이 구하는 함수
	const handleLayout = event => {
		const { height } = event.nativeEvent.layout;
		setContainerHeight(height); // 세로 길이를 상태에 저장
	};

	// AI 실행 훅
	const {
		runAIModel,
		korColorNameList,
		engColorNameList,
		colorCodeList,
		colorDescriptionList,
		colorShortList,
		isLoading,
		colors,
		itemColor,
	} = useRunAi();

	// 배경 무늬 state
	const [background, setBackground] = useState(true);

	// AiCircle 상태 변화
	const [isSelected, setIsSelected] = useState([
		'medium',
		'medium',
		'medium',
		'medium',
		'medium',
	]);

	// AiCircle 배열 생성
	const aiCircles = Array.from({ length: 5 }, (_, index) => (
		<AiCircle
			key={index}
			type={index % 2 === 0 ? 'left' : 'right'}
			number={index}
			colorCode={colorCodeList}
			korColorName={korColorNameList}
			engColorName={engColorNameList}
			colorShort={colorShortList}
			colorDescription={colorDescriptionList}
			isSelected={isSelected}
			setIsSelected={setIsSelected}
			containerHeight={containerHeight}
		/>
	));

	// AI 실행
	useEffect(() => {
		runAIModel(itemInImage, itemToRecommend, base64Image);
	}, [itemInImage, itemToRecommend, base64Image]);

	// 배경 무늬 색상 컨트롤
	useEffect(() => {
		if (itemColor) {
			const shouldUseWhiteColor = hexColor => {
				const r = parseInt(hexColor.substr(1, 2), 16);
				const g = parseInt(hexColor.substr(3, 2), 16);
				const b = parseInt(hexColor.substr(5, 2), 16);
				const yiq = (r * 299 + g * 587 + b * 114) / 1000;
				return setBackground(yiq < 220);
			};
			shouldUseWhiteColor(itemColor);
		}
	}, [itemColor]);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ flex: 1, backgroundColor: itemColor }}>
				<BasicHeader
					titleIcon={'AI'}
					title={'AI 분석'}
					subTitle={'ai recs'}
					rightIcon={'info'}
					infoText={infotext}
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
					<View style={{ flex: 1, zIndex: -1 }}>
						<View
							style={styles.responseContainer}
							onLayout={handleLayout}>
							{aiCircles}

							<Background
								color={background ? '#ffffff' : COLOR.GRAY_3}
							/>
							<TouchableOpacity
								onPressIn={() => setIsButtonPressed(true)}
								onPressOut={() => setIsButtonPressed(false)}
								onPress={navigateObjectScreen}
								activeOpacity={1}
								style={{
									position: 'absolute',
									bottom: 14,
									right: 12,
									width: 185,
									height: 62,
									width: 70,
									height: 70,
									borderRadius: 64,
									backgroundColor: isButtonPressed
										? COLOR.PRIMARY
										: '#ffffff',
									justifyContent: 'center',
									alignItems: 'center',
									borderWidth: 2,
									borderColor: COLOR.GRAY_3,
								}}>
								<Icon
									name="hanger"
									size={30}
									color={
										isButtonPressed
											? COLOR.GRAY_1
											: COLOR.PRIMARY
									}
								/>
							</TouchableOpacity>
						</View>
						<CustomPopup message={popupMessage} />
					</View>
				)}
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	responseContainer: {
		flex: 1,
		position: 'relative',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
});

export default AiResponseScreen;
