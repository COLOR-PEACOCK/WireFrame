import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Pressable,
	SafeAreaView,
	FlatList,
	useWindowDimensions,
	Keyboard,
	Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CustomText as Text } from '@components/common/CustomText';
import { COLOR } from '@styles/color';
import {
	PressButton,
	OutlinedText,
	Indicator,
	Dropdown,
	SearchInputForm,
} from '@components/Home';
import useBackHandler from '@hooks/useBackHandler';
import SearchModal from '@components/Home/SearchModal';
import useModal from '@hooks/useModal';

const logoIcon = require('@icons/logo.png');

const Home = ({ navigation }) => {
	const { width } = useWindowDimensions();
	const offset = 36;
	const gap = 18;
	const pageWidth = width - (gap + offset) * 2;
	const [currentIndex, setCurrentIndex] = useState(0);

	const [selectedLabel, setSelectedLabel] = useState('색상 이름');
	const handleCilckDropdown = label => setSelectedLabel(label);

	const [isSearchVisible, setIsSearchVisible] = useState(false);
	const { isModalVisible, handleOpenModal, handleCloseModal } = useModal();
	const handleScroll = e => {
		const currentIndex = Math.round(
			e.nativeEvent.contentOffset.x / (pageWidth + gap),
		);
		setCurrentIndex(currentIndex);
	};
	const handlePressLogo = () => setIsSearchVisible(false);
	const handlePressLabel = (label) => setSelectedLabel(label) 
	const handleSearch = () => {};
	const handleSelectCamera = () => navigation.navigate('CameraPage');
	const handleSelectAlbum = () => navigation.navigate('ImageScreen');
	const handleSelectAI = () => navigation.navigate('AiScreen');

	// splash로 뒤로가기 방지 및 앱종료 모달
	// useBackHandler();

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
							/>
								{/* <View style={styles.searchContainer}>
									<Dropdown
										list={dummy_list}
										onClickDropdown={handleCilckDropdown}
										layoutStyle={{
											width: 90,
											height: 35,
											borderColor: COLOR.GRAY_6,
											borderRightWidth: 1,
											marginRight: 5,
										}}
										selectedLabel={selectedLabel}
									/>
									
								</View> */}
							
						</View>
						<TouchableOpacity
							style={styles.searchIconWrapper}
							onPress={handleOpenModal}>
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
