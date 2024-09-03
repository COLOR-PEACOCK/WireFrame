import { COLOR } from '@styles/color';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const CrossHair = ({ extColor, parentlayout }) => {
	return (
		<View
			style={[
				styles.outerblackborder,
				{
					top: parentlayout.height / 2 - 23.5,
					left: parentlayout.width / 2 - 23.5,
				},
			]}>
			<View style={[styles.betweenbg, { borderColor: extColor.bgColor }]}>
				<View style={styles.outerwhiteborder}>
					<View
						style={[
							styles.innerblackborder,
							{ backgroundColor: extColor.bgColor },
						]}>
						<View style={styles.innerwhiteborder} />
					</View>
				</View>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	outerblackborder: {
		position: 'absolute',
		width: 47,
		height: 47,
		borderRadius: 50,
		borderWidth: 1,
		borderColor: COLOR.BLACK,
		justifyContent: 'center',
		alignItems: 'center',
	},
	betweenbg: {
		width: 46,
		height: 46,
		borderRadius: 50,
		borderWidth: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
	outerwhiteborder: {
		width: 33,
		height: 33,
		borderRadius: 50,
		borderWidth: 1,
		borderColor: COLOR.WHITE,
		justifyContent: 'center',
		alignItems: 'center',
	},
	innerblackborder: {
		borderWidth: 2,
		borderColor: COLOR.BLACK,
		width: 8,
		height: 8,
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	innerwhiteborder: {
		borderWidth: 1,
		borderColor: COLOR.WHITE,
		width: 8,
		height: 8,
		borderRadius: 50,
	},
});

export default CrossHair;
