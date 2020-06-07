import React, {useState, useEffect} from 'react'

import {
	RefreshControl, ScrollView,
	View,
	Text,
} from 'react-native';
import styles from "../../Styles";
import axios from "axios";
import {URL, url} from "../../common/URL";

function wait(timeout) {
	return new Promise(resolve => {
		setTimeout(resolve, timeout);
	});
}

const dateToDateMonth = (date) => {
	const isoDate = new Date(date);
	const isoDateDate = isoDate.getDate();
	const twoDigitsDate = isoDateDate >= 10 ? isoDateDate : "0" + isoDateDate;

	const isoMonth = isoDate.getMonth() + 1;
	const twoDigitsMonth = isoMonth >= 10 ? isoMonth : "0" + isoMonth;

	return  twoDigitsDate + "." + twoDigitsMonth;
}

const Statistic = () => {
	const [refreshing, setRefreshing] = useState(false);
	const [purchases, setPurchases] = useState([]);
	const [incomes, setIncomes] = useState([]);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);

		receiveLastPurchases();
		receiveLastIncomes();

		wait(2000).then(() => setRefreshing(false));
	}, [refreshing]);


	const receiveLastPurchases = () => {
		axios.get(url(URL.getLastPurchases("5d7d5a461c9d440000cf0883")),
			{
				headers: {
					'Content-Type': 'application/json'
				},
			})
			.then(result => setPurchases(result.data))
			.catch(error => console.error(error));
	}
	const receiveLastIncomes = () => {
		axios.get(url(URL.getLastIncomes("5d7d5a461c9d440000cf0883")),
			{
				headers: {
					'Content-Type': 'application/json'
				},
			})
			.then(result => setIncomes(result.data))
			.catch(error => console.error(error));
	}

	useEffect(() => receiveLastPurchases(), [purchases.length]);
	useEffect(() => receiveLastIncomes(), [incomes.length]);

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
			<View style={styles.sectionContainer}>
				<Text style={styles.headersText}>Purchases</Text>
				{
					purchases.map(purchase => (
						<View key={purchase.id} style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
							<Text style={[{flex: 2}, styles.generalText]}>{purchase.category.name}</Text>
							<Text style={[{flex: 2}, styles.generalText]}>{purchase.name}</Text>
							<Text style={[{flex: 1}, styles.generalText]}>{purchase.amount.toFixed(2)}</Text>
							<Text style={[{flex: 1}, styles.generalText]}>{dateToDateMonth(purchase.date)}</Text>
						</View>
					))
				}
			</View>
			<View style={styles.sectionContainer}>
				<Text style={styles.headersText}>Incomes</Text>
				{
					incomes.map(incomes => {
						
						return (
							<View key={incomes.id} style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
								<Text style={[{flex: 2}, styles.generalText]}>{incomes.category && incomes.category.name}</Text>
								<Text style={[{flex: 2}, styles.generalText]}>{incomes.name || ""}</Text>
								<Text style={[{flex: 1}, styles.generalText]}>{incomes.amount.toFixed(2)}</Text>
								<Text style={[{flex: 1}, styles.generalText]}>{dateToDateMonth(incomes.date)}</Text>
							</View>
						)
					})
				}
			</View>
		</ScrollView>
	)
}

export default Statistic;
