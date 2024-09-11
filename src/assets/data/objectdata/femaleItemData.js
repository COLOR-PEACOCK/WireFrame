import React from 'react';
import {
	DefaultTop,
	ShortSleeveshirt,
	LongSleevShirt,
} from '@images/objectitems/female/clothesTop/clothesTop.js';
import {
	DefaultBottom,
	WideShorts,
	WideLongPants,
} from '@images/objectitems/female/clothesBottom/clothesBottom.js';
import { Shoes, Slippers } from '@images/objectitems/female/shoes/shoes.js';

const femaleItemData = {
	clothesTop: [
		{
			id: '1',
			category: 'clothesTop',
			canvasWidth: 110,
			canvasHeight: 96,
			canvasX: -45,
			canvasY: -373,
			zIndex: 300,
			svg: <DefaultTop width={100} height={100} />,
			isDefault: true,
		},
		{
			id: '2',
			category: 'clothesTop',
			canvasWidth: 134,
			canvasHeight: 142,
			canvasX: -59,
			canvasY: -373,
			zIndex: 300,
			svg: <ShortSleeveshirt width={100} height={100} />,
		},
		{
			id: '3',
			category: 'clothesTop',
			canvasWidth: 180,
			canvasHeight: 156,
			canvasX: -99,
			canvasY: -371,
			zIndex: 300,
			svg: <LongSleevShirt width={100} height={100} />,
		},
	],
	clothesBottom: [
		{
			id: '4',
			category: 'clothesBottom',
			canvasWidth: 102,
			canvasHeight: 64,
			canvasX: -60,
			canvasY: -268,
			zIndex: 200,
			svg: <DefaultBottom width={90} height={90} />,
			isDefault: true,
		},
		{
			id: '5',
			category: 'clothesBottom',
			canvasWidth: 144,
			canvasHeight: 134,
			canvasX: -83,
			canvasY: -281,
			zIndex: 200,
			svg: <WideShorts width={90} height={90} />,
		},
		{
			id: '6',
			category: 'clothesBottom',
			canvasWidth: 160,
			canvasHeight: 250,
			canvasX: -69,
			canvasY: -282,
			zIndex: 200,
			svg: <WideLongPants width={90} height={100} />,
		},
	],
	shoes: [
		{
			id: '7',
			category: 'shoes',
			canvasWidth: 142,
			canvasHeight: 38,
			canvasX: -52,
			canvasY: -40,
			zIndex: 100,
			svg: <Shoes width={100} height={80} />,
		},
		{
			id: '8',
			category: 'shoes',
			canvasWidth: 142,
			canvasHeight: 30,
			canvasX: -50,
			canvasY: -22,
			zIndex: 100,
			svg: <Slippers width={100} height={80} />,
		},
	],
};

export default femaleItemData;
