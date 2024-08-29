import React from 'react';
import {
	Camera,
	runAtTargetFps,
	useCameraDevice,
	useFrameProcessor,
} from 'react-native-vision-camera';
import { Worklets } from 'react-native-worklets-core';
import { useResizePlugin } from 'vision-camera-resize-plugin';

const CameraRender = ({ extColor, cameraType, zoomLevel }) => {
	const device = useCameraDevice(cameraType);
	const { resize } = useResizePlugin();

	// 색 추출 + 헥스 코드 변환
	const updateColorJS = Worklets.createRunOnJS((r, g, b) => {
		const hex = rgbToHex(r, g, b);
		extColor({ bgColor: `rgb(${r}, ${g}, ${b})`, hexColor: hex });
	});

	// rgb 값 헥스코드 변환 함수
	const rgbToHex = (r, g, b) => {
		return (
			'#' +
			((1 << 24) + (r << 16) + (g << 8) + b)
				.toString(16)
				.slice(1)
				.toUpperCase()
		);
	};
	//실시간 프레임 처리
	const frameProcessor = useFrameProcessor(frame => {
		'worklet';
		runAtTargetFps(10, () => {
			'worklet';
			if (frame.pixelFormat === 'yuv') {
				const resized = resize(frame, {
					scale: {
						width: 640,
						height: 480,
					},
					pixelFormat: 'rgb',
					dataType: 'uint8',
				});
				// RGB 값 추출
				const index =
					((frame.height / 2) * frame.width + frame.width / 2) * 3;
				const red = resized[index];
				const green = resized[index + 1];
				const blue = resized[index + 2];
				updateColorJS(red, green, blue);
			}
		});
	}, []);

	return (
		<Camera
			style={{ width: '100%', height: '100%' }}
			resizeMode="cover"
			pixelFormat="yuv"
			device={device}
			isActive={true}
			frameProcessor={frameProcessor}
			zoom={zoomLevel}
		/>
	);
};

export default CameraRender;
