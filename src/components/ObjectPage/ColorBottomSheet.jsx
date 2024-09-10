import React, { useRef } from 'react';
import {
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

const colorContainer = require('@images/objectitems/background/cricle__wrapper.png');

const ColorBottomSheet = ({ onColorSelect }) => {
	const bottomSheetRef = useRef(null);

	const colors = ['#576490', '#A52A2A', '#D8BFD8', '#FBFBFB', '#3F3A3A'];

	const handleColorSelect = color => {
		onColorSelect(color);
		console.log(color);
	};

	return (
		<GestureHandlerRootView
			style={{
				position: 'absolute',
				height: 88,
				width: '100%',
				zIndex: 1000,
			}}>
			<BottomSheet
				ref={bottomSheetRef}
				snapPoints={[25, 140]}
				// handleComponent={CustomHandle}
				backgroundComponent={null}>
				<ImageBackground
					source={colorContainer}
					style={{
						flex: 1,
					}}>
					<View style={styles.colorContainer}>
						{colors.map((color, index) => (
							<TouchableOpacity
								key={index}
								style={[
									styles.colorBox,
									{ backgroundColor: color },
								]}
								onPress={() => handleColorSelect(color)}
							/>
						))}
					</View>
				</ImageBackground>
			</BottomSheet>
		</GestureHandlerRootView>
	);
};

const styles = StyleSheet.create({
	colorContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		paddingTop: 20,
	},
	colorBox: {
		width: 60,
		height: 24,
		borderRadius: 4,
	},
});
export default ColorBottomSheet;
