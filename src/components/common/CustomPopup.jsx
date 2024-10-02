import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { COLOR } from '@styles/color';

/**
 * 아래 example 참고
 *  * @example 상태 이름은 자유입니다.
 * ```
 * import CustomPopup from '경로';
 *
 * const [message, setMessage] = useState('');
 *
 * useEffect(() => {
 *    setMessage('작성할 텍스트 내용\n• 줄바꿈 하고 작성한 텍스트');
 * }, []);
 *
 * <CustomPopup message={message} />
 * ```
 *  \n• : 줄바꿈
 */

const CustomPopup = ({ message }) => {
	const [visible, setVisible] = useState(false);
	const slideAnim = useRef(new Animated.Value(0)).current;
	const opicityAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		if (message) {
			setVisible(true);

			const createAnimation = () => {
				return Animated.parallel([
					Animated.sequence([
						Animated.timing(slideAnim, {
							toValue: 1,
							duration: 500,
							easing: Easing.inOut(Easing.quad),
							useNativeDriver: true,
						}),
						Animated.timing(slideAnim, {
							toValue: 1,
							duration: 2500,
							easing: Easing.inOut(Easing.quad),
							useNativeDriver: true,
						}),
						Animated.timing(slideAnim, {
							toValue: 0,
							duration: 500,
							easing: Easing.inOut(Easing.quad),
							useNativeDriver: true,
						}),
					]),
					Animated.sequence([
						Animated.timing(opicityAnim, {
							toValue: 1,
							duration: 500,
							easing: Easing.inOut(Easing.quad),
							useNativeDriver: true,
						}),
						Animated.timing(opicityAnim, {
							toValue: 1,
							duration: 2500,
							easing: Easing.inOut(Easing.quad),
							useNativeDriver: true,
						}),
						Animated.timing(opicityAnim, {
							toValue: 0,
							duration: 500,
							easing: Easing.inOut(Easing.quad),
							useNativeDriver: true,
						}),
					]),
				]);
			};

			const animation = createAnimation();

			animation.start(() => {
				setVisible(false); // 애니메이션이 끝난 후 컴포넌트 언로드
			});
		}
	}, [message]);

	if (!visible) return null;

	return (
		<Animated.View
			style={[
				styles.popup,
				{
					transform: [
						{
							translateY: slideAnim.interpolate({
								inputRange: [0, 1],
								outputRange: [0, 70],
							}),
						},
					],
					opacity: opicityAnim.interpolate({
						inputRange: [0, 1],
						outputRange: [0, 1],
					}),
				},
			]}>
			<Text style={styles.message}>• {message}</Text>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	popup: {
		position: 'absolute',
		zIndex: 9999,
		top: -42,
		left: 0,
		right: 0,
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 28,
		paddingVertical: 28,
		paddingHorizontal: 18,
		backgroundColor: COLOR.PRIMARY,
		borderWidth: 2,
		borderColor: 'rgba(224, 224, 224, .5)',
		borderRadius: 8,
	},
	message: {
		color: COLOR.GRAY_3,
		fontSize: 18,
		fontFamily: 'Pretendard-Medium',
		textAlign: 'center',
	},
});

export default CustomPopup;
