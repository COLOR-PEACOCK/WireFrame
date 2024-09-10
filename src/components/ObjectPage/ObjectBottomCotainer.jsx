import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';
import { COLOR } from '@styles/color';

const ObjectBottomCotainer = ({ setDroppedItems, gender, setGender }) => {
	const [activeTab, setActiveTab] = useState('');
	const [itemData, setItemData] = useState(null);

	//성별 데이터 분기 처리
	useEffect(() => {
		const loadItemData = async () => {
			if (gender) {
				const maleData = await import(
					//절대경로 추가해야 됨
					'../../assets/data/objectdata/maleItemData.js'
				);
				setItemData(maleData.default);
			} else {
				const femaleData = await import(
					'../../assets/data/objectdata/femaleItemData.js'
				);
				setItemData(femaleData.default);
			}
		};
		loadItemData();
	}, [gender]);

	// 탭 데이터
	const tabs = [
		{ key: 'clothesTop', title: '상의' },
		{ key: 'clothesBottom', title: '하의' },
		{ key: 'shoes', title: '신발' },
		{ key: 'caps', title: '모자' },
	];

	// 탭 버튼 이벤트
	const buttonEvent = ({ item }) => {
		setActiveTab(item.key);
		console.log(item.key);
	};

	//아이템 플랫 리스트 렌더
	const renderItem = ({ item }) => {
		return (
			<TouchableOpacity
				onPress={() => handleItemSelect(item)}
				style={styles.touchableItem}>
				{item.svg}
			</TouchableOpacity>
		);
	};

	//아이템 선택 이벤트
	const handleItemSelect = item => {
		setDroppedItems(prevItems => {
			//수정 가능한 동적 아이템 생성
			const newItem = {
				...item,
				svg: React.cloneElement(item.svg),
			};

			// 같은 카테고리의 아이템 인덱스 찾기
			const sameCategoryItemIndex = prevItems.findIndex(
				i => i.category === item.category,
			);

			if (sameCategoryItemIndex !== -1) {
				// 같은 카테고리의 아이템이 있으면 교체
				return prevItems.map((prevItem, index) =>
					index === sameCategoryItemIndex ? newItem : prevItem,
				);
			} else {
				// 새로운 카테고리의 아이템이면 추가
				return [...prevItems, newItem];
			}
		});
	};

	return (
		<View style={styles.bottomContainer}>
			<View style={styles.categoryBar}>
				<Text style={styles.barkorname}>분류항목</Text>
				<Text style={styles.barengname}>CATEGORY</Text>
			</View>
			{activeTab ? (
				<View style={{ flexDirection: 'row', flex: 1 }}>
					<TouchableOpacity
						onPress={() => setActiveTab('')}
						style={{
							width: 64,
							backgroundColor: 'green',
						}}>
						<Text>뒤로가기</Text>
					</TouchableOpacity>
					<FlatList
						data={itemData[activeTab] || []}
						renderItem={renderItem}
						horizontal={true}
						keyExtractor={item => item.id}
						contentContainerStyle={styles.flatListContent}
						showsHorizontalScrollIndicator={false}
					/>
				</View>
			) : (
				<View
					style={{
						flex: 1,
						flexDirection: 'row',
					}}>
					<TouchableOpacity
						onPress={() => setGender(Gender => !Gender)}
						style={{
							width: 64,
						}}>
						<Text>성별 변경</Text>
					</TouchableOpacity>

					<View style={styles.buttonContainer}>
						{tabs.map(item => (
							<TouchableOpacity
								key={item.key}
								style={styles.tabItem}
								onPress={() => buttonEvent({ item })}>
								<Text style={styles.itemText}>
									{item.title}
								</Text>
							</TouchableOpacity>
						))}
					</View>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	bottomContainer: {
		flex: 1,
		backgroundColor: 'blue',
	},
	categoryBar: {
		height: 29,
		backgroundColor: '#873EF1',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		gap: 6,
	},
	barkorname: {
		color: COLOR.GRAY_1,
		fontFamily: 'Pretendard-Medium',
		fontSize: 14,
	},
	barengname: {
		color: COLOR.WHITE,
		fontFamily: 'Pretendard-Light',
		fontSize: 12,
	},
	flatList: {},
	flatListContent: {
		alignItems: 'center',
		paddingHorizontal: 10,
	},
	buttonContainer: { flexDirection: 'row', flexWrap: 'wrap' },
	tabItem: {
		width: 173,
		height: 77,
		borderWidth: 1,
		borderColor: COLOR.GRAY_6,
	},
	touchableItem: {
		width: 100,
		height: 100,
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 5,
	},
});
export default ObjectBottomCotainer;
