import convert from 'color-convert';

// 색상 조합 추천 계산 식
export function getComplementaryColor(hsl) {
	const complementaryHSL = [(hsl[0] + 180) % 360, hsl[1], hsl[2]];
	return `#${convert.hsl.hex(complementaryHSL)}`;
}

// 유사색 조합: 메인 컬러 포함 3가지
export function getAnalogousColors(hsl) {
	return [
		`#${convert.hsl.hex([(hsl[0] + 360 - 18) % 360, hsl[1], hsl[2]])}`,
		`#${convert.hsl.hex([(hsl[0] + 18) % 360, hsl[1], hsl[2]])}`,
	];
}

// 3색 조화: 메인 컬러 포함 3가지
export function getTriadicColors(hsl) {
	return [
		`#${convert.hsl.hex([(hsl[0] + 240) % 360, hsl[1], hsl[2]])}`,
		`#${convert.hsl.hex([(hsl[0] + 120) % 360, hsl[1], hsl[2]])}`,
	];
}

// 분할 보색: 메인 컬러 포함 3가지
export function getSplitComplementaryColors(hsl) {
	return [
		`#${convert.hsl.hex([(hsl[0] + 180 + 18) % 360, hsl[1], hsl[2]])}`,
		`#${convert.hsl.hex([(hsl[0] + 180 - 18) % 360, hsl[1], hsl[2]])}`,
	];
}

// 단색 조합: 메인 컬러 포함 3가지
export function getMonochromaticColors(hsl) {
	return [
		`#${convert.hsl.hex([hsl[0], hsl[1], Math.min(hsl[2] + 36, 100)])}`,
		`#${convert.hsl.hex([hsl[0], hsl[1], Math.min(hsl[2] + 18, 100)])}`,
		`#${convert.hsl.hex([hsl[0], hsl[1], Math.max(hsl[2] - 15, 0)])}`,
	];
}

// 4색 조화: 메인 컬러 포함 4가지
export function getTetradicColors(hsl) {
	return [
		`#${convert.hsl.hex([(hsl[0] + 270) % 360, hsl[1], hsl[2]])}`,
		`#${convert.hsl.hex([(hsl[0] + 180) % 360, hsl[1], hsl[2]])}`,
		`#${convert.hsl.hex([(hsl[0] + 90) % 360, hsl[1], hsl[2]])}`,
	];
}

// 색상 정보 (hexVal, rgbVal, hslVal, cmykVal)
export const getColorInfo = hexVal => {
	hexVal = hexVal.length > 6 ? hexVal.slice(1, 7) : hexVal;

	const rgbArray = convert.hex.rgb(hexVal.replace('#', ''));
	const hslArray = convert.hex.hsl(hexVal.replace('#', ''));
	const cmykArray = convert.hex.cmyk(hexVal.replace('#', ''));

	return {
		hexVal: `#${hexVal}`,
		rgbVal: `rgb(${rgbArray.join(', ')})`,
		hslVal: `hsl(${hslArray[0]}, ${hslArray[1]}%, ${hslArray[2]}%)`,
		cmykVal: `CMYK(${cmykArray.join('%, ')}%)`,
	};
};
