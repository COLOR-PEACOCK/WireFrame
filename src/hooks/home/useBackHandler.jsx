import { Alert, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

/**
 * 사용자가 뒤로 가기 버튼을 누르면 앱종료 alert를 호출합니다.
 * @example BackHandler를 사용할 스크린에서 다음과 같이 함수를 호출하시면 됩니다.
 * ```
 * const AnyScreen = () => {
 *   useBackHandler();
 *   ...
 * }
 * ```
 */

const useBackHandler = () => {
	const navigation = useNavigation();

	useEffect(() => {
		const backAction = () => {
			if (navigation.isFocused()) {
				Alert.alert('앱 종료', '앱을 종료하시겠습니까?', [
					{ text: '취소', onPress: () => null },
					{ text: '확인', onPress: () => BackHandler.exitApp() },
				]);
				return true;
			}
		};

		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			backAction,
		);

		return () => {
			backHandler.remove();
		};
	}, []);
};
export default useBackHandler;