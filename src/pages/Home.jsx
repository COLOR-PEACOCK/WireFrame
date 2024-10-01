import React, { useCallback, useRef } from 'react';
import {
	StyleSheet,
	View,
	Pressable,
	SafeAreaView,
	useWindowDimensions,
	Image,
	ScrollView,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
import convert from 'color-convert';

import { COLOR } from '@styles/color';
import { CustomText as Text } from '@components/common';
import { PressButton, OutlinedText, SearchModal } from '@components/Home';
import { useModal } from '@hooks';
import { useBackHandler, usePressButtonState } from '@hooks/home';
import { SearchSVG } from '@icons';
import { widthScale } from '@utils/scaling';

const logoIcon = require('@icons/logo.png');

const Home = ({ navigation }) => {
	const { width } = useWindowDimensions();
	const pageWidth = width * 0.7;
	const caroucelRef = useRef(null);
	const progress = useSharedValue(0);
	const { contentColor, buttonColor, handleTouchStart, handleTouchEnd } =
		usePressButtonState();

	const onPressPagination = useCallback(
		index => {
			'worklet';
			if (caroucelRef.current?.scrollTo) {
				caroucelRef.current.scrollTo({
					count: index - progress.value,
					animated: true,
				});
			}
		},
		[progress],
	);

	const { isModalVisible, handleOpenModal, handleCloseModal } = useModal();

	const handleSearch = hexValue => {
		if (hexValue) {
			handleCloseModal();
			navigation.navigate('ColorRecommendScreen', {
				mainColor: { hexVal: hexValue },
			});
		}
	};
	const handleSelectCamera = () => navigation.navigate('CameraScreen');
	const handleSelectAlbum = () => navigation.navigate('ImageScreen');
	const handleSelectAI = () => navigation.navigate('AiOnboardingScreen');

	// splash로 뒤로가기 방지 및 앱종료 모달
	useBackHandler();

	const renderItem = ({ item }) => {
		return (
			<Pressable
				onPress={() => {
					navigation.navigate('ColorRecommendScreen', {
						mainColor: { hexVal: item.color },
					});
				}}
				style={[
					styles.card,
					{ width: pageWidth, backgroundColor: item.color },
				]}>
				<OutlinedText
					strokeColor={
						convert.hex.hsl(item.color.replace('#', ''))[2] > 80
							? COLOR.GRAY_10
							: COLOR.GRAY_2
					}
					textColor={item.color}
					fontSize={38}
					text={item.colorName}
				/>
			</Pressable>
		);
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
				<View style={styles.container}>
					<View style={styles.header}>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								gap: 8,
							}}>
							<Pressable style={{ width: 48, height: 48 }}>
								<Image
									style={{ width: '100%', height: '100%' }}
									source={logoIcon}
								/>
							</Pressable>
							<Text style={styles.title}>COLOR PEACOCK</Text>
							<SearchModal
								visible={isModalVisible}
								handleCloseModal={handleCloseModal}
								onPressSearch={handleSearch}
							/>
						</View>
						<Pressable
							style={[
								styles.searchIconWrapper,
								{ backgroundColor: buttonColor },
							]}
							onPressIn={handleTouchStart}
							onPress={handleOpenModal}
							onPressOut={handleTouchEnd}>
							<SearchSVG color={contentColor} />
						</Pressable>
					</View>
					<ScrollView contentContainerStyle={{ alignItems: 'center'}}>
					<View style={styles.buttonContainer}>
						<PressButton
							iconName={'camera'}
							onPress={handleSelectCamera}
							engText={'SELECT FROM CAMERA'}
							text={'카메라로 색상 추천 받기'}
						/>
						<PressButton
							iconName={'image'}
							onPress={handleSelectAlbum}
							engText={'SELECT TO ALBUM'}
							text={'이미지로 색상 추천 받기'}
						/>
						<PressButton
							iconName={'AI'}
							onPress={handleSelectAI}
							engText={'SELECT TO AI'}
							text={'AI로 색상 추천 받기'}
						/>
					</View>

					<View style={styles.split}></View>

					<View style={styles.carouselContainer}>
						<View style={styles.section}>
							<Text style={styles.sectionKor}>
								올해의 즐겨찾는 색상
							</Text>
							<Text style={styles.sectionEng}>
								Trend color palette
							</Text>
						</View>
						<Carousel
							ref={caroucelRef}
							width={width}
							mode={'horizontal-stack'}
							modeConfig={{
								snapDirection: 'left',
								stackInterval: pageWidth + 4,
							}}
							data={dummy_trendColor}
							onProgressChange={progress}
							renderItem={renderItem}
						/>
					</View>
					<View style={styles.indicator}>
						<Pagination.Custom
							progress={progress}
							data={dummy_trendColor}
							dotStyle={styles.dotStyle}
							activeDotStyle={styles.activeDotStyle}
							containerStyle={{ gap: 6 }}
							onPress={onPressPagination}
						/>
					</View>
					</ScrollView>
				</View>
			
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
	},
	header: {
		width: '100%',
		height: 84,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: COLOR.WHITE,
		paddingHorizontal: 18,
		elevation: 5,
	},
	title: {
		fontSize: 20,
		fontFamily: 'CookieRun-Bold',
		letterSpacing: -1,
		color: COLOR.PRIMARY,
	},
	searchIconWrapper: {
		width: 48,
		height: 48,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: COLOR.GRAY_3,
		borderWidth: 1,
		borderRadius: 8,
	},
	split: {
		width: widthScale(376),
		height: 4,
		backgroundColor: COLOR.GRAY_1,
	},
	buttonContainer: {
		paddingVertical: 38,
		width: '100%',
		gap: 18,
		justifyContent: 'center',
		alignItems: 'center',
	},
	section: {
		flexDirection: 'row',
		marginBottom: 3,
	},
	sectionKor: {
		color: COLOR.GRAY_10,
		fontSize: 16,
		fontFamily: 'Pretendard-Bold',
		paddingLeft: 3,
	},
	sectionEng: {
		color: COLOR.GRAY_6,
		fontSize: 12,
		fontFamily: 'Pretendard-Midium',
		marginBottom: 1.5,
		marginLeft: 6,
		alignSelf: 'flex-end',
	},
	carouselContainer: {
		height: 300,
		marginTop: 30,
		marginLeft: 38,
		borderRadius: 5,
		justifyContent: 'center',
		gap: 8,
	},
	card: {
		height: 168,
		paddingHorizontal: 18,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
	indicator: { alignItems: 'center', justifyContent: 'center' },
	dotStyle: {
		width: 8,
		height: 8,
		backgroundColor: COLOR.PRIMARY + 50,
		borderRadius: 50,
		marginTop: -68,
	},
	activeDotStyle: {
		width: 20,
		backgroundColor: COLOR.PRIMARY,
		overflow: 'hidden',
		borderRadius: 50,
	},
});

const dummy_trendColor = [
	{
		color: '#EAACC6',
		colorName: 'Pink Macaroon',
	},
	{
		color: '#FFDAB9',
		colorName: 'Peach Puff',
	},
	{
		color: '#FFAA4A',
		colorName: 'Five Star',
	},
	{
		color: '#A2CFFE',
		colorName: 'Baby Blue',
	},
	{
		color: '#EDDCC8',
		colorName: 'Almond',
	},
	{
		color: '#816575',
		colorName: 'Opera',
	},
];

export default Home;
