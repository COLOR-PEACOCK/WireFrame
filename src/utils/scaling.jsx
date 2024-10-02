import { Dimensions } from 'react-native';
/**
 * 디자인 기준 화면 사이즈 (가로 기준)
 */
const baseWidth = 412;
const baseHeight = 915;

const { width, height } = Dimensions.get('window');

/**
 * 모바일 화면 크기에 맞게 조절된 사이즈를 반환 해주는 함수
 * @param baseSize 디자인 기준 사이즈
 * @returns 화면 비율에 따라 크기 반환
 */
export const widthScale = baseSize => {
	const screenRatio = width / baseWidth;
	return baseSize * screenRatio;
};

export const heightScale = baseSize => {
	const screenRatio = height / baseHeight;
	return baseSize * screenRatio;
};
