import { Dimensions } from 'react-native';
/**
 * 디자인 기준 화면 사이즈 (가로 기준)
 */
export const BASE_WIDTH = 412;
export const BASE_HEIGHT = 915;

const { width, height } = Dimensions.get('window');

/**
 * 모바일 화면 크기에 맞게 조절된 사이즈를 반환 해주는 함수
 * @param baseSize 디자인 기준 사이즈
 * @returns 화면 비율에 따라 크기 반환
 */
export const widthScale = baseSize => {
	const screenRatio = width / BASE_WIDTH;
	return baseSize * screenRatio;
};

export const heightScale = baseSize => {
	const screenRatio = height / BASE_HEIGHT;
	return baseSize * screenRatio;
};
