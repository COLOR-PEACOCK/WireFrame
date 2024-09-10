import React from 'react';
import Tshirt from '@images/objectitems/male/clothesTop/T-shirts.js';
import Shorts from '@images/objectitems/male/clothesBottom/shorts.js';

const maleItemData = {
	clothesTop: [
		{
			id: '1',
			category: 'clothesTop',
			canvasWidth: 170,
			canvasHeight: 170,
			canvasX: -72,
			canvasY: -403,
			zIndex: 300,
			svg: <Tshirt width={80} height={80} fill={'#FBFBFB'} />,
			isDefault: true,
		},
	],
	clothesBottom: [
		{
			id: '2',
			category: 'clothesBottom',
			canvasWidth: 108,
			canvasHeight: 92,
			canvasX: -55,
			canvasY: -266,
			zIndex: 200,
			svg: <Shorts width={80} height={80} />,
			isDefault: true,
		},
		// 다른 남성 하의 아이템들...
	],
	shoes: [],
};

export default maleItemData;
