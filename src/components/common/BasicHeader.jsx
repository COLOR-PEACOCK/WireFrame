import React from 'react';
import {
	SafeAreaView,
	Text,
	TouchableOpacity,
	StyleSheet,
	View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLOR } from '@styles/color';

/**
 * @param title Header Title
 * @param leftIcon default chevron-left
 * @param onPressLeft default goback()
 * @param rightIcon default null
 * @param onPressRight default null
 * @example
 * ```
 * <BasicHeader title={'title'} />
 * ```
 */
const BasicHeader = ({
	title,
	leftIcon = 'chevron-left',
	onPressLeft,
	rightIcon = null,
	onPressRight,
}) => {
	const navigate = useNavigation();
	return (
		<SafeAreaView
			style={{
				flexDirection: 'row',
				justifyContent: 'space-between',
				paddingHorizontal: 10,
				paddingVertical: 10,
				alignItems: 'center',
			}}>
			<View style={{ width: '5%' }}>
				<TouchableOpacity
					onPress={
						onPressLeft ? onPressLeft : () => navigate.goBack()
					}>
					<Icon name={leftIcon} color={COLOR.BLACK} size={20}></Icon>
				</TouchableOpacity>
			</View>
			<View
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					width: '90%',
				}}>
				<Text
					style={{
						fontFamily: 'Pretendard-Bold',
						fontSize: 18,
						color: COLOR.BLACK,
						textAlign: 'center',
						lineHeight: 20,
					}}>
					{title}
				</Text>
			</View>
			<View style={{ width: '6%' }}>
				<TouchableOpacity onPress={onPressRight ? onPressRight : null}>
					<Icon name={rightIcon} color={COLOR.BLACK} size={20}></Icon>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({});

export default BasicHeader;
