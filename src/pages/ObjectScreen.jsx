import React, { useEffect, useState } from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, View } from 'react-native';
import ObjectCanvas from '@components/ObjectPage/ObjectCanvas.jsx';
import BasicHeader from '@components/common/BasicHeader';
import ObjectBottomCotainer from '@components/ObjectPage/ObjectBottomCotainer';
import ColorBottomSheet from '@components/ObjectPage/ColorBottomSheet';
import { heightScale } from '@utils/scaling';

const backgroundimg = require('@images/objectitems/background/background.png');

const ObjectScreen = ({ route }) => {
	const colors = route.params || [
		'#000080',
		'#A52A2A',
		'#D8BFD8',
		'#FBFBFB',
		'#3F3A3A',
	];
	const [droppedItems, setDroppedItems] = useState([]);
	const [gender, setGender] = useState(false);
	const [selectedItemId, setSelectedItemId] = useState(null);
	const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
	const [defaultItems, setDefaultItems] = useState([]);
	const [activeTab, setActiveTab] = useState('');

	//디버깅
	useEffect(() => {
		console.log(droppedItems);
	}, [droppedItems, gender, selectedItemId, isColorPickerOpen]);

	const infoText =
		'추천 및 분석에서 얻은 색상들을 캐릭터에게 입혀 사전에 색상의 분위기를 직접적으로 체험할 수 있습니다.';

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<BasicHeader
				title={'색상 미리보기'}
				subTitle={'color preview'}
				titleIcon={'object'}
				rightIcon={'info'}
				infoText={infoText}
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
					defaultItems={defaultItems}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					setIsColorPickerOpen={setIsColorPickerOpen}
				/>
				{/* 컬러 팔레트 */}
				<ColorBottomSheet
					colors={colors}
					selectedItemId={selectedItemId}
					setDroppedItems={setDroppedItems}
					isColorPickerOpen={isColorPickerOpen}
					setIsColorPickerOpen={setIsColorPickerOpen}
				/>
			</ImageBackground>

			<View style={{ height: heightScale(164) }}>
				{/* 바텀 컨테이너 */}
				<ObjectBottomCotainer
					setDroppedItems={setDroppedItems}
					gender={gender}
					setGender={setGender}
					setIsColorPickerOpen={setIsColorPickerOpen}
					setSelectedItemId={setSelectedItemId}
					setDefaultItems={setDefaultItems}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
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
