import React, {useState, useEffect} from 'react';
import {
	View,
	Alert,
	ScrollView,
	RefreshControl,
} from "react-native";
import axios from 'axios';
import styles from "../../Styles";
import Category from "./Category";
import Name from "./Name";
import Amount from "./Amount";
import Flags from "./Flags";
import Buttons from "./Buttons";

function wait(timeout) {
	return new Promise(resolve => {
		setTimeout(resolve, timeout);
	});
}

const AddPurchase = () => {
	const [category, setCategory] = useState("");
	const [name, setName] = useState("");
	const [amount, setAmount] = useState("");
	const [isPrivate, setIsPrivate] = useState(false);
	const [categories, setCategories] = useState([]);
	const [currencies, setCurrencies] = useState([]);
	const [currency, setCurrency] = useState("BYN");
	const [refreshing, setRefreshing] = useState(false);
	
	const clearData = () => {
		setCategory("");
		setName("");
		setAmount("");
		setCurrency("BYN");
		setIsPrivate(false);
	}

	const sendPurchase = () => {
		console.log("saving...")
		
		const body = {
			category: category.id,
			name,
			amount: amount.replace(",", "."),
			currency,
			isPrivate,
		}
		try {
			axios.post("http://cost-accounting.posadskiy.com/purchase/add/5d7d5a461c9d440000cf0883",
				JSON.stringify(body),
				{
					headers: {
						'Content-Type': 'application/json;charset=utf-8'
					}
				})
				.then(result => Alert.alert(
					"Saved!",
					"Thanks, your purchase successfully saved",
					[{
						text: "OK"
					}]
				))
				.catch(error => Alert.alert(
					"Oh, no...",
					"Error happens, please, call to developers",
					[{
						text: "OK"
					}]));
		} catch(e) {
			console.log(e);
		}
	}
	
	const receivePurchaseCategories = () => {
		axios.get("http://cost-accounting.posadskiy.com/category/allPurchases",
			{
				headers: {
					'Content-Type': 'application/json'
				},
			})
			.then(result => setCategories(result.data))
			.catch(error => console.error(error));
	}	
	
	const receiveCurrencies = () => {
		axios.get("http://cost-accounting.posadskiy.com/purchase/currencies",
			{
				headers: {
					'Content-Type': 'application/json'
				},
			})
			.then(result => setCurrencies(result.data))
			.catch(error => console.error(error));
	}

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);

		receivePurchaseCategories();
		receiveCurrencies();

		wait(2000).then(() => setRefreshing(false));
	}, [refreshing]);
	
	useEffect(() => receivePurchaseCategories(), [categories.length]);
	useEffect(() => receiveCurrencies(), [currencies.length]);

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
			<Category
				categories={categories}
				category={category}
				setCategory={setCategory}
			/>
			<Name
				name={name}
				setName={setName}
			/>
			<Amount
				amount={amount}
				setAmount={setAmount}
				currencies={currencies}
				currency={currency}
				setCurrency={setCurrency}
			/>
			<Flags
				isPrivate={isPrivate}
				setIsPrivate={setIsPrivate}
			/>
			<Buttons
				save={sendPurchase}
				clear={clearData}
			/>
		</ScrollView>
	)
};

export default AddPurchase;
