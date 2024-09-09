import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Pressable,
	SafeAreaView,
	useWindowDimensions,
	Image,
} from 'react-native';
import { CustomText as Text } from '@components/common/CustomText';
import { COLOR } from '@styles/color';
import tinycolor from 'tinycolor2';
import { PressButton, OutlinedText } from '@components/Home';
import SearchModal from '@components/Home/SearchModal';
import useModal from '@hooks/useModal';
import {
	runOnJS,
	useSharedValue,
	interpolate,
	Extrapolation,
} from 'react-native-reanimated';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
import { SearchSVG } from '@icons';
const logoIcon = require('@icons/logo.png');

const Home = ({ navigation }) => {
	const { width } = useWindowDimensions();
	const pageWidth = width * 0.7;
	const [currentIndex, setCurrentIndex] = useState(0);
	const caroucelRef = useRef(null);
	const progress = useSharedValue(0);

	const handleGetCurrentIndex = useCallback(() => {
		'worklet';
		if (caroucelRef.current) {
			const index = caroucelRef.current.getCurrentIndex();
			runOnJS(setCurrentIndex)(index);
		}
	}, []);

	const onPressNext = useCallback(() => {
		'worklet';
		if (caroucelRef.current?.next) {
			caroucelRef.current.next();
		}
	}, []);

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

	const handlePressLogo = () => {};
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
	const handleSelectAI = () => navigation.navigate('AiScreen');

	// splash로 뒤로가기 방지 및 앱종료 모달
	// useBackHandler();

	const renderItem = ({ item }) => {
		return (
			<Pressable
				onPress={() => {
					navigation.navigate('ColorRecommendScreen', {
						mainColor: { hexVal: item.color },
					});
				}}
				style={{
					width: pageWidth,
					height: 214,
					backgroundColor: item.color,
					borderRadius: 24,
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<OutlinedText
					strokeColor={
						tinycolor(item.color).isLight()
							? COLOR.GRAY_10
							: COLOR.GRAY_2
					}
					textColor={item.color}
					fontSize={50}
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
						<Pressable
							style={{ width: 48, height: 48 }}
							onPress={handlePressLogo}>
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
					<TouchableOpacity
						style={styles.searchIconWrapper}
						onPress={handleOpenModal}>
						<SearchSVG />
					</TouchableOpacity>
				</View>
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
				<View
					style={{
						flexDirection: 'row',
						marginBottom: 3,
					}}>
					<Text style={styles.sectionKor}>추천 색상</Text>
					<Text style={styles.sectionEng}>Trend Color Palette</Text>
				</View>
					<Carousel
						ref={caroucelRef}
						width={width}
						mode={'horizontal-stack'}
						modeConfig={{
							snapDirection: 'left',
							stackInterval: pageWidth + 8,
						}}
						data={dummy_trendColor}
						onSnapToItem={handleGetCurrentIndex}
						onProgressChange={progress}
						renderItem={renderItem}
					/>
					<Pagination.Basic
						progress={progress}
						data={dummy_trendColor}
						animValue={10}
						dotStyle={{
							width: 10,
							backgroundColor: COLOR.PRIMARY + 50,
							borderRadius: 50,
						}}
						activeDotStyle={{
							backgroundColor: COLOR.PRIMARY,
							overflow: 'hidden',
							borderRadius: 50,
						}}
						containerStyle={{ gap: 5, marginBottom: 10 }}
						onPress={onPressPagination}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	header: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: COLOR.WHITE,
		paddingHorizontal: '5%',
		height: 84,
		elevation: 5,
	},
	title: {
		fontSize: 24,
		fontFamily: 'CookieRun-Bold',
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
		width: '100%',
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
	sectionKor: {
		color: COLOR.GRAY_10,
		fontSize: 16,
		fontFamily: 'Pretendard-Midium',
	},
	sectionEng: {
		color: COLOR.GRAY_6,
		fontSize: 12,
		fontFamily: 'Pretendard-Midium',
		marginHorizontal: 6,
		alignSelf: 'flex-end',
	},
	carouselContainer: {
		height: 280,
		marginTop: 38,
		marginLeft: 38,
		borderRadius: 5,
		justifyContent: 'center',
		gap: 8,
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
