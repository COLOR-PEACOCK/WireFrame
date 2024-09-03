import { create } from 'apisauce';

const COLOR_BASE_URL = 'https://api.color.pizza/v1/';

export const colorInstance = create({
	baseURL: COLOR_BASE_URL,
});
