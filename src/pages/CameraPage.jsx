import React, { useEffect, useRef, useState } from 'react';
import {
	StyleSheet,
	View,
	Alert,
	SafeAreaView,
	TouchableOpacity,
	Image,
} from 'react-native';
import { CustomText as Text } from '@components/common/CustomText';
import { useCameraPermission } from 'react-native-vision-camera';
import { COLOR } from '@styles/color';
import Icon from 'react-native-vector-icons/FontAwesome';
import BasicHeader from '@components/common/BasicHeader';
import CameraRender from '@components/camerapage/CameraRender';
import ColorInfo from '@components/camerapage/ColorInfo';
import CrossHair from '@components/camerapage/CrossHair';
import ExtColorModal from '@components/camerapage/ExtColorModal';

const extbutton = require('@icons/circle__lock__btn.png');

const CameraPage = ({ navigation }) => {
	const { hasPermission, requestPermission } = useCameraPermission();
	const [cameraType, setCameraType] = useState('back');
	const [parentlayout, setParentlayout] = useState({
		height: 0,
		width: 0,
	});
	const [extColor, setExtColor] = useState({
		bgColor: `rgb(0,0,0)`,
		hexColor: '#000000',
		engName: '',
		korName: '',
	});
	const [selectedColor, setSelectedColor] = useState();
	const [isOpen, setIsOpen] = useState(0);
	const [zoomLevel, setZoomLevel] = useState(1);

	const parentRef = useRef();

	// 카메라 권한
	useEffect(() => {
		(async () => {
			if (hasPermission === false) {
				const newPermission = await requestPermission();
				if (!newPermission) {
					Alert.alert(
						'카메라 권한 필요',
						'이 앱은 카메라 권한이 필요합니다. 설정에서 권한을 허용해주세요.',
						[
							{ text: '취소', style: 'cancel' },
							{ text: '설정으로 이동', onPress: openSettings },
						],
					);
				}
			}
		})();
	}, [hasPermission, requestPermission]);

	// 크기 정보
	const onLayout = event => {
		const { width, height } = event.nativeEvent.layout;
		setParentlayout({ height: height, width: width });
	};

	// 추출 버튼 이벤트
	const extButtonEvent = () => {
		setSelectedColor({
			rgb: extColor.bgColor,
			hex: extColor.hexColor,
			engName: extColor.engName,
			korName: extColor.korName,
		});
		setIsOpen(1);
	};
	// 줌 버튼 이벤트
	const zoomButtonEvent = () => {
		zoomLevel === 1 ? setZoomLevel(2) : setZoomLevel(1);
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<BasicHeader title="카메라" />

			{/* 카메라 영역 */}
			<View
				onLayout={onLayout}
				ref={parentRef}
				style={styles.cameracontainer}>
				{/* 카메라 렌더*/}
				<CameraRender
					extColor={setExtColor}
					cameraType={cameraType}
					zoomLevel={zoomLevel}
				/>

				{/* 추출 색상 정보 모달 */}
				<ExtColorModal
					parentlayout={parentlayout}
					extColor={extColor}
					setCameraType={setCameraType}
				/>

				{/* 조준점 */}
				<CrossHair extColor={extColor} parentlayout={parentlayout} />
			</View>

			{/* 하단 영역 */}
			<View style={styles.bottomcontainer}>
				{/* 색상 정보 */}
				<View
					style={{
						height: 150,
						width: '100%',
						bottom: 100,
						justifyContent: 'flex-end',
					}}>
					<ColorInfo
						selectedColor={selectedColor}
						parentlayout={parentlayout}
						isOpen={isOpen}
						setIsOpen={setIsOpen}
					/>
				</View>

				{/* 하단 버튼 모음*/}
				<View style={styles.bottombar}>
					{/* 줌 버튼 */}
					<TouchableOpacity
						style={styles.zoombutton}
						onPress={zoomButtonEvent}>
						<Text style={{ fontSize: 16, color: COLOR.WHITE }}>
							{zoomLevel === 1 ? '2X' : '1X'}
						</Text>
					</TouchableOpacity>

					{/* 색 추출 버튼 */}
					<TouchableOpacity
						onPress={extButtonEvent}
						style={styles.extcolorbutton}>
						<Image source={extbutton} style={styles.innercircle} />
					</TouchableOpacity>

					{/* 추천 화면 이동 버튼 */}
					<TouchableOpacity style={styles.nextbutton}>
						<Icon
							name={'arrow-right'}
							color={COLOR.WHITE}
							size={20}
						/>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	cameracontainer: {
		flex: 1,
		alignItems: 'center',
	},
	bottomcontainer: {
		height: 250,
		position: 'absolute',
		width: '100%',
		bottom: 0,
		justifyContent: 'flex-end',
	},
	bottombar: {
		position: 'absolute',
		width: '100%',
		height: 100,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 18,
		backgroundColor: 'rgba(0, 0, 0, 0.9)',
	},
	zoombutton: {
		width: 48,
		height: 48,
		borderRadius: 24,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 2,
		borderColor: COLOR.GRAY_8,
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
	},
	extcolorbutton: {
		width: 70,
		height: 70,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 50,
		borderWidth: 4,
		borderColor: COLOR.GRAY_4,
	},
	innercircle: {
		width: 88,
		height: 88,
		top: '50%',
		left: '50%',
		transform: [{ translateX: -31.2 }, { translateY: -24 }],
	},
	nextbutton: {
		borderRadius: 24,
		width: 48,
		height: 48,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 2,
		borderColor: COLOR.GRAY_8,
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
	},
});

export default CameraPage;
