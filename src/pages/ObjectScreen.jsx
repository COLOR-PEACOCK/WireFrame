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
	const [isColorPickerOpen, setIsColorPickerOpen] = useState(true);

	//디버깅
	useEffect(() => {
		return console.log(droppedItems);
	}, [droppedItems, gender, selectedItemId, isColorPickerOpen]);

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
			<BasicHeader
				title="색상 미리보기"
				subTitle="color preview"
				titleIcon="object"
			/>

			{/* 오브젝트 배치 화면 */}
			<ImageBackground
				source={backgroundimg}
				style={styles.backgroundcontainer}>
				{/* 캔버스 영역 */}
				<ObjectCanvas
					droppedItems={droppedItems}
					setDroppedItems={setDroppedItems}
					selectedItemId={selectedItemId}
					setSelectedItemId={setSelectedItemId}
					gender={gender}
				/>
				{/* 컬러 팔레트 */}
				<ColorBottomSheet
					colors={colors}
					onColorSelect={handleColorSelect}
					isColorPickerOpen={isColorPickerOpen}
					setIsColorPickerOpen={setIsColorPickerOpen}
				/>
			</ImageBackground>

			<View style={{ height: 162 }}>
				{/* 바텀 컨테이너 */}
				<ObjectBottomCotainer
					setDroppedItems={setDroppedItems}
					gender={gender}
					setGender={setGender}
					setIsColorPickerOpen={setIsColorPickerOpen}
					setSelectedItemId={setSelectedItemId}
				/>
			</View>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	backgroundcontainer: {
		flex: 1,
		justifyContent: 'flex-end',
	},
});

export default ObjectScreen;
