import convert from 'color-convert';

// 보색 조합 추천 계산 식
export function getComplementaryColor(hsl) {
	return [
		`#${convert.hsl.hex([hsl[0], hsl[1], hsl[2]])}`,
		`#${convert.hsl.hex((hsl[0] + 180) % 360, hsl[1], hsl[2])}`,
	];
}

// 유사색 조합: 메인 컬러 포함 3가지
export function getAnalogousColors(hsl) {
	return [
		`#${convert.hsl.hex([hsl[0], hsl[1], hsl[2]])}`,
		`#${convert.hsl.hex([(hsl[0] + 360 - 18) % 360, hsl[1], hsl[2]])}`,
		`#${convert.hsl.hex([(hsl[0] + 18) % 360, hsl[1], hsl[2]])}`,
	];
}

// 3색 조화: 메인 컬러 포함 3가지
export function getTriadicColors(hsl) {
	return [
		`#${convert.hsl.hex([hsl[0], hsl[1], hsl[2]])}`,
		`#${convert.hsl.hex([(hsl[0] + 240) % 360, hsl[1], hsl[2]])}`,
		`#${convert.hsl.hex([(hsl[0] + 120) % 360, hsl[1], hsl[2]])}`,
	];
}

// 분할 보색: 메인 컬러 포함 3가지
export function getSplitComplementaryColors(hsl) {
	return [
		`#${convert.hsl.hex([hsl[0], hsl[1], hsl[2]])}`,
		`#${convert.hsl.hex([(hsl[0] + 180 + 18) % 360, hsl[1], hsl[2]])}`,
		`#${convert.hsl.hex([(hsl[0] + 180 - 18) % 360, hsl[1], hsl[2]])}`,
	];
}

/// 단색 조합: 메인 컬러 포함 5가지, 메인컬러 코드에 들어가 있음
export function getMonochromaticColors(hsl) {
	let lightnessDiff, lightnessDivideHigh, lightnessDivideLow, lightnessPiece;

	// 채도를 15간격으로 배치하되 간격이 확보가 안되면 베이스 색상 위치 변경하여 간격 확보
	if (hsl[1] < 15) {
		lightnessDiff = 100 - hsl[2]; // 명도 최대값과 베이스 색상의 명도값 차이
		lightnessDivideHigh = Math.floor(lightnessDiff / 4); // 베이스 색상의 채도가 15이하 일때는 위로 4개 색이 배치되므로 4로 나눔, 부동소숮점으로 인한 에러를 막기 위해 내림 처리
		lightnessPiece = Math.min(lightnessDivideHigh, 15); // 명도도 간격이 확보가 되면 15 간격을 사용하지만 간격이 좁은 경우 좁은 간격을 계산해서 적용

		return [
			`#${convert.hsl.hex([hsl[0], hsl[1], hsl[2]])}`,
			`#${convert.hsl.hex([
				hsl[0],
				hsl[1] + 15,
				hsl[2] + lightnessPiece,
			])}`,
			`#${convert.hsl.hex([
				hsl[0],
				hsl[1] + 30,
				hsl[2] + lightnessPiece * 2,
			])}`,
			`#${convert.hsl.hex([
				hsl[0],
				hsl[1] + 45,
				hsl[2] + lightnessPiece * 3,
			])}`,
			`#${convert.hsl.hex([
				hsl[0],
				hsl[1] + 60,
				hsl[2] + lightnessPiece * 4,
			])}`,
		];
	} else if (hsl[1] >= 15 && hsl[1] < 30) {
		lightnessDiff = 100 - hsl[2];
		lightnessDivideHigh = Math.floor(lightnessDiff / 3);
		lightnessDivideLow = Math.floor(hsl[2]); // 채도가 15에서 30사이 일때는 베이스 색상 아래에도 1개가 배치 되므로 아래값도 고려
		lightnessPiece = Math.min(lightnessDivideLow, lightnessDivideHigh, 15); // 모든 간격 중 가장 간격 좁은 것 선택, 최대값은 15

		return [
			`#${convert.hsl.hex([
				hsl[0],
				hsl[1] - 15,
				hsl[2] - lightnessPiece,
			])}`,
			`#${convert.hsl.hex([hsl[0], hsl[1], hsl[2]])}`,
			`#${convert.hsl.hex([
				hsl[0],
				hsl[1] + 15,
				hsl[2] + lightnessPiece,
			])}`,
			`#${convert.hsl.hex([
				hsl[0],
				hsl[1] + 30,
				hsl[2] + lightnessPiece * 2,
			])}`,
			`#${convert.hsl.hex([
				hsl[0],
				hsl[1] + 45,
				hsl[2] + lightnessPiece * 3,
			])}`,
		];
	} else if (hsl[1] >= 30 && hsl[1] < 70) {
		lightnessDiff = 100 - hsl[2];
		lightnessDivideHigh = Math.floor(lightnessDiff / 2);
		lightnessDivideLow = Math.floor(hsl[2] / 2);
		lightnessPiece = Math.min(lightnessDivideLow, lightnessDivideHigh, 15);

		return [
			`#${convert.hsl.hex([
				hsl[0],
				hsl[1] - 30,
				hsl[2] - lightnessPiece * 2,
			])}`,
			`#${convert.hsl.hex([
				hsl[0],
				hsl[1] - 15,
				hsl[2] - lightnessPiece,
			])}`,
			`#${convert.hsl.hex([hsl[0], hsl[1], hsl[2]])}`,
			`#${convert.hsl.hex([
				hsl[0],
				hsl[1] + 15,
				hsl[2] + lightnessPiece,
			])}`,
			`#${convert.hsl.hex([
				hsl[0],
				hsl[1] + 30,
				hsl[2] + lightnessPiece * 2,
			])}`,
		];
	} else if (hsl[1] >= 70 && hsl[1] < 85) {
		lightnessDiff = 100 - hsl[2];
		lightnessDivideHigh = Math.floor(lightnessDiff);
		lightnessDivideLow = Math.floor(hsl[2] / 3);
		lightnessPiece = Math.min(lightnessDivideLow, lightnessDivideHigh, 15);

		return [
			`#${convert.hsl.hex([
				hsl[0],
				hsl[1] - 45,
				hsl[2] - lightnessPiece * 3,
			])}`,
			`#${convert.hsl.hex([
				hsl[0],
				hsl[1] - 30,
				hsl[2] - lightnessPiece * 2,
			])}`,
			`#${convert.hsl.hex([
				hsl[0],
				hsl[1] - 15,
				hsl[2] - lightnessPiece,
			])}`,
			`#${convert.hsl.hex([hsl[0], hsl[1], hsl[2]])}`,
			`#${convert.hsl.hex([
				hsl[0],
				hsl[1] + 15,
				hsl[2] + lightnessPiece,
			])}`,
		];
	} else {
		lightnessDiff = 100 - hsl[2];
		lightnessDivideLow = Math.floor(hsl[2] / 4);
		lightnessPiece = Math.min(lightnessDivideLow, 15);

		return [
			`#${convert.hsl.hex([
				hsl[0],
				hsl[1] - 60,
				hsl[2] - lightnessPiece * 4,
			])}`,
			`#${convert.hsl.hex([
				hsl[0],
				hsl[1] - 45,
				hsl[2] - lightnessPiece * 3,
			])}`,
			`#${convert.hsl.hex([
				hsl[0],
				hsl[1] - 30,
				hsl[2] - lightnessPiece * 2,
			])}`,
			`#${convert.hsl.hex([
				hsl[0],
				hsl[1] - 15,
				hsl[2] - lightnessPiece,
			])}`,
			`#${convert.hsl.hex([hsl[0], hsl[1], hsl[2]])}`,
		];
	}
}

