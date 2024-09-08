import { useEffect, useState } from 'react';
import nearestColor from 'nearest-color';
import colorNameList from '../assets/korColorName.json';
import engColorNameList from '../assets/Best_of_names_subset.json';
import { getLevenshteinDistance } from '@utils/home';

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

	const getSortedSearchColorList = (isKoreanName, list, key, keyword) => {
		return list
			.filter(color => {
				return isKoreanName
					? color[key].includes(keyword)
					: color[key].toUpperCase().includes(keyword.toUpperCase());
			})
			.map(color => ({
				...color,
				distance: getLevenshteinDistance(
					isKoreanName ? color[key] : color[key].toUpperCase(),
					isKoreanName ? keyword : keyword.toUpperCase(),
				),
			}))
			.sort((a, b) => a.distance - b.distance)
			.slice(0, 5);
	};

	const getSearchColorList = (isKorean, keyword) => {
		const key = isKorean ? 'korean_name' : 'name';
		const list = isKorean ? colorNameList : engColorNameList;
		return getSortedSearchColorList(isKorean, list, key, keyword);
	};

	return {
		isLoding,
		getEngColorName,
		getKorColorName,
		getEngColorNameLocal,
		getSearchColorList,
	};
};

export default useColorName;
