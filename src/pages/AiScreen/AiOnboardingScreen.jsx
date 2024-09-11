import React, { useRef, useState } from 'react';
import {
	SafeAreaView,
	View,
	TouchableOpacity,
	StyleSheet,
	Image,
	Text,
} from 'react-native';
import Swiper from 'react-native-swiper';
import BasicHeader from '@components/common/BasicHeader';
import { COLOR } from '@styles/color';
import OnboardingIcon from '@components/AiRecommend/OnboardingIcon';

const AiOnboardingScreen = ({ navigation }) => {
	const swiperRef = useRef(null);
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleSkip = () => {
		navigation.navigate('AiScreen');
	};

	const handleNext = () => {
		if (currentIndex < 2) {
			swiperRef.current.scrollBy(1);
		} else {
			navigation.navigate('AiScreen');
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<BasicHeader
				titleIcon={'AI'}
				title={'Ai 추천'}
				engTitle={'ai recs'}
				rightIcon={'Skip'}
				onPressRight={handleSkip}
			/>
			<Swiper
				ref={swiperRef}
				loop={false}
				onIndexChanged={index => setCurrentIndex(index)}
				dot={<View style={styles.dot} />}
				activeDot={<View style={styles.activeDot} />}>
				<View style={styles.slide}>
					<Text style={styles.title}>내가 고른 아이템 색상과</Text>

					<View style={styles.highlightContainer}>
						<Image
							source={require('@images/highlight1.png')}
							style={styles.highlightImage}
							resizeMode="contain"
						/>
						<Text style={styles.titleWithBackground}>
							어울리는 색상을 추천해 드려요!
						</Text>
					</View>

					<Text style={styles.subtitle}>순식간에 색상 조합 끝</Text>
					<Image
						source={require('@images/onboarding1.png')}
						style={[styles.backgroundImage, { top: 1 }]}
						resizeMode="contain"
					/>
				</View>

				<View style={styles.slide}>
					<Text style={styles.title}>첫 번째</Text>
					<Text style={styles.title}>추천을 바라는 아이템이</Text>
					<View style={styles.highlightContainer}>
						<Image
							source={require('@images/highlight1.png')}
							style={styles.highlightImage}
							resizeMode="contain"
						/>
						<Text style={styles.titleWithBackground}>
							포함된 사진을 불러옵니다.
						</Text>
					</View>
					<Text style={styles.subtitle}>
						해당 아이템의 정보로 AI 추천 분석
					</Text>
					<Image
						source={require('@images/onboarding2.png')}
						style={[styles.backgroundImage, { top: -16 }]}
						resizeMode="contain"
					/>
				</View>

				<View style={styles.slide}>
					<Text style={styles.title}>두 번째</Text>
					<Text style={styles.title}>
						사진 속 아이템과 추천 아이템을
					</Text>

					<View style={styles.highlightContainer}>
						<Image
							source={require('@images/highlight1.png')}
							style={styles.highlightImage}
							resizeMode="contain"
						/>
						<Text style={styles.titleWithBackground}>
							아래와 같이 빠짐없이 작성합니다!
						</Text>
					</View>

					<Text style={styles.subtitle}>
						바지에 어울리는 신발 색상이 궁금하다면?
					</Text>
					<Image
						source={require('@images/onboarding3.png')}
						style={[styles.backgroundImage, { top: -16 }]}
						resizeMode="contain"
					/>
				</View>
			</Swiper>
			<TouchableOpacity style={styles.nextButton} onPress={handleNext}>
				<OnboardingIcon color={COLOR.GRAY_1} />
				<Text style={styles.nextButtonText}>
					{currentIndex === 2
						? '지금 바로 이동하기'
						: '다음으로 이동하기'}
				</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	slide: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 18,
	},
	backgroundImage: {
		width: 412,
		height: 426,
	},
	title: {
		fontSize: 24,
		color: COLOR.GRAY_9,
		opacity: 1,
		fontFamily: 'Pretendard-Bold',
	},
	highlightContainer: {
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
	highlightImage: {
		position: 'absolute',
		width: 320,
		height: 34,
		top: 0,
		opacity: 1,
	},
	titleWithBackground: {
		fontSize: 24,
		color: COLOR.GRAY_9,
		fontFamily: 'Pretendard-Bold',
		zIndex: 1,
	},
	subtitle: {
		fontSize: 16,
		color: COLOR.GRAY_6,
		marginBottom: 10,
		opacity: 1,
		fontFamily: 'Pretendard-Regular',
	},
	dot: {
		backgroundColor: 'rgba(135, 62, 241, 0.5)',
		width: 8,
		height: 8,
		borderRadius: 4,
		margin: 3,
	},
	activeDot: {
		backgroundColor: COLOR.PRIMARY,
		width: 20,
		height: 8,
		borderRadius: 25,
		margin: 3,
	},
	nextButton: {
		backgroundColor: COLOR.PRIMARY,
		height: 98,
		paddingVertical: 15,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 6,
	},
	nextButtonText: {
		color: COLOR.GRAY_1,
		fontSize: 18,
		fontFamily: 'Pretendard-Bold',
	},
});

export default AiOnboardingScreen;
