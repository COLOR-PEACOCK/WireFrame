import { useState } from 'react';
import { Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

const useImagePicker = () => {
	const navigation = useNavigation();
	const [imageUri, setImageUri] = useState(null);

	const selectImage = async () => {
		try {
			const response = await launchImageLibrary({ mediaType: 'photo' });

			if (response.didCancel) {
				if (!imageUri) {
					navigation.goBack();
					Alert.alert('알림', '사진을 선택 해주세요.');
				}
				return false;
			} else if (response.error) {
				Alert.alert('Error', response.error);
				return false;
			}
			setImageUri(response.assets?.[0]?.uri);
		} catch (error) {
			Alert.alert(
				'Error',
				`이미지를 선택하는 동안 예기치 않은 오류가 발생했습니다: ${error.message}`,
			);
			return false;
		}
		return true;
	};

	return { imageUri, selectImage };
};

export default useImagePicker;
