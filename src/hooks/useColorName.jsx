import { useEffect, useState } from 'react';
import nearestColor from 'nearest-color';
import colorNameList from '../assets/color_name.json';
import { getLevenshteinDistance, stringFormat } from '@utils/home';

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

	const nearestName = nearestColor.from(
		colorNameList.reduce(
			(o, { name, korean_name, hex }) =>
				Object.assign(o, { [korean_name + '/' + name]: hex }),
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
	const getColorName = value => {
		setIsLoading(true);
		const response = nearestName(value);
		setIsLoading(false);
		const korean_name = response.name.split('/')[0];
		const name = response.name.split('/')[1];
		return { korean_name, name };
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

	const getSortedSearchColorList = (key, keyword) => {
		return colorNameList
			.filter(color => {
				return stringFormat(color[key]).includes(keyword);
			})
			.map(color => ({
				...color,
				distance: getLevenshteinDistance(
					stringFormat(color[key]),
					keyword,
				),
			}))
			.sort((a, b) => a.distance - b.distance)
			.slice(0, 5);
	};

	const getSearchColorList = (isKorean, keyword) => {
		const key = isKorean ? 'korean_name' : 'name';
		const keyword_ = stringFormat(keyword);
		return getSortedSearchColorList(key, keyword_);
	};

	return {
		isLoading,
		getColorName,
		getKorColorName,
		getEngColorNameLocal,
		getSearchColorList,
	};
};

export default useColorName;
