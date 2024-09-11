import { useEffect, useState } from 'react';
import nearestColor from 'nearest-color';
import colorNameList from '../assets/color_name.json';
import { getLevenshteinDistance } from '@utils/home';

/**
 * @returns isLoading, getEngColorName getKorColorName
 * @example
 * ```
 * const { getEngColorName, getKorColorName, getEngColorNameLocal } = useColorName();
 * ```
 */
const useColorName = () => {
	useEffect(() => {}, []);
	const [isLoading, setIsLoading] = useState(false);
	const nearest = nearestColor.from(
		colorNameList.reduce(
			(o, { korean_name, hex }) =>
				Object.assign(o, { [korean_name]: hex }),
			{},
		),
	);
	const nearestEng = nearestColor.from(
		colorNameList.reduce(
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
	const getEngColorName = async value => {};

	/**
	 * @returns color name from local file
	 * @param value hexvalue
	 * @example
	 * ```
	 * const engColorName = getEngColorNameLocal('#231f20')
	 * ```
	 */
	const getEngColorNameLocal = value => {
		setIsLoading(true);
		const response = nearestEng(value);
		setIsLoading(false);
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
		setIsLoading(true);
		const response = nearest(value);
		setIsLoading(false);
		return response.name;
	};

	const getSortedSearchColorList = (isKoreanName, key, keyword) => {
		return colorNameList
			.filter(color => {
				return isKoreanName
					? color[key].replaceAll(' ', '').includes(keyword)
					: color[key].replaceAll(' ', '').toUpperCase().includes(keyword.toUpperCase());
			})
			.map(color => ({
				...color,
				distance: getLevenshteinDistance(
					isKoreanName ? color[key].replaceAll(' ', '') : color[key].toUpperCase().replaceAll(' ', ''),
					isKoreanName ? keyword : keyword.toUpperCase(),
				),
			}))
			.sort((a, b) => a.distance - b.distance)
			.slice(0, 5);
	};

	const getSearchColorList = (isKorean, keyword) => {
		const key = isKorean ? 'korean_name' : 'name';
		const keyword_ = keyword.replaceAll(' ', '')
		return getSortedSearchColorList(isKorean, key, keyword_);
	};

	return {
		isLoading,
		getEngColorName,
		getKorColorName,
		getEngColorNameLocal,
		getSearchColorList,
	};
};

export default useColorName;
