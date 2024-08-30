import { colorInstance } from '@utils/colorInstance';

export const getColorNameInfo = async value => {
	try {
		const response = await colorInstance.get(`${value}`);
		const data = response.data.colors[0];
		return data;
	} catch (error) {
		console.warn(error);
	}
};
