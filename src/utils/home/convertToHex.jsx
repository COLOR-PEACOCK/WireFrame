import convert from 'color-convert';
import { stringFormat, INPUT_TYPES, isValidKorean, isValidHexCode } from '@utils/home';

export const rgbToHex = (r, g, b) => {
	return `#${convert.rgb.hex(Number(r), Number(g), Number(b))}`;
};

export const hslToHex = (h, s, l) => {
	return `#${convert.hsl.hex(Number(h), Number(s), Number(l))}`;
};

export const cmykToHex = (c, m, y, k) => {
	return `#${convert.cmyk.hex(Number(c), Number(m), Number(y), Number(k))}`;
};

export const colorConverter = {
	[INPUT_TYPES.HEX]: values =>
		isValidHexCode(`#${values.part1}`) ? `#${values.part1}` : null,
	[INPUT_TYPES.RGB]: values =>
		rgbToHex(values.part1, values.part2, values.part3) ?? null,
	[INPUT_TYPES.HSL]: values =>
		hslToHex(values.part1, values.part2, values.part3) ?? null,
	[INPUT_TYPES.CMYK]: values =>
		cmykToHex(values.part1, values.part2, values.part3, values.part4) ??
		null,
	[INPUT_TYPES.COLOR_NAME]: (values, searchNameList) => {
		const keyword = stringFormat(values.part1);
		const matchedColor = searchNameList.find(color =>
			isValidKorean(keyword)
				? stringFormat(color.korean_name) === keyword
				: stringFormat(color.name) === keyword,
		);
		return matchedColor ? matchedColor.hex : null;
	},
};
