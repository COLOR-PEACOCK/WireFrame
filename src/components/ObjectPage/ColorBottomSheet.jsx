import React, { useRef } from 'react';
import {
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const colorContainer = require('@images/objectitems/background/cricle__wrapper.png');

const ColorBottomSheet = ({
	// colors,
	onColorSelect,
}) => {
	const bottomSheetRef = useRef(null);

	const colors = ['#576490', '#A52A2A', '#D8BFD8', '#FBFBFB', '#3F3A3A'];

	const handleColorSelect = color => {
		onColorSelect(color);
		console.log(color);
	};

	return (
		<View style={styles.colorContainer}>
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
					<View style={styles.colorWrapper}>
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
		</View>
	);
};

const styles = StyleSheet.create({
	colorContainer: {
		position: 'absolute',
		height: 88,
		width: '100%',
		zIndex: 1000,
	},
	colorWrapper: {
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
