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
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLOR } from '@styles/color';
import { ListValue }from '@components/Home';
import useModal from '@hooks/useModal';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const SCROLL_VIEW_MAX_HEIGHT = 240;

const Dropdown = ({
	list,
	selectedLabel = '',
	onLabelClickHandler,
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
					setDropdownTop(pageY + height);
				} else {
					setDropdownTop(
						pageY -
							Math.min(SCROLL_VIEW_MAX_HEIGHT, list.length * 48),
					);
				}
			},
		);
	}, [isModalVisible]);

	return (
		<View style={layoutStyle}>
			<TouchableOpacity
				activeOpacity={1}
				ref={touchableOpacityRef}
				disabled={disabled}
				onPress={handleOpenModal}
				style={[
					styles.fieldContainer,
					{
						...(isModalVisible && {
							borderColor: COLOR.PRIMARY,
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
					onClickHandler={handleOpenModal}
				/>
				<Icon name={'expand-more'} size={24} />
			</TouchableOpacity>
			<Modal visible={isModalVisible} transparent animationType="fade">
				<Pressable onPress={handleCloseModal}>
					<View
						style={{
							width: '100%',
							height: '100%',
							alignItems: 'center',
						}}>
						<View
							style={[
								{
									width,
									position: 'absolute',
									zIndex: 10,
									top: dropdownTop,
									left: dropdownLeft,
									borderRadius: 8,
									backgroundColor: COLOR.WHITE,
									maxHeight: SCROLL_VIEW_MAX_HEIGHT,
									elevation: 4,
								},
							]}>
							<ScrollView showsVerticalScrollIndicator={false}>
								{list.map(l => (
									<ListValue
										key={l}
										onClickHandler={label => {
											handleCloseModal();
											if (onLabelClickHandler) {
												onLabelClickHandler(label);
											}
										}}
										label={l}
									/>
								))}
							</ScrollView>
						</View>
					</View>
				</Pressable>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	fieldContainer: {
		height: 48,
		flexDirection: 'row',
		borderRadius: 4,
		borderWidth: 1,
		borderColor: COLOR.GRAY_5,
		alignItems: 'center',
	},
});

export default Dropdown;

