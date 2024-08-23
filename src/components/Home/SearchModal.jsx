import { COLOR } from '@styles/color';
import { Modal, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { CustomText as Text } from '@components/common/CustomText';

const SearchModal = ({ visible, setIsModalVisible }) => {
	const handleModalClose = () => setIsModalVisible(false);

	return (
		<Modal
			animationType={'fade'}
			visible={visible}
			transparent={true}
			onRequestClose={handleModalClose}>
			<View style={styles.modalView}>
				<View style={styles.modalHeader}>
					<Text style={styles.modalHeaderText}>
						색상 이름 또는 색상 코드로 찾아보세요!
					</Text>
				</View>
				<View style={styles.inputContainer}>
					<Text style={{ fontSize: 18, marginRight: 16 }}>
						색이름
					</Text>
					<TextInput
						style={[styles.inputForm, { width: '60%' }]}
						placeholder={'(한글, 영어)'}
						placeholderTextColor={COLOR.GRAY_6}
					/>
				</View>
				<View style={styles.inputContainer}>
					<Text style={{ fontSize: 18, marginRight: 28 }}>HEX</Text>
					<TextInput
						style={[styles.inputForm, { width: '60%' }]}
						placeholder={'#ffffff'}
						placeholderTextColor={COLOR.GRAY_6}
					/>
				</View>
				<View style={styles.inputContainer}>
					<Text style={{ fontSize: 18, marginRight: 28 }}>RGB</Text>
					<TextInput
						style={[styles.inputForm, { width: '20%' }]}
						placeholder={'R'}
						placeholderTextColor={COLOR.GRAY_6}
					/>
					<TextInput
						style={[styles.inputForm, { width: '20%' }]}
						placeholder={'G'}
						placeholderTextColor={COLOR.GRAY_6}
					/>
					<TextInput
						style={[styles.inputForm, { width: '20%' }]}
						placeholder={'B'}
						placeholderTextColor={COLOR.GRAY_6}
					/>
				</View>
				<View style={styles.inputContainer}>
					<Text style={{ fontSize: 18, marginRight: 12 }}>CMYK</Text>
					<TextInput
						style={[styles.inputForm, { width: '15%' }]}
						placeholder={'C'}
						placeholderTextColor={COLOR.GRAY_6}
					/>
					<TextInput
						style={[styles.inputForm, { width: '15%' }]}
						placeholder={'M'}
						placeholderTextColor={COLOR.GRAY_6}
					/>
					<TextInput
						style={[styles.inputForm, { width: '15%' }]}
						placeholder={'Y'}
						placeholderTextColor={COLOR.GRAY_6}
					/>
					<TextInput
						style={[styles.inputForm, { width: '15%' }]}
						placeholder={'Y'}
						placeholderTextColor={COLOR.GRAY_6}
					/>
				</View>
				<View style={styles.inputContainer}>
					<Text style={{ fontSize: 18, marginRight: 28 }}>HSL</Text>
					<TextInput
						style={[styles.inputForm, { width: '20%' }]}
						placeholder={'H'}
						placeholderTextColor={COLOR.GRAY_6}
					/>
					<TextInput
						style={[styles.inputForm, { width: '20%' }]}
						placeholder={'S'}
						placeholderTextColor={COLOR.GRAY_6}
					/>
					<TextInput
						style={[styles.inputForm, { width: '20%' }]}
						placeholder={'L'}
						placeholderTextColor={COLOR.GRAY_6}
					/>
				</View>

				<View style={styles.buttonContainer}>
					<Pressable onPress={handleModalClose}>
						<Text>검색</Text>
					</Pressable>
					<Pressable onPress={handleModalClose}>
						<Text>취소</Text>
					</Pressable>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalView: {
		marginTop: 230,
		marginHorizontal: 18,
		backgroundColor: COLOR.WHITE,
		borderRadius: 24,
		alignItems: 'center',
		elevation: 5,
		shadowColor: COLOR.BLACK,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
	},
	modalHeader: {
		width: '100%',
		paddingVertical: 24,
		marginBottom: 26,
		borderBottomWidth: 1,
		borderBottomColor: COLOR.GRAY_5,
	},
	modalHeaderText: {
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 18,
	},
	inputContainer: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: 50,
	},
	inputForm: {
		borderBottomWidth: 1,
		borderRadius: 8,
		borderColor: COLOR.GRAY_8,
	},
	buttonContainer: {
		padding: 24,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 80,
	},
});

export default SearchModal;
