import React, { useState, useCallback } from 'react';
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

const ImageScreen = () => {
	const [color, setColor] = useState('#A4B5C9');
	const [imageDataUrl, setImageDataUrl] = useState(null);

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
			if (response.didCancel) {
				Alert.alert('Notification', 'Image selection canceled.');
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

	const onMessage = useCallback(event => {
		setColor(event.nativeEvent.data);
	}, []);

	const getHtmlContent = imgSrc => `
  <html>
    <head>
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0;
          padding: 0;
          overflow: hidden;
          background-color: #333;
        }
        #canvas {
          width: 100%;
          height: auto;
          max-height: 100%;
        }
        #crosshair {
          position: absolute;
          width: 30px;
          height: 30px;
          border: 3px solid white;
          border-radius: 50%;
          cursor: pointer;
          transform: translate(-50%, -50%);
        }
      </style>
    </head>
    <body>
      <canvas id="canvas"></canvas>
      <div id="crosshair"></div>
      <script>
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = "${imgSrc}";

        img.onload = function() {
          const canvas = document.getElementById('canvas');
          const ctx = canvas.getContext('2d');
          const maxWidth = window.innerWidth;
          const maxHeight = window.innerHeight * 0.6;
          const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
          canvas.width = img.width * ratio;
          canvas.height = img.height * ratio;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          const crosshair = document.getElementById('crosshair');
          crosshair.style.top = '50%';
          crosshair.style.left = '50%';

          let isDragging = false;
          let startX, startY;

          function startDragging(e) {
            isDragging = true;
            startX = e.touches[0].clientX - crosshair.offsetLeft;
            startY = e.touches[0].clientY - crosshair.offsetTop;
          }

          function drag(e) {
            if (isDragging) {
              e.preventDefault();
              const clientX = e.touches[0].clientX;
              const clientY = e.touches[0].clientY;
              const x = clientX - startX;
              const y = clientY - startY;
              crosshair.style.left = x + 'px';
              crosshair.style.top = y + 'px';
              updateColor(x, y);
            }
          }

          function stopDragging() {
            isDragging = false;
          }

          crosshair.addEventListener('touchstart', startDragging);
          crosshair.addEventListener('touchmove', drag);
          crosshair.addEventListener('touchend', stopDragging);

          function updateColor(x, y) {
            const rect = canvas.getBoundingClientRect();
            const canvasX = Math.floor((x - rect.left) * (img.width / canvas.width));
            const canvasY = Math.floor((y - rect.top) * (img.height / canvas.height));

            const pixel = ctx.getImageData(canvasX, canvasY, 1, 1).data;
            const color = '#' + ((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1);
            window.ReactNativeWebView.postMessage(color);
          }
        }
      </script>
    </body>
  </html>
`;

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<BasicHeader title="이미지" />
				<TouchableOpacity
					style={styles.selectImageBox}
					onPress={selectImage}>
					<Text>변경</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.colorInfoBox}>
				<View
					style={[styles.colorIndicator, { backgroundColor: color }]}
				/>
				<View style={styles.colorDetails}>
					<Text style={styles.colorName}>연한파랑</Text>
					<Text style={styles.colorHex}>{color}</Text>
					<Text style={styles.colorHsl}>hsl: 18.5, 5.2%, 48.8%</Text>
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
			<TouchableOpacity style={styles.recommendationButton}>
				<Text style={styles.recommendationButtonText}>색상 추천</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	headerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingRight: 40,
	},
	changeButton: {
		backgroundColor: '#f0f0f0',
		padding: 10,
		borderRadius: 8,
	},
	changeButtonText: {
		color: '#6200EA',
		fontWeight: 'bold',
	},
	colorInfoBox: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		backgroundColor: '#333',
	},
	colorIndicator: {
		width: 40,
		height: 40,
		borderRadius: 4,
		backgroundColor: '#A4B5C9',
		marginRight: 10,
	},
	colorDetails: {
		flex: 1,
	},
	colorName: {
		color: '#fff',
		fontWeight: 'bold',
	},
	colorHex: {
		color: '#ccc',
	},
	colorHsl: {
		color: '#ccc',
	},
	imageContainer: {
		flex: 3,
		width: '100%',
		height: '50%',
	},
	placeholder: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f0f0f0',
		borderRadius: 8,
	},
	placeholderText: {
		color: '#888',
		fontSize: 18,
	},
	webview: {
		width: '100%',
		height: '100%',
	},
	recommendationButton: {
		backgroundColor: '#6200EA',
		padding: 15,
		borderRadius: 8,
		alignItems: 'center',
		margin: 20,
	},
	recommendationButtonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
	},
});

export default ImageScreen;
