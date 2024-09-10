import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { COLOR } from '@styles/color';

/** 1초 후 등장하여 3.5초간 대기하고 없어지는 팝업
 * 아래 example 참고
 *  * @example 상태 이름은 자유입니다.
 * `````````````````````````````````````````````
 * import CustomPopup from '경로';
 * 
 * const [message, setMessage] = useState('');
 * 
 * useEffect(() => {
 *    setMessage('작성할 텍스트 내용\n• 줄바꿈 하고 작성한 텍스트');
 * }, []);
 * 
 * <CustomPopup message={message} /> 
 * ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
 *  \n• : 줄바꿈
 */

const CustomPopup = ({ message, duration = 3500 }) => {
	const [visible, setVisible] = useState(false);
	const slideAnim = useRef(new Animated.Value(-100)).current;

	useEffect(() => {
		if (message) {
			setVisible(true);

			// 애니메이션 시작을 1초 지연
			const showTimeout = setTimeout(() => {
				Animated.timing(slideAnim, {
					toValue: 0,
					duration: 500,
					easing: Easing.out(Easing.ease),
					useNativeDriver: true,
				}).start();
			}, 1000); // 1초 지연

			const hideTimeout = setTimeout(() => {
				Animated.timing(slideAnim, {
					toValue: -100,
					duration: 500,
					easing: Easing.in(Easing.ease),
					useNativeDriver: true,
				}).start(() => setVisible(false));
			}, duration + 1000); // 1초 지연 추가

			return () => {
				clearTimeout(showTimeout);
				clearTimeout(hideTimeout);
			};
		}
	}, [message]);

	if (!visible) return null;

	return (
		<Animated.View
			style={[styles.popup, { transform: [{ translateY: slideAnim }] }]}>
			<Text style={styles.message}>• {message}</Text>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	popup: {
		position: 'absolute',
		zIndex: 9999,
		top: 72,
		left: 0,
		right: 0,
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 30,
		paddingVertical: 15,
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
