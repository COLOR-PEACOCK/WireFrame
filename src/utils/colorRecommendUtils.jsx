import convert from 'color-convert'; // hex, hsl, cmyk, rgb 변환
// 메인 컬러는 스크린 쪽에 있음
// 보색 조합: 메인 컬러 포함 2가지
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
