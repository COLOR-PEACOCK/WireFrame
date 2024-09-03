import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import { COLOR } from '@styles/color';
import { CustomText as Text } from '@components/common/CustomText';

/**
 * @param title 한글 title, text color: COLOR.PRIMARY
 * @param engTitle 영어 title, text color: COLOR.GRAY6
 * @param titleIcon title icon, color: COLOR.PRIMARY
 * @param leftIcon 왼쪽 버튼 아이콘, default: arrowleft
 * @param onPressLeft 왼쪽 버튼 이벤트, default: goback()
 * @param rightIcon 오른쪽 버튼, default: null
 * @param onPressRight 오른쪽 버튼 이벤트, default: null
 * @see 적용아이콘 https://oblador.github.io/react-native-vector-icons/#AntDesign
 * @example 모든 파라미터는 생략 가능합니다.
 * ```
<BasicHeader
    titleIcon={'picture'}
    title={'이미지'} engTitle={'images'} rightIcon={'info'}
    infoText={infotext}
/>
const infoText = 'infomation text'
 * ```
 */
const BasicHeader = ({
	leftIcon = 'arrowleft',
	onPressLeft = null,
	titleIcon,
	title,
	engTitle,
	rightIcon = null,
	onPressRight,
	infoText,
}) => {
	const navigate = useNavigation();
	const isInfo = rightIcon === 'info';
	const [infoButtonLayout, setInfoButtonLayout] = useState();
	const infoButtonRef = useRef(null);
	const infoModalRef = useRef(null);
	const [infoTextWidth, setInfoTextWidth] = useState(0);
	const [isInfoVisible, setIsInfoVisible] = useState();

	useEffect(() => {
		if (!isInfo) return;
		infoButtonRef.current?.measure(
			(_x, _y, width, height, pageX, pageY) => {
				setInfoButtonLayout({
					width: width,
					height: height,
					left: pageX,
					top: pageY,
				});
			},
		);
		infoModalRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
			setInfoTextWidth(width);
		});
	}, [isInfoVisible]);

	return (
		<View style={styles.headerContainer}>
			<TouchableOpacity
				style={styles.headerButton}
				onPress={onPressLeft ? onPressLeft : () => navigate.goBack()}>
				<Icon name={leftIcon} color={COLOR.PRIMARY} size={30}></Icon>
			</TouchableOpacity>

			<View style={styles.titleContainer}>
				<Icon name={titleIcon} color={COLOR.PRIMARY} size={30}></Icon>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.engTitle}>{engTitle}</Text>
			</View>

			{/* right button */}
			{isInfo ? (
				<TouchableOpacity
					ref={infoButtonRef}
					style={styles.infoButton}
					onPress={() => setIsInfoVisible(!isInfoVisible)}>
					<Icon name={rightIcon} color={COLOR.GRAY_5} size={20} />
				</TouchableOpacity>
			) : (
				<TouchableOpacity
					style={[
						styles.headerButton,
						rightIcon && {
							borderColor: COLOR.GRAY_3,
							borderWidth: 2,
							borderRadius: 8,
						},
					]}
					onPress={onPressRight}>
					<Icon name={rightIcon} color={COLOR.PRIMARY} size={30} />
				</TouchableOpacity>
			)}
			{/* info Modal */}
			{isInfoVisible && (
				<View
					style={[
						styles.infoModalWrap,
						{
							left:
								infoButtonLayout.left -
								infoTextWidth +
								infoButtonLayout.width * 1.3,
							top:
								infoButtonLayout.top +
								infoButtonLayout.height +
								10,
						},
					]}>
					<View ref={infoModalRef} style={styles.infoModalSquare}>
						<Text style={{ fontSize: 12 }}>{infoText}</Text>
					</View>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	headerContainer: {
		width: '100%',
		height: 64,
		flexDirection: 'row',
		paddingHorizontal: 18,
		alignItems: 'center',
		justifyContent: 'space-between',
		elevation: 5,
		backgroundColor: COLOR.WHITE,
	},
	titleContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},

	title: {
		fontFamily: 'CookieRun-Regular',
		fontSize: 20,
		color: COLOR.PRIMARY,
		textAlign: 'center',
	},
	engTitle: {
		fontFamily: 'CookieRun-Regular',
		fontSize: 16,
		color: COLOR.GRAY_6,
		textAlign: 'center',
		paddingTop: 8,
	},
	headerButton: {
		width: 48,
		height: 48,
		alignItems: 'center',
		justifyContent: 'center',
	},
	infoButton: {
		marginHorizontal: 12,
		width: 24,
		height: 24,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: COLOR.GRAY_3,
		borderWidth: 2,
		borderRadius: 4,
	},
	infoModalWrap: {
		position: 'absolute',
	},
	infoModalSquare: {
		maxWidth: 215,
		paddingHorizontal: 18,
		borderRadius: 4,
		borderWidth: 2,
		borderColor: COLOR.GRAY_3,
		backgroundColor: COLOR.WHITE,
	},
});

export default BasicHeader;
