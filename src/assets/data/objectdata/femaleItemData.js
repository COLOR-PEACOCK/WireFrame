import React from 'react';
import {
	ShortSleeveshirt,
	LongSleevShirt,
} from '@images/objectitems/female/clothesTop/clothesTop.js';
import {
	WideShorts,
	WideLongPants,
} from '@images/objectitems/female/clothesBottom/clothesBottom.js';
import { Shoes, Slippers } from '@images/objectitems/female/shoes/shoes.js';

const femaleItemData = {
	clothesTop: [
		{
			id: '1',
			category: 'clothesTop',
			canvasWidth: 130,
			canvasHeight: 138,
			canvasX: -57,
			canvasY: -365,
			zIndex: 300,
			svg: <ShortSleeveshirt width={80} height={80} />,
		},
		{
			id: '2',
			category: 'clothesTop',
			canvasWidth: 152,
			canvasHeight: 146,
			canvasX: -85,
			canvasY: -362,
			zIndex: 300,
			svg: <LongSleevShirt width={80} height={80} />,
		},
	],
	clothesBottom: [
		{
			id: '3',
			category: 'clothesBottom',
			canvasWidth: 138,
			canvasHeight: 128,
			canvasX: -78,
			canvasY: -276,
			zIndex: 200,
			svg: <WideShorts width={80} height={80} />,
		},
		{
			id: '4',
			category: 'clothesBottom',
			canvasWidth: 170,
			canvasHeight: 170,
			canvasX: 95,
			canvasY: 73,
			zIndex: 200,
			svg: <WideLongPants width={80} height={80} />,
		},
	],
	shoes: [
		{
			id: '5',
			category: 'shoes',
			canvasWidth: 170,
			canvasHeight: 170,
			canvasX: 95,
			canvasY: 73,
			zIndex: 100,
			svg: <Shoes width={80} height={80} />,
		},
		{
			id: '6',
			category: 'shoes',
			canvasWidth: 170,
			canvasHeight: 170,
			canvasX: 95,
			canvasY: 73,
			zIndex: 100,
			svg: <Slippers width={80} height={80} />,
		},
	],
};

export default femaleItemData;
