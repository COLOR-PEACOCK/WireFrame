import { COLOR } from '@styles/color';
import { View } from 'react-native';

const Indicator = ({ currentIndex, length }) => {
	return (
		<View style={{ flexDirection: 'row', gap: 8 }}>
			{Array.from(Array(length)).map((_, index) => (
				<View
					key={index}
					style={{
						width: currentIndex === index ? 20 : 8,
						height: 8,
						borderRadius: 100,
						backgroundColor:
							currentIndex === index
								? COLOR.PRIMARY
								: COLOR.PRIMARY + 50,
					}}
				/>
			))}
		</View>
	);
};

export default Indicator;
