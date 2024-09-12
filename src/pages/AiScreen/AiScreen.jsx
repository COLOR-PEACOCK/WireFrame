import React, { useState, useEffect } from 'react';
import {
	View,
	StyleSheet,
	Alert,
	TextInput,
	Image,
	TouchableOpacity,
	KeyboardAvoidingView,
	SafeAreaView,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import BasicHeader from '@components/common/BasicHeader';
import { CustomText as Text } from '@components/common/CustomText';
import { COLOR } from '@styles/color';
import RunAi from '@icons/runAiIcon.svg';

const AiScreen = ({ navigation }) => {
	const [imageUri, setImageUri] = useState(null);
	const [itemInImage, setItemInImage] = useState('');
	const [itemToRecommend, setItemToRecommend] = useState('');

	const selectImage = async () => {
		try {
			const response = await launchImageLibrary({ mediaType: 'photo' });
			if (response.didCancel) {
				console.log('User cancelled image picker');
				Alert.alert(
					'Image selection canceled',
					'No image was selected.',
				);
				navigation.goBack();
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
				Alert.alert('Error', response.error);
			} else if (response.assets && response.assets[0].uri) {
				const uri = response.assets[0].uri;
				setImageUri(uri);
			}
		} catch (error) {
			console.log('Error in selectImage:', error);
			Alert.alert(
				'Error',
				`An unexpected error occurred while picking the image: ${error.message}`,
			);
		}
	};

	useEffect(() => {
		selectImage();
	}, []);

	const canRunAIAnalysis = () => {
		return imageUri && itemInImage && itemToRecommend;
	};

	const navigateToAiResponseScreen = async () => {
		if (canRunAIAnalysis()) {
			const base64Image = await RNFS.readFile(
				imageUri.replace('file://', ''),
				'base64',
			);
			navigation.navigate('AiResponseScreen', {
				itemInImage,
				itemToRecommend,
				base64Image,
			});
		}
	};

	return (
		<KeyboardAvoidingView style={styles.container} behavior="padding">
			<BasicHeader
				titleIcon={'AI'}
				title={'AI 추천'}
				subTitle={'ai recs'}
				rightIcon={'info'}
				onPressRight={() => navigation.goBack()}
			/>
			<View style={styles.imageContainer}>
				{imageUri ? (
					<Image source={{ uri: imageUri }} style={styles.image} />
				) : (
					<View style={styles.placeholder}>
						<Text style={styles.placeholderText}>
							이미지를 선택하세요
						</Text>
					</View>
				)}
			</View>

			<View style={styles.inputContainer}>
				<View
					style={[
						styles.inputRow,
						{
							borderBottomWidth: 1,
							borderBottomColor: COLOR.GRAY_3,
						},
					]}>
					<View style={styles.inputLabelContainer}>
						<View style={styles.inputLabelAlign}>
							<Text style={styles.inputLabel_eng}>
								standard item
							</Text>
							<Text style={styles.inputLabel}>
								기준 잡을 아이템
							</Text>
						</View>
					</View>

					<TextInput
						style={styles.input}
						value={itemInImage}
						onChangeText={setItemInImage}
						placeholder="ex) 바지 또는 베이지 바지 등등···"
						placeholderTextColor={COLOR.GRAY_6}
					/>
				</View>

				<View style={styles.inputRow}>
					<View style={styles.inputLabelContainer}>
						<View style={styles.inputLabelAlign}>
							<Text style={styles.inputLabel_eng}>
								recommended Item
							</Text>
							<Text style={styles.inputLabel}>
								추천 받을 아이템
							</Text>
						</View>
					</View>

					<TextInput
						style={styles.input}
						value={itemToRecommend}
						onChangeText={setItemToRecommend}
						placeholder="ex) 신발 또는 검정색 신발 등등···"
						placeholderTextColor={COLOR.GRAY_6}
					/>
				</View>

				<TouchableOpacity
					style={[
						styles.analysisButton,
						{
							backgroundColor: canRunAIAnalysis()
								? COLOR.PRIMARY
								: COLOR.GRAY_6,
						},
					]}
					disabled={!canRunAIAnalysis()}
					onPress={navigateToAiResponseScreen}>
					<RunAi />
					<Text style={styles.analysisButtonText}>바로 분석하기</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000000',
	},
	imageContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain',
		zIndex: -1,
	},
	placeholder: {
		width: '100%',
		height: '100%',
		backgroundColor: '#f0f0f0',
		justifyContent: 'center',
		alignItems: 'center',
	},
	placeholderText: {
		color: '#888',
		fontSize: 16,
	},
	inputContainer: {
		backgroundColor: '#fff',
	},
	inputRow: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 56,
	},
	inputLabelContainer: {
		justifyContent: 'center',
		width: 154,
		height: '100%',
        paddingLeft: 12,
		borderRightWidth: 1,
		borderRightColor: COLOR.GRAY_3,
	},
	inputLabelAlign: {
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
	inputLabel_eng: {
		fontSize: 12,
		fontFamily: 'Pretendard-Regular',
		color: COLOR.GRAY_6,
	},
	inputLabel: {
		fontSize: 17,
		fontFamily: 'Pretendard-Bold',
		color: COLOR.PRIMARY,
	},
	input: {
		flex: 1,
		width: '100%',
		height: '100%',
		paddingHorizontal: 12,
		color: COLOR.GRAY_10,
		backgroundColor: '#F3F7F8',
		placeholderTextColor: '#ccc',
	},
	analysisButton: {
		padding: 15,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: 80,
		gap: 6,
	},
	analysisButtonText: {
		color: COLOR.GRAY_3,
		fontWeight: 'bold',
	},
});

export default AiScreen;
