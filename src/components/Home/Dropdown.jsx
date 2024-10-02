import React, { useRef, useState, useEffect } from 'react';
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Modal,
	Dimensions,
	ScrollView,
	Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { COLOR } from '@styles/color';
import { ListValue } from '@components/Home';
import { useModal } from '@hooks';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const SCROLL_VIEW_MAX_HEIGHT = 240;

const Dropdown = ({
	list,
	selectedLabel = '',
	onClickDropdown,
	layoutStyle,
	disabled,
	placeholder,
}) => {
	const { isModalVisible, handleOpenModal, handleCloseModal } = useModal();
	const [dropdownTop, setDropdownTop] = useState(0);
	const [width, setWidth] = useState(0);
	const [dropdownLeft, setDropDownLeft] = useState();
	const touchableOpacityRef = useRef(null);

	useEffect(() => {
		if (!isModalVisible) {
			return;
		}

		touchableOpacityRef.current?.measure(
			(_x, _y, width, height, _pageX, pageY) => {
				setWidth(width);
				setDropDownLeft(_pageX);
				if (
					DEVICE_HEIGHT -
						(pageY +
							height +
							12 +
							Math.min(
								SCROLL_VIEW_MAX_HEIGHT,
								list.length * 48,
							)) >
					10
				) {
					setDropdownTop(pageY + height + 12);
				} else {
					setDropdownTop(
						pageY -
							Math.min(SCROLL_VIEW_MAX_HEIGHT, list.length * 48),
					);
				}
			},
		);
	}, [isModalVisible]);

	const handlePressLabel = label => {
		handleCloseModal();
		if (onClickDropdown) {
			onClickDropdown(label);
		}
	};

	return (
		<View style={layoutStyle}>
			<TouchableOpacity
				activeOpacity={1}
				ref={touchableOpacityRef}
				disabled={disabled}
				onPress={isModalVisible ? handleCloseModal : handleOpenModal}
				style={[
					styles.fieldContainer,
					{
						...(isModalVisible && {
							borderColor: COLOR.PRIMARY,
							borderWidth: 2,
							borderRadius: 8,
						}),
						...(disabled && {
							borderColor: COLOR.GRAY_5,
						}),
					},
				]}>
				<ListValue
					label={selectedLabel}
					{...(!selectedLabel &&
						placeholder && {
							disabled: true,
							label: placeholder,
						})}
					onPressLabel={
						isModalVisible ? handleCloseModal : handleOpenModal
					}
				/>
				<Icon
					name={isModalVisible ? 'caretup' : 'caretdown'}
					size={10}
					style={{ marginHorizontal: 18 }}
				/>
			</TouchableOpacity>
			{isModalVisible && (
				<Pressable onPress={handleCloseModal}>
					<View
						style={{
							width: '100%',
							alignItems: 'center',
						}}>
						<View style={[styles.modalContainer, { width }]}>
							<ScrollView
								showsVerticalScrollIndicator={false}
								keyboardShouldPersistTaps={'always'}>
								{list.map(l => (
									<ListValue
										key={l}
										label={l}
										isActive={l === selectedLabel}
										onPressLabel={handlePressLabel}
									/>
								))}
							</ScrollView>
						</View>
					</View>
				</Pressable>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	fieldContainer: {
		height: 48,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderColor: COLOR.GRAY_3,
		borderWidth: 2,
		borderRadius: 8,
	},
	modalContainer: {
		zIndex: 10,
		borderWidth: 2,
		borderRadius: 8,
		borderColor: COLOR.GRAY_3,
		backgroundColor: COLOR.WHITE,
		elevation: 4,
	},
});

export default Dropdown;
