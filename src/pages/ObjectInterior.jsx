import { useCallback, useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaView, useWindowDimensions } from 'react-native';
import BasicHeader from '@components/common/BasicHeader';
import { COLOR } from '@styles/color';
import { runOnJS, useSharedValue } from 'react-native-reanimated';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';

const ObjectInterior = ({ route }) => {
	const colors = route.params;
	const [selectedColor, setSelectedColor] = useState(colors[0]);
	const { width } = useWindowDimensions();
	const pageWidth = width * 0.7;
	const baseUrl = 'https://www.color-name.com/interior?h=';
	const interiorData = [
		['drawing-room', 'bedroom'],
		['kitchen', 'living-room'],
	];
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
	const renderItem = ({ item }) => {
		{
			console.log(item);
		}
		return (
			<View style={{ gap: 18}}>
				<View>
                <Image
					width={width}
					height={width * 0.67}
					source={{
						uri: `https://www.color-name.com/interior?h=
                        ${selectedColor.replace('#', '')}&w=${item[0]}`,
					}}
					resizeMode={'contain'}
				/>
                </View>
				<Image
					width={width}
					height={width * 0.67}
					source={{
						uri: `https://www.color-name.com/interior?h=
                        ${selectedColor.replace('#', '')}&w=${item[1]}`,
					}}
					resizeMode={'contain'}
				/>
			</View>
		);
	};

	// <Image width={300} height={300}
	// 		source={{uri: `https://www.color-name.com/interior?h=${item.color}&w=drawing-room`}} />
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<BasicHeader title={'인테리어'} subTitle={'interior'} />
			<View style={styles.carouselContainer}>
            <Pagination.Basic
					progress={progress}
					data={interiorData}
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
                <Carousel
					ref={caroucelRef}
					width={width}
					height={width* 2}
					data={interiorData}
					onSnapToItem={handleGetCurrentIndex}
					onProgressChange={progress}
					renderItem={renderItem}
				/>
				
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	carouselContainer: {
		width: 'auto',
		height: 'auto',
		marginTop: 38,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 8,
	},
});
export default ObjectInterior;
