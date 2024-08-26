import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Pressable,
	SafeAreaView,
	FlatList,
	useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CustomText as Text } from '@components/common/CustomText';
import { COLOR } from '@styles/color';
import { PressButton, OutlinedText, Indicator, Dropdown } from '@components/Home';

const Home = ({ navigation }) => {
	const { width } = useWindowDimensions();
	const offset = 36;
	const gap = 18;
	const pageWidth = width - (gap + offset) * 2;
	const [currentIndex, setCurrentIndex] = useState(0);
	const [selectedLabel, setSelectedLabel] = useState('색이름');
	const handleLabelCilck = (label) => setSelectedLabel(label);

	const [isSearchVisible, setIsSearchVisible] = useState(false);

	const handleScroll = e => {
		const currentIndex = Math.round(
			e.nativeEvent.contentOffset.x / (pageWidth + gap),
		);
		setCurrentIndex(currentIndex);
	};
	const handlePressLogo = () => setIsSearchVisible(false);
	const handleSearch = () => setIsSearchVisible(true);
	const handleSelectCamera = () => navigation.navigate('CameraPage');
	const handleSelectAlbum = () => navigation.navigate('ImageScreen');
	const handleSelectAI = () => navigation.navigate('AiScreen');

	const renderItem = ({ item }) => {
		return (
			<Pressable
				style={{
					width: pageWidth,
					height: 214,
					marginHorizontal: gap / 2,
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
						{/* 로고, 폰트 바꾸기 */}
						<Icon name={'menu'} size={48} onPress={handlePressLogo} />
						{!isSearchVisible ? (
							<Text style={styles.title}>COLOR PEACOCK</Text>
						) : (
							<Dropdown
								list={dummy_list}
								onLabelClickHandler={handleLabelCilck}
								layoutStyle={{
									width: 275,
									backgroundColor: COLOR.WHITE,
								}}
								selectedLabel={selectedLabel}
							/>
						)}
					</View>
					<TouchableOpacity
						style={styles.searchWrapper}
						onPress={handleSearch}>
						<Icon name={'search'} size={48} />
					</TouchableOpacity>
				</View>
				<View style={styles.buttonContainer}>
					<PressButton
						iconName={'camera'}
						onPress={handleSelectCamera}
						text={'SELECT TO CAMERA'}
					/>
					<PressButton
						iconName={'image-search'}
						onPress={handleSelectAlbum}
						text={'SELECT TO ALBUM'}
					/>
					<PressButton
						iconName={'motion-photos-auto'}
						onPress={handleSelectAI}
						text={'SELECT TO AI'}
					/>
				</View>
				<View style={styles.carouselContainer}>
					{/* carousel 라이브러리 찾아보기 */}
					<FlatList
						automaticallyAdjustContentInsets={false}
						contentContainerStyle={{
							paddingHorizontal: offset + gap / 2,
						}}
						data={dummy_trendColor}
						decelerationRate={2}
						horizontal
						keyExtractor={item => `page_${item.color}`}
						onScroll={handleScroll}
						pagingEnabled
						renderItem={renderItem}
						snapToInterval={pageWidth + gap}
						snapToAlignment="start"
						showsHorizontalScrollIndicator={false}
					/>
					<Indicator
						length={dummy_trendColor.length}
						currentIndex={currentIndex}
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
		paddingHorizontal: 18,
		height: 84,
		elevation: 5,
	},
	title: {
		fontSize: 24,
		fontFamily: 'CookieRun-Bold',
		color: COLOR.PRIMARY,
	},
	searchWrapper: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
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

const dummy_list = ['색이름', 'HEX', 'RGB', 'CMYK', 'HSL'];

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
