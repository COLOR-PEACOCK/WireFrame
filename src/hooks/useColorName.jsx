import { useEffect, useState } from 'react';
import nearestColor from 'nearest-color';
import colorNameList from '../assets/korColorName.json';
import engColorNameList from '../assets/Best_of_names_subset.json';

/**
 * @returns isLoding, getEngColorName getKorColorName
 * @example
 * ```
 * const { getEngColorName, getKorColorName } = useColorName();
 * const engColorName = getEngColorName('#231f20')
 * const korColorName = getKorColorName('#231f20')
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
	 * @returns color name from local file
	 * @param value hexvalue
	 */
	const getEngColorName = value => {
		setIsLoding(true);
		const response = nearestEng(value);
		setIsLoding(false);
		return response.name;
	};

	/**
	 * @returns Korean color name
	 * @param value hexvalue
	 */
	const getKorColorName = value => {
		setIsLoding(true);
		const response = nearest(value);
		setIsLoding(false);
		return response.name;
	};

	return { isLoding, getEngColorName, getKorColorName };
};

export default useColorName;
