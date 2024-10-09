import AsyncStorage from '@react-native-async-storage/async-storage';

const useAsyncStorage = () => {
	const storeData = async (key, value) => {
		try {
			const jsonValue = JSON.stringify(value);
			await AsyncStorage.setItem(key, jsonValue);
		} catch (e) {
			console.log('saving error');
		}
	};

	const getData = async key => {
		try {
			const jsonValue = await AsyncStorage.getItem(key);
			return jsonValue != null ? JSON.parse(jsonValue) : null;
		} catch (e) {
			console.log('reading value');
		}
	};

	const clearData = async () => {
		await AsyncStorage.clear();
	};

	return { storeData, getData, clearData };
};

export default useAsyncStorage;
