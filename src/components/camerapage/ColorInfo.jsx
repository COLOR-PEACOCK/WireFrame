import { COLOR } from '@styles/color';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ColorInfo = ({ selectedColor }) => {
	return (
		<View style={{ flex: 0.53 }}>
			{selectedColor ? (
				<View style={styles.infowrapper}>
					<View
						style={{
							width: 74,
							height: 74,
							backgroundColor: selectedColor.rgb,
							marginLeft: 42,
						}}
					/>
					<View>
						<Text style={{ color: COLOR.GRAY_10, fontSize: 16 }}>
							연한 파랑
						</Text>
						<Text style={{ color: COLOR.GRAY_10, fontSize: 16 }}>
							Light Blue
						</Text>
						<Text style={{ color: COLOR.GRAY_8, fontSize: 14 }}>
							HEX:{selectedColor.hex}
						</Text>
					</View>
				</View>
			) : (
				<View
					style={[styles.infowrapper, { justifyContent: 'center' }]}>
					<Text
						style={{
							color: COLOR.GRAY_10,
							fontSize: 18,
							fontFamily: 'Pretendard-Bold',
						}}>
						선택하신 색상이 아직 없습니다.
					</Text>
				</View>
			)}
		</View>
	);
};
const styles = StyleSheet.create({
	infowrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		flex: 1,
	},
});

export default ColorInfo;
