import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { COLOR } from '@styles/color';

// 로딩중 텍스트
const LoadingText = () => {
	const [loadingText, setLoadingText] = useState('AI 분석중');

	useEffect(() => {
		const loadingStates = [
			'AI 분석중',
			'AI 분석중.',
			'AI 분석중..',
			'AI 분석중...',
		];
		let index = 0;

		const interval = setInterval(() => {
			index = (index + 1) % loadingStates.length;
			setLoadingText(loadingStates[index]);
		}, 500); // 500ms마다 텍스트 변경
	}, []);

	return (
		<View>
			<Text
				style={{
					fontFamily: 'Pretendard-Bold',
					color: COLOR.GRAY_10,
					fontSize: 16,
				}}>
				{loadingText}
			</Text>
		</View>
	);
};

export default LoadingText;
