import React, {useState, useEffect} from 'react';
import {
	View,
	Alert,
} from "react-native";
import axios from 'axios';
import styles from "../../Styles";
import Category from "./Category";
import Name from "./Name";
import Amount from "./Amount";
import Flags from "./Flags";
import Buttons from "./Buttons";

const AddPurchase = () => {
	const [category, setCategory] = useState("");
	const [name, setName] = useState("");
	const [amount, setAmount] = useState("");
	const [isPrivate, setIsPrivate] = useState(false);
	const [categories, setCategories] = useState([]);
	const [currencies, setCurrencies] = useState([]);
	const [currency, setCurrency] = useState("BYN");
	
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
	
	useEffect(() => receivePurchaseCategories(), [categories.length]);
	useEffect(() => receiveCurrencies(), [currencies.length]);

	return (
		<View style={styles.body}>
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
				onSave={sendPurchase}
			/>
		</View>
	)
};

export default AddPurchase;
