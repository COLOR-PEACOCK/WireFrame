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
import { Socks } from '@images/objectitems/female/socks/socks.js';
import { widthScale, heightScale } from '@utils/scaling';

const femaleItemData = {
	clothesTop: [
		{
			id: '1',
			category: 'clothesTop',
			canvasWidth: 106,
			canvasHeight: 96,
			canvasX: -42,
			canvasY: -384,
			zIndex: 300,
			svg: <DefaultTop width={widthScale(80)} height={heightScale(80)} />,
			isDefault: true,
		},
		{
			id: '2',
			category: 'clothesTop',
			canvasWidth: 134,
			canvasHeight: 138,
			canvasX: -59,
			canvasY: -383,
			zIndex: 300,
			svg: <ShortSleeveshirt width={80} height={heightScale(80)} />,
		},
		{
			id: '3',
			category: 'clothesTop',
			canvasWidth: 156,
			canvasHeight: 150,
			canvasX: -86,
			canvasY: -381,
			zIndex: 300,
			svg: <LongSleevShirt width={80} height={heightScale(80)} />,
		},
	],
	clothesBottom: [
		{
			id: '4',
			category: 'clothesBottom',
			canvasWidth: 98,
			canvasHeight: 64,
			canvasX: -56,
			canvasY: -284,
			zIndex: 200,
			svg: <DefaultBottom width={80} height={heightScale(80)} />,
			isDefault: true,
		},
		{
			id: '5',
			category: 'clothesBottom',
			canvasWidth: 152,
			canvasHeight: 125,
			canvasX: -85,
			canvasY: -297,
			zIndex: 200,
			svg: <WideShorts width={80} height={heightScale(80)} />,
		},
		{
			id: '6',
			category: 'clothesBottom',
			canvasWidth: 160,
			canvasHeight: 238,
			canvasX: -68,
			canvasY: -299,
			zIndex: 200,
			svg: <WideLongPants width={80} height={heightScale(80)} />,
		},
	],
	shoes: [
		{
			id: '7',
			category: 'shoes',
			canvasWidth: 142,
			canvasHeight: 38,
			canvasX: -52,
			canvasY: -65,
			zIndex: 100,
			svg: <Shoes width={heightScale(100)} height={heightScale(80)} />,
		},
		{
			id: '8',
			category: 'shoes',
			canvasWidth: 132,
			canvasHeight: 30,
			canvasX: -46,
			canvasY: -50,
			zIndex: 100,
			svg: <Slippers width={heightScale(100)} height={heightScale(80)} />,
		},
	],
	socks: [
		{
			id: '9',
			category: 'socks',
			canvasWidth: 128,
			canvasHeight: 85,
			canvasX: -43,
			canvasY: -112,
			zIndex: 10,
			svg: <Socks width={100} height={80} />,
			isVisible: true,
		},
	],
};

export default femaleItemData;
