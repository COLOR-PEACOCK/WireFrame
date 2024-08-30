import { useEffect, useState } from 'react';
import nearestColor from 'nearest-color';
import { getColorNameInfo } from '@libs/api';
import colorNameList from '../assets/korColorName.json';
import engColorNameList from '../assets/Best_of_names_subset.json';

/**
 * @returns isLoding, getEngColorName getKorColorName
 * @example
 * ```
 * const { getEngColorName, getKorColorName, getEngColorNameLocal } = useColorName();
 * ```
 */
const useColorName = () => {
	useEffect(() => {}, []);
	const [isLoding, setIsLoding] = useState(false);
	const nearest = nearestColor.from(
		colorNameList.reduce(
			(o, { korean_name, hex }) =>
				Object.assign(o, { [korean_name]: hex }),
			{},
		),
	);
	const nearestEng = nearestColor.from(
		engColorNameList.reduce(
			(o, { name, hex }) => Object.assign(o, { [name]: hex }),
			{},
		),
	);

	/**
	 * @returns color name
	 * @param value hexvalue without the #
	 * @example
	 * ```
	 * const engColorName = await getEngColorName('0d0d0f')
	 * ```
	 */
	const getEngColorName = async value => {
		setIsLoding(true);
		const data = await getColorNameInfo(value);
		setIsLoding(false);
		const colorName = data.name;
		return colorName;
	};

	/**
	 * @returns color name from local file
	 * @param value hexvalue
	 * @example
	 * ```
	 * const engColorName = getEngColorNameLocal('#231f20')
	 * ```
	 */
	const getEngColorNameLocal = value => {
		setIsLoding(true);
		const response = nearestEng(value);
		setIsLoding(false);
		return response.name;
	};

	/**
	 * @returns Korean color name
	 * @param value hexvalue
	 * @example
	 * ```
	 * const korColorName = getKorColorName('#231f20')
	 * ```
	 */
	const getKorColorName = value => {
		setIsLoding(true);
		const response = nearest(value);
		setIsLoding(false);
		return response.name;
	};

	return { isLoding, getEngColorName, getKorColorName, getEngColorNameLocal };
};

export default useColorName;
