import React, {useState} from 'react'

import {
	RefreshControl, ScrollView,
	View,
	Text,
} from 'react-native';
import styles from "../../Styles";

const purchases = [
	{
		id: 1,
		category: {
			name: "Food",
			emoji: "",
		},
		name: "Korona",
		amount: 23,
		date: new Date(2020, 3, 15),
	},
	{
		id: 2,
		category: {
			name: "Taxi",
			emoji: "",
		},
		name: "Yandex",
		amount: 11,
		date: new Date(2020, 5, 12),
	},
	{
		id: 3,
		category: {
			name: "Cafe",
			emoji: "",
		},
		name: "Bun B",
		amount: 16,
		date: new Date(2020, 4, 11),
	},
];

function wait(timeout) {
	return new Promise(resolve => {
		setTimeout(resolve, timeout);
	});
}

const Statistic = () => {
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		

		wait(2000).then(() => setRefreshing(false));
	}, [refreshing]);

	return (
		<ScrollView
			contentInsetAdjustmentBehavior="automatic"
			style={styles.scrollView}
			refreshControl={
				<RefreshControl
					refreshing={refreshing}
					onRefresh={onRefresh}
					titleColor="white"
					title="Refreshing categories and currencies..."
				/>
			}
		>
			{
				purchases.map(purchase => (
					<View key={purchase.id} style={[{display: "flex", flexDirection: "row", justifyContent: "space-between"}, styles.headersText]}>
						<Text style={styles.headersText}>{purchase.category.name}</Text>
						<Text style={styles.headersText}>{purchase.name}</Text>
						<Text style={styles.headersText}>{purchase.amount}</Text>
						<Text style={styles.headersText}>{purchase.date.toLocaleDateString()}</Text>
					</View>
				))
			}
		</ScrollView>
	)
}

export default Statistic;
