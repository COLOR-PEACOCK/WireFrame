import React from 'react';
import {
	View,
	StyleSheet,
	TouchableWithoutFeedback,
	TouchableOpacity,
	Text,
} from 'react-native';
import MaleBodySvg from '@images/objectitems/bodyimages/male_body.svg';
import FeMaleBodySvg from '@images/objectitems/bodyimages/female__body.svg';
import { COLOR } from '@styles/color';

const ObjectCanvas = ({
	droppedItems,
	onItemDelete,
	onItemSelect,
	selectedItemId,
	gender,
}) => {
	return (
		<View style={styles.canvas}>
			{gender ? (
				<MaleBodySvg width={170} />
			) : (
				<FeMaleBodySvg width={180} />
			)}
			{droppedItems.map(item => {
				return (
					<View key={item.id}>
						<TouchableWithoutFeedback
							onPress={() => onItemSelect(item.id)}>
							<View
								style={[
									styles.droppedItem,
									{
										left: item.canvasX,
										top: item.canvasY,
										width: item.canvasWidth,
										height: item.canvasHeight,
										zIndex: item.zIndex,
										borderWidth: 1,
										borderColor:
											selectedItemId === item.id
												? '#CCD730'
												: 'transparent',
									},
								]}>
								{React.cloneElement(item.svg, {
									width: item.canvasWidth,
									height: item.canvasHeight,
									fill: item.color || '#FBFBFB',
								})}
							</View>
						</TouchableWithoutFeedback>
						{selectedItemId === item.id && (
							<TouchableOpacity
								style={styles.deleteButton}
								onPress={() => onItemDelete(item.id)}>
								<Text style={styles.deleteButtonText}>X</Text>
							</TouchableOpacity>
						)}
					</View>
				);
			})}
		</View>
	);
};
const styles = StyleSheet.create({
	canvas: {
		flex: 1,
		marginBottom: 98,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	droppedItem: {
		position: 'absolute',
		flex: 1,
		zIndex: 1000,
	},
	deleteButton: {
		position: 'absolute',
		top: -440,
		right: -170,
		backgroundColor: '#F3F7F8',
		borderRadius: 18,
		width: 30,
		height: 30,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1001,
	},
	deleteButtonText: {
		color: COLOR.PRIMARY,
		fontWeight: 'bold',
	},
});

export default ObjectCanvas;
