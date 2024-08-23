import React, { useState, useCallback } from 'react';
import {
	View,
	StyleSheet,
	Button,
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
	const [color, setColor] = useState('#000000');
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
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
				Alert.alert('Error', response.error);
			} else if (response.assets && response.assets[0].uri) {
				const uri = response.assets[0].uri;
				console.log('Selected image URI:', uri);
				try {
					const base64Image = await RNFS.readFile(uri, 'base64');
					const dataUrl = `data:image/jpeg;base64,${base64Image}`;
					console.log('Converted Base64 Data URL:', dataUrl);
					setImageDataUrl(dataUrl);
				} catch (error) {
					console.error('Failed to convert image to Base64', error);
				}
			}
		} catch (error) {
			console.log('Error in selectImage:', error);
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
        }
        #canvas {
          border: 1px solid black;
        }
        #crosshair {
          position: absolute;
          width: 30px;
          height: 30px;
          border: 3px solid red;
          border-radius: 50%;
          box-shadow: 0 0 0 1px black;
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
          const maxHeight = window.innerHeight;
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
			<BasicHeader title="이미지" />
			<Button title="Select Image" onPress={selectImage} />
			{imageDataUrl && (
				<WebView
					source={{ html: getHtmlContent(imageDataUrl) }}
					onMessage={onMessage}
					style={styles.webview}
					onLoad={() =>
						console.log(
							'WebView loaded with imageDataUrl:',
							imageDataUrl,
						)
					}
					onError={error => console.error('WebView error:', error)}
				/>
			)}
			<View style={styles.colorBox}>
				<View
					style={[styles.colorIndicator, { backgroundColor: color }]}
				/>
				<Text style={styles.colorText}>{color}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	webview: {
		flex: 0.5,
	},
	colorBox: {
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#f0f0f0',
	},
	colorIndicator: {
		width: 30,
		height: 30,
		borderRadius: 15,
		marginRight: 10,
	},
	colorText: {
		fontSize: 16,
	},
});

export default ImageScreen;