// 4색 조화: 메인 컬러 포함 4가지
export function getTetradicColors(hsl) {
	return [
		`#${convert.hsl.hex([hsl[0], hsl[1], hsl[2]])}`,
		`#${convert.hsl.hex([(hsl[0] + 270) % 360, hsl[1], hsl[2]])}`,
		`#${convert.hsl.hex([(hsl[0] + 180) % 360, hsl[1], hsl[2]])}`,
		`#${convert.hsl.hex([(hsl[0] + 90) % 360, hsl[1], hsl[2]])}`,
	];
}

// 밝게(Tint) : 메인컬러 포함 6가지
export function getTintColors(hsl) {
	const basicLightnessPiece = 12;
	const lightnessDiff = 100 - hsl[2];
	const lightnessDivideHigh = Math.floor(lightnessDiff / 5); // 부동소수점으로 인한 에러를 막기위한 내림 처리
	const lightnessPiece = Math.min(lightnessDivideHigh, basicLightnessPiece);
	return [
		`#${convert.hsl.hex([hsl[0], hsl[1], hsl[2] + lightnessPiece])}`,
		`#${convert.hsl.hex([hsl[0], hsl[1], hsl[2] + lightnessPiece * 2])}`,
		`#${convert.hsl.hex([hsl[0], hsl[1], hsl[2] + lightnessPiece * 3])}`,
		`#${convert.hsl.hex([hsl[0], hsl[1], hsl[2] + lightnessPiece * 4])}`,
		`#${convert.hsl.hex([hsl[0], hsl[1], hsl[2] + lightnessPiece * 5])}`,
	];
}

// 어둡게(Shades) : 메인컬러 포함 6가지
export function getShadowColors(hsl) {
	const basicLightnessPiece = 12;
	const lightnessDivideLow = Math.floor(hsl[2] / 5); // 부동소수점으로 인한 에러를 막기위한 내림 처리
	const lightnessPiece = Math.min(lightnessDivideLow, basicLightnessPiece); // 간격이 확보가 되면 12 간격을 사용하지만 간격이 좁은 경우 좁은 간격을 계산해서 적용
	return [
		`#${convert.hsl.hex([hsl[0], hsl[1], hsl[2] - lightnessPiece])}`,
		`#${convert.hsl.hex([hsl[0], hsl[1], hsl[2] - lightnessPiece * 2])}`,
		`#${convert.hsl.hex([hsl[0], hsl[1], hsl[2] - lightnessPiece * 3])}`,
		`#${convert.hsl.hex([hsl[0], hsl[1], hsl[2] - lightnessPiece * 4])}`,
		`#${convert.hsl.hex([hsl[0], hsl[1], hsl[2] - lightnessPiece * 5])}`,
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
