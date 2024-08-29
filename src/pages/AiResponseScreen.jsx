import React, { useState, useEffect } from 'react';
import {
	SafeAreaView,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
	ActivityIndicator,
} from 'react-native';
import { CustomText as Text } from '@components/common/CustomText';
import BasicHeader from '@components/common/BasicHeader';
import { COLOR } from '@styles/color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AiResponseScreen = ({ route, navigation }) => {
	const { responseText } = route.params;
	const [isButtonPressed, setIsButtonPressed] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [colors, setColors] = useState([]);
	const [responseExplanation, setResponseExplanation] = useState('');

	useEffect(() => {
		// 응답 처리를 비동기적으로 수행
		const processResponse = async () => {
			try {
				const responseJson = JSON.parse(responseText);

				// AI 응답의 유효성을 검사
				if (
					responseJson &&
					responseJson.properties &&
					responseJson.properties.recommeneded_color_explain &&
					responseJson.properties.recommeneded_color_list
				) {
					setResponseExplanation(
						responseJson.properties.recommeneded_color_explain,
					);
					setColors(responseJson.properties.recommeneded_color_list);
				} else {
					console.error('Invalid responseText format:', responseJson);
					setResponseExplanation('AI 응답이 올바르지 않습니다.');
				}
			} catch (error) {
				console.error('Error parsing responseText:', error);
				setResponseExplanation(
					'AI 응답을 처리하는 중 오류가 발생했습니다.',
				);
			} finally {
				setIsLoading(false); // 로딩 완료
			}
		};

		processResponse();
	}, [responseText]);

	const handleColorChange = () => {
		setIsButtonPressed(true);
		setTimeout(() => {
			setIsButtonPressed(false);
		}, 100);
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<BasicHeader title={'Ai 분석'} />
			<View style={styles.responseContainer}>
				{isLoading ? (
					<ActivityIndicator size="large" color={COLOR.PRIMARY} />
				) : (
					<>
						<ScrollView style={styles.responseTextContainer}>
							<Text style={styles.responseText}>
								{responseExplanation}
							</Text>
						</ScrollView>
						<View style={styles.paletteButtonContainer}>
							<View style={styles.paletteContainer}>
								{colors.length > 0 ? (
									colors.map((color, index) => (
										<View
											key={index}
											style={[
												styles.colorCircle,
												{ backgroundColor: color },
											]}
										/>
									))
								) : (
									<Text>추천 색상이 없습니다.</Text>
								)}
							</View>
							<TouchableOpacity
								style={[
									styles.nextButton,
									{
										borderColor: isButtonPressed
											? COLOR.GRAY_1
											: COLOR.PRIMARY,
										backgroundColor: isButtonPressed
											? COLOR.PRIMARY
											: COLOR.GRAY_1,
									},
								]}
								onPress={handleColorChange}>
								<Icon
									name="hanger"
									size={24}
									color={
										isButtonPressed
											? COLOR.GRAY_1
											: COLOR.PRIMARY
									}
								/>
							</TouchableOpacity>
						</View>
					</>
				)}
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	responseContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center', // 중앙에 배치
		backgroundColor: COLOR.PRIMARY,
		padding: 20,
	},
	responseTextContainer: {
		marginVertical: 20,
		padding: 20,
		backgroundColor: COLOR.GRAY_1,
		borderRadius: 10,
		width: '100%',
	},
	responseText: {
		fontSize: 20,
		color: COLOR.GRAY_8,
	},
	paletteButtonContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 40,
	},
	paletteContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	colorCircle: {
		width: 50,
		height: 50,
		borderRadius: 25,
		marginHorizontal: 4,
	},
	nextButton: {
		width: 50,
		height: 50,
		borderRadius: 8,
		borderWidth: 2,
		marginLeft: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default AiResponseScreen;
