import React, { useEffect, useRef, useState } from 'react';
import {
	StyleSheet,
	View,
	Alert,
	SafeAreaView,
	TouchableOpacity,
} from 'react-native';
import { CustomText as Text } from '@components/common/CustomText';
import { useCameraPermission } from 'react-native-vision-camera';
import { COLOR } from '@styles/color';
import Icon from 'react-native-vector-icons/FontAwesome';
import BasicHeader from '@components/common/BasicHeader';
import CameraRender from '@components/camerapage/CameraRender';

const CameraPage = ({ navigation }) => {
	const { hasPermission, requestPermission } = useCameraPermission();
	const [parentHeight, setParentHeight] = useState(0);
	const [parentWidth, setParentWidth] = useState(0);
	const [extColor, setExtColor] = useState({
		bgColor: `rgb(0,0,0)`,
		hexColor: '#000000',
	});
	const [selectedColor, setSelectedColor] = useState();
	const [cameraType, setCameraType] = useState('back');

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
		setParentHeight(height);
		setParentWidth(width);
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<BasicHeader title="카메라" />

			{/* 카메라 영역 */}
			<View
				onLayout={onLayout}
				ref={parentRef}
				style={styles.cameracontainer}>
				{/* 카메라 */}
				<CameraRender extColor={setExtColor} cameraType={cameraType} />

				{/* 추출 색상 정보 모달 */}
				<View
					style={[
						styles.colormodal,
						{
							width: parentWidth / 1.092,
							height: parentHeight / 5.161,
						},
					]}>
					<View
						style={{
							width: 74,
							height: 74,
							marginLeft: 24,
							backgroundColor: extColor.bgColor,
						}}
					/>
					<View>
						<Text style={{ color: COLOR.GRAY_2, fontSize: 16 }}>
							연한 파랑
						</Text>
						<Text style={{ color: COLOR.GRAY_2, fontSize: 16 }}>
							Light Blue
						</Text>
						<Text style={{ color: COLOR.GRAY_5, fontSize: 14 }}>
							HEX:{extColor.hexColor}
						</Text>
					</View>
				</View>

				{/* 조준점 */}
				<View
					style={[
						styles.crosshair,
						{
							top: parentHeight / 2 - 17.5,
							left: parentWidth / 2 - 17.5,
						},
					]}>
					<View
						style={[
							styles.crosshairbg,
							{ borderColor: extColor.bgColor },
						]}>
						<View
							style={{
								width: 20,
								height: 20,
								borderRadius: 18,
								borderWidth: 1,
								borderColor: COLOR.WHITE,
							}}
						/>
					</View>
				</View>
			</View>

			{/* 하단 영역 */}
			<View style={styles.bottomcontainer}>
				{/* 색상 정보 */}
				{selectedColor ? (
					<View style={styles.infowrapper}>
						<View
							style={{
								width: 74,
								height: 74,
								backgroundColor: selectedColor.rgb,
								marginLeft: 42,
							}}
						/>
						<View>
							<Text
								style={{ color: COLOR.GRAY_10, fontSize: 16 }}>
								연한 파랑
							</Text>
							<Text
								style={{ color: COLOR.GRAY_10, fontSize: 16 }}>
								Light Blue
							</Text>
							<Text style={{ color: COLOR.GRAY_8, fontSize: 14 }}>
								HEX:{selectedColor.hex}
							</Text>
						</View>
					</View>
				) : (
					<View
						style={[
							styles.infowrapper,
							{ justifyContent: 'center' },
						]}>
						<Text
							style={{
								color: COLOR.GRAY_10,
								fontSize: 18,
								fontFamily: 'Pretendard-Bold',
							}}>
							선택하신 색상이 아직 없습니다.
						</Text>
					</View>
				)}

				{/* 하단 버튼 모음*/}
				<View style={styles.bottombar}>
					{/* 카메라 전환 */}
					<TouchableOpacity
						onPress={() =>
							setCameraType(prevType =>
								prevType === 'back' ? 'front' : 'back',
							)
						}
						style={{
							width: 86,
							height: 42,
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						<Text style={{ fontSize: 20 }}>전환</Text>
					</TouchableOpacity>
					{/* 색 추출 버튼 */}
					<TouchableOpacity
						onPress={() =>
							setSelectedColor({
								rgb: extColor.bgColor,
								hex: extColor.hexColor,
							})
						}
						style={{
							width: 70,
							height: 70,
							borderRadius: 50,
							borderWidth: 1.5,
							borderColor: COLOR.GRAY_10,
						}}
					/>
					{/* 추천 화면 이동 버튼 */}
					<TouchableOpacity
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							width: 86,
							height: 42,
						}}>
						<Text style={{ fontSize: 20, color: COLOR.GRAY_10 }}>
							다음
						</Text>
						<View
							style={{
								width: 40,
								height: 40,
								alignItems: 'center',
								justifyContent: 'center',
							}}>
							<Icon
								name={'chevron-right'}
								color={COLOR.GRAY_10}
								size={20}
							/>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	cameracontainer: {
		flex: 0.75,
		alignItems: 'center',
	},
	colormodal: {
		position: 'absolute',
		marginTop: 18,
		borderRadius: 10,
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	crosshair: {
		position: 'absolute',
		width: 35,
		height: 35,
		borderRadius: 18,
		borderWidth: 1,
		borderColor: COLOR.BLACK,
		justifyContent: 'center',
		alignItems: 'center',
	},
	crosshairbg: {
		width: 33,
		height: 33,
		borderRadius: 18,
		borderWidth: 6,
		justifyContent: 'center',
		alignItems: 'center',
	},
	bottomcontainer: {
		flex: 0.25,
		backgroundColor: COLOR.WHITE,
	},
	infowrapper: {
		flex: 0.53,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},

	bottombar: {
		flex: 0.47,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 18,
	},
});

export default CameraPage;
