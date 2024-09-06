import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Pressable,
	SafeAreaView,
	FlatList,
	useWindowDimensions,
	Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CustomText as Text } from '@components/common/CustomText';
import { COLOR } from '@styles/color';
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

	const offset = 0;
	const gap = 18;
	const pageWidth = width - (gap + offset);
	const [currentIndex, setCurrentIndex] = useState(0);
	const ref = useRef(null);
	const progress = useSharedValue(0);

	const handleGetCurrentIndex = useCallback(() => {
		'worklet';
		if (ref.current) {
			const index = ref.current.getCurrentIndex();
			runOnJS(setCurrentIndex)(index);
		}
	}, []);

	const onPressNext = useCallback(() => {
		'worklet';
		if (ref.current?.next) {
			ref.current.next();
		}
	}, []);

	const onPressPagination = useCallback(
		index => {
			'worklet';
			if (ref.current?.scrollTo) {
				ref.current.scrollTo({
					count: index - progress.value,
					animated: true,
				});
			}
		},
		[progress],
	);

	const [inputColorValue, setInputColorValue] = useState();
	const [selectedLabel, setSelectedLabel] = useState('색상 이름');
	const { isModalVisible, handleOpenModal, handleCloseModal } = useModal();

	const handlePressLogo = () => {};
	const handlePressLabel = label => setSelectedLabel(label);
	const handleSearch = () => {
		if (inputColorValue){
			handleCloseModal();
			navigation.navigate('ColorRecommendScreen', {
				mainColor: { hexVal: inputColorValue },
			});}
	};
	const handleSelectCamera = () => navigation.navigate('CameraScreen');
	const handleSelectAlbum = () => navigation.navigate('ImageScreen');
	const handleSelectAI = () => navigation.navigate('AiScreen');

	// splash로 뒤로가기 방지 및 앱종료 모달
	// useBackHandler();

	const renderItem = ({ item }) => {
		return (
			<Pressable
				style={{
					width: 280,
					height: 214,
					marginHorizontal: 'auto',
					backgroundColor: item.color,
					borderRadius: 24,
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<OutlinedText
					strokeColor={COLOR.WHITE}
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
							selectedLabel={selectedLabel}
							list={dummy_list}
							handleCloseModal={handleCloseModal}
							onPressLabel={handlePressLabel}
							onPressSearch={handleSearch}
							inputColorValue={inputColorValue}
							setInputColorValue={setInputColorValue}
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
				<View style={styles.carouselContainer}>
					<Carousel
						ref={ref}
						width={width}
						mode={'horizontal-stack'}
						modeConfig={{
							snapDirection: 'left',
							stackInterval: 18,
						}}
						data={dummy_trendColor}
						onSnapToItem={handleGetCurrentIndex}
						onProgressChange={progress}
						renderItem={renderItem}
					/>
					<Pagination.Custom
						progress={progress}
						data={dummy_trendColor}
						animValue={10}
						dotStyle={{
							backgroundColor: COLOR.PRIMARY + 50,
							borderRadius: 50,
						}}
						activeDotStyle={{
							width: 20,
							backgroundColor: COLOR.PRIMARY,
							overflow: 'hidden',
							borderRadius: 50,
						}}
						containerStyle={{ gap: 5, marginBottom: 10 }}
						onPress={onPressPagination}
						customReanimatedStyle={(progress, index, length) => {
							let val = Math.abs(progress - index);
							if (index === 0 && progress > length - 1) {
								val = Math.abs(progress - length);
							}

							return {
								transform: [
									{
										translateY: interpolate(
											val,
											[0, 1],
											[0, 0],
											Extrapolation.CLAMP,
										),
									},
								],
							};
						}}
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
	searchContainer: {
		width: 280,
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 4,
		borderWidth: 1,
		borderColor: COLOR.PRIMARY,
	},
	searchIconWrapper: {
		width: 48,
		height: 48,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: COLOR.GRAY_3,
		borderWidth: 1,
		borderRadius: 8
	},
	buttonContainer: {
		marginTop: 18,
		width: '100%',
		gap: 18,
		justifyContent: 'center',
		alignItems: 'center',
	},
	carouselContainer: {
		height: 264,
		marginTop: 20,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

const dummy_list = ['색상 이름', 'HEX', 'RGB', 'HSL', 'CMYK'];

const dummy_trendColor = [
	{
		color: '#CA848A',
		colorName: 'Peach Fuzz',
	},
	{
		color: '#FFBE98',
		colorName: 'Brandied Apricot',
	},
	{
		color: '#964F4C',
		colorName: 'Marsala',
	},
	{
		color: '#A78C7B',
		colorName: 'Almondine',
	},
	{
		color: '#D8C8BD',
		colorName: 'Almond peach',
	},
	{
		color: '#85677B',
		colorName: 'Grapeade',
	},
];

export default Home;
