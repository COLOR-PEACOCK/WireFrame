import React, { useState, useCallback, useEffect } from 'react';
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Platform,
	PermissionsAndroid,
	Alert,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import BasicHeader from '@components/common/BasicHeader';
import { CustomText as Text } from '@components/common/CustomText';
import { COLOR } from '@styles/color';
import useColorName from '@hooks/useColorName';
import _ from 'lodash';
import useImageWebview from '@hooks/useImageWebview';

const ImageScreen = ({ navigation }) => {
	const [color, setColor] = useState('#000000');
	const [imageDataUrl, setImageDataUrl] = useState(null);
	const [colorName, setColorName] = useState('');
	const { getKorColorName, getEngColorNameLocal } = useColorName();
	const { getHtmlContent } = useImageWebview();
	useEffect(() => {
		selectImage();
	}, []);
	const requestStoragePermission = async () => {
		if (Platform.OS === 'android') {
			try {
				const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
					{
						title: 'Storage Permission',
						message:
							'App needs access to your storage to select images.',
						buttonNeutral: 'Ask Me Later',
						buttonNegative: 'Cancel',
						buttonPositive: 'OK',
					},
				);
				return granted === PermissionsAndroid.RESULTS.GRANTED;
			} catch (err) {
				console.error('Failed to request permission', err);
				return false;
			}
		}
		return true;
	};

	const selectImage = async () => {
		try {
			const response = await launchImageLibrary({ mediaType: 'photo' });
			if (response.didCancel && !imageDataUrl) {
				navigation.goBack();
				Alert.alert('알림', '사진을 선택 해주세요.');
			} else if (response.error) {
				Alert.alert('Error', response.error);
			} else if (response.assets && response.assets[0].uri) {
				const uri = response.assets[0].uri;
				try {
					const base64Image = await RNFS.readFile(uri, 'base64');
					const dataUrl = `data:image/jpeg;base64,${base64Image}`;
					setImageDataUrl(dataUrl);
				} catch (error) {
					Alert.alert('Error', 'Failed to convert image to Base64');
				}
			}
		} catch (error) {
			Alert.alert(
				'Error',
				`An unexpected error occurred while picking the image: ${error.message}`,
			);
		}
	};

	const onMessage = useCallback(
		_.throttle(event => {
			setColor(event.nativeEvent.data);
		}, 100),
		[],
	);

	const handleColorRecommend = () =>
		navigation.navigate('ColorRecommendScreen', {
			mainColor: { hexVal: color },
		});
	const handleAiRecommend = () =>
		navigation.navigate('ImageAiScreen', {
			mainColor: { hexVal: color },
		});

	useEffect(() => {
		setColorName({
			korName: getKorColorName(color),
			engName: getEngColorNameLocal(color),
		});
	}, [color]);
	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<BasicHeader
					titleIcon={'camera'}
					title={'이미지'}
					subTitle={'images'}
					rightIcon={'info'}
					infoText={'infomation text'}
				/>
			</View>
			<View style={styles.colorInfoBox}>
				<View
					style={[styles.colorIndicator, { backgroundColor: color }]}
				/>
				<View style={styles.colorDetails}>
					<View>
						<Text
							style={
								styles.korName
							}>{`≈${colorName.korName}`}</Text>
						<Text style={styles.engName}>{colorName.engName}</Text>
					</View>

					<Text style={styles.colorHex}>
						HEX: {color.toLocaleUpperCase()}
					</Text>
				</View>
			</View>
			<View style={styles.imageContainer}>
				{imageDataUrl ? (
					<WebView
						source={{ html: getHtmlContent(imageDataUrl) }}
						onMessage={onMessage}
						style={styles.webview}
					/>
				) : (
					<TouchableOpacity
						style={styles.placeholder}
						onPress={selectImage}>
						<Text style={styles.placeholderText}>이미지 선택</Text>
					</TouchableOpacity>
				)}
			</View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={styles.aiButton}
					onPress={handleAiRecommend}>
					<Text style={styles.aiButtonText}>AI 추천</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.recommendationButton}
					onPress={handleColorRecommend}>
					<Text style={styles.recommendationButtonText}>
						색상 추천
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	changeButton: {
		padding: 10,
		borderRadius: 8,
	},
	changeButtonText: {
		color: COLOR.PRIMARY,
		fontWeight: 'bold',
	},
	colorInfoBox: {
		paddingVertical: 18,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 16,
		backgroundColor: COLOR.GRAY_10,
		zIndex: -1,
	},
	colorIndicator: {
		width: 64,
		height: 64,
		borderRadius: 8,
	},
	colorDetails: {
		gap: 6,
		flex: 0.55,
	},
	korName: {
		color: COLOR.WHITE,
		fontSize: 14,
		fontWeight: '700',
	},
	engName: { color: COLOR.WHITE, fontSize: 12 },

	colorHex: {
		color: COLOR.GRAY_6,
		fontSize: 12,
		fontFamily: 'Pretendard-Light',
	},
	imageContainer: {
		flex: 3,
		width: '100%',
	},
	placeholder: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLOR.GRAY_2,
		borderRadius: 8,
	},
	placeholderText: {
		color: COLOR.GRAY_7,
		fontSize: 18,
	},
	webview: {
		width: '100%',
		height: '100%',
	},
	buttonContainer: {
		flexDirection: 'row',
		backgroundColor: COLOR.GRAY_10,
		height: 125,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 16,
	},
	aiButton: {
		backgroundColor: COLOR.GRAY_10,
		width: '40%',
		height: 78,
		marginVertical: 24,
		paddingVertical: 24,
		borderRadius: 8,
		borderColor: COLOR.PRIMARY,
		borderWidth: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	aiButtonText: {
		color: COLOR.WHITE,
		fontSize: 18,
		fontWeight: 'bold',
	},
	recommendationButton: {
		backgroundColor: COLOR.PRIMARY,
		width: '40%',
		height: 78,
		marginVertical: 24,
		paddingVertical: 24,
		borderRadius: 8,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	recommendationButtonText: {
		color: COLOR.WHITE,
		fontSize: 18,
		fontWeight: 'bold',
	},
});

export default ImageScreen;
