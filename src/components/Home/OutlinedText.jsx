import { StyleSheet, Text } from 'react-native';

const OutlinedText = ({ strokeColor, textColor, fontSize, text }) => {
	const weight = 1;
	const styles = StyleSheet.create({
		paragraph: {
			textShadowColor: strokeColor,
			color: textColor,
			fontSize: fontSize,
			fontFamily: 'Pretendard-bold',
			textShadowRadius: 1,
			textShadowOffset: {
				width: weight,
				height: weight,
			},
		},
		abs: {
			position: 'absolute',
		},
	});

	return (
		<>
			<Text style={styles.paragraph}>{text}</Text>
			<Text
				style={[
					styles.paragraph,
					styles.abs,
					{ textShadowOffset: { width: -weight, height: -weight } },
				]}>
				{text}
			</Text>
			<Text
				style={[
					styles.paragraph,
					styles.abs,
					{ textShadowOffset: { width: -weight, height: weight } },
				]}>
				{text}
			</Text>
			<Text
				style={[
					styles.paragraph,
					styles.abs,
					{ textShadowOffset: { width: weight, height: -weight } },
				]}>
				{text}
			</Text>
		</>
	);
};

export default OutlinedText;