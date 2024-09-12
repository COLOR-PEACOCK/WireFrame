import React, { useEffect, useState } from 'react';
import {
	Camera,
	runAtTargetFps,
	useCameraDevice,
	useFrameProcessor,
} from 'react-native-vision-camera';
import { Worklets } from 'react-native-worklets-core';
import { useResizePlugin } from 'vision-camera-resize-plugin';
import useColorName from '@hooks/useColorName';

const CameraRender = ({ extColor, cameraType, zoomLevel, isActive }) => {
	const [rgbColor, setRgbColor] = useState({ r: 0, g: 0, b: 0 });
	const { getKorColorName, getEngColorNameLocal , getColorName} = useColorName();
	const device = useCameraDevice(cameraType);
	const { resize } = useResizePlugin();
	const resizeWidth = 640
	const resizeHeight = 480
	// 추출 색 rgb
	const updateColorJS = Worklets.createRunOnJS((r, g, b) => {
		setRgbColor({ r, g, b });
	});

	// rgb 값 헥스코드 변환 함수
	const rgbToHex = (r, g, b) => {
		return ((1 << 24) + (r << 16) + (g << 8) + b)
			.toString(16)
			.slice(1)
			.toUpperCase();
	};

	// 색상 업데이트
	useEffect(() => {
		const { r, g, b } = rgbColor;
		const bgColor = `rgb(${r}, ${g}, ${b})`;
		const hexColor = rgbToHex(r, g, b);
		const {korean_name, name} = getColorName(hexColor);
		extColor({
			bgColor,
			hexColor,
			engName: name,
			korName: korean_name,
		});
	}, [rgbColor]);

	//실시간 프레임 처리
	const frameProcessor = useFrameProcessor(frame => {
		'worklet';
		runAtTargetFps(4, () => {
			'worklet';
			if (frame.pixelFormat === 'yuv') {
				const resized = resize(frame, {
					scale: {
						width: resizeWidth,
						height: resizeHeight,
					},
					pixelFormat: 'rgb',
					dataType: 'uint8',
				});
				// RGB 값 추출
				const index =
					((resizeHeight / 2) * resizeWidth + resizeWidth / 2) * 3;
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
			isActive={isActive}
			frameProcessor={frameProcessor}
			zoom={zoomLevel}
		/>
	);
};

export default CameraRender;
