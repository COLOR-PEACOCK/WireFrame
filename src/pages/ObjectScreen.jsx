import React, { Component, useEffect, useState } from 'react';
import {
	FlatList,
	ImageBackground,
	SafeAreaView,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import ObjectCanvas from '@components/ObjectPage/ObjectCanvas.jsx';
import BasicHeader from '@components/common/BasicHeader';
import ObjectBottomCotainer from '@components/ObjectPage/ObjectBottomCotainer';
import ColorBottomSheet from '@components/ObjectPage/ColorBottomSheet';

const backgroundimg = require('@images/objectitems/background/background.png');

const ObjectScreen = ({ route }) => {
	const colors = route.params;
	const [droppedItems, setDroppedItems] = useState([]);
	const [gender, setGender] = useState(false);
	const [selectedItemId, setSelectedItemId] = useState(null);

	//디버깅
	useEffect(() => {
		return console.log(droppedItems);
	}, [droppedItems]);

	// 오브젝트 캔버스 터치시 이벤트
	const handleItemSelect = id => {
		setSelectedItemId(prevId => (prevId === id ? null : id));
	};

	const handleItemDelete = id => {
		setDroppedItems(prevItems => prevItems.filter(item => item.id !== id));
		setSelectedItemId(null);
	};

	const handleColorSelect = color => {
		if (selectedItemId) {
			setDroppedItems(prevItems =>
				prevItems.map(item =>
					item.id === selectedItemId
						? { ...item, color: color }
						: item,
				),
			);
		}
	};
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<BasicHeader title="오브젝트" subTitle="object" />

			{/* 오브젝트 배치 화면 */}
			<ImageBackground
				source={backgroundimg}
				style={styles.backgroundcontainer}>
				<ObjectCanvas
					droppedItems={droppedItems}
					onItemDelete={handleItemDelete}
					onItemSelect={handleItemSelect}
					selectedItemId={selectedItemId}
					gender={gender}
				/>
				{/* 컬러 정보 */}
				<ColorBottomSheet
					colors={colors}
					onColorSelect={handleColorSelect}
				/>
			</ImageBackground>

			<View style={{ flex: 1 }}>
				{/* 바텀 컨테이너 */}
				<ObjectBottomCotainer
					setDroppedItems={setDroppedItems}
					gender={gender}
					setGender={setGender}
				/>
			</View>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	backgroundcontainer: {
		flex: 3.38,
		justifyContent: 'flex-end',
	},
});

export default ObjectScreen;
