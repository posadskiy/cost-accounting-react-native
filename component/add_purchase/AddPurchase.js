import React, {useState, useEffect, useContext} from 'react';
import {
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
import DatePicker from "./DatePicker";
import Currency from "./Currency";

import {URL, url} from '../../common/URL';
import {UserContext} from "../login/Login";

function wait(timeout) {
	return new Promise(resolve => {
		setTimeout(resolve, timeout);
	});
}

const AddPurchase = () => {
	const [category, setCategory] = useState("");
	const [name, setName] = useState("");
	const [amount, setAmount] = useState("");
	const [date, setDate] = useState(new Date());
	const [isPrivate, setIsPrivate] = useState(false);
	const [categories, setCategories] = useState([]);
	const [currencies, setCurrencies] = useState([]);
	const [currency, setCurrency] = useState("BYN");
	const [refreshing, setRefreshing] = useState(false);
  const user = useContext(UserContext);
	
	const clearData = () => {
		setCategory("");
		setName("");
		setAmount("");
		setCurrency("BYN");
		setDate(new Date());
		setIsPrivate(false);
	}
	
	const validate = () => {
		const result = [
			validateCategory(),
			validateName(),
			validateAmount(),
			validateDate(),
		];
		
		return result.find(value => !value) !== false;
	}
	
	const validateCategory = () => {
		return !!category;
	}
	
	const validateName = () => {
		return !!name;
	}
	
	const validateAmount = () => {
		return !!amount;
	}
	
	const validateDate = () => {
		return !!date;
	}

	const sendPurchase = () => {
		const isValidated = validate();
		if (!isValidated) {
			Alert.alert(
				"That's problem...",
				"Please, fill all field. Thank you!",
				[{
					text: "Got it!"
				}]
			);
			return;
		}
		console.log("saving...")
		
		const body = JSON.stringify({
		  userId: user.id,
		  purchase: {
        category: category.id,
        name,
        amount: amount.replace(",", "."),
        currency,
        date,
        isPrivate,
      },
		});

    axios.post(url(URL.PURCHASE.add),
      body,
      {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      })
      .then(result => {
        Alert.alert(
            "Saved!",
            "Thanks, your purchase successfully saved",
            [{
              text: "OK"
            }]
          );
        clearData();
        }
      )
      .catch(error => Alert.alert(
        "Oh, no...",
        "Error happens, please, call to developers",
        [{
          text: "OK"
        }]));
	}
	
	const receivePurchaseCategories = () => {
	  const body = JSON.stringify({
	    userId: user.id,
    });

		axios.post(url(URL.PURCHASE.categories), body,
			{
				headers: {
					'Content-Type': 'application/json'
				},
			})
			.then(result => setCategories(result.data))
			.catch(error => console.error(error));
	}	
	
	const receiveCurrencies = () => {
		axios.get(url(URL.CURRENCIES.all),
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
			/>
			<Currency
				currencies={currencies}
				currency={currency}
				setCurrency={setCurrency}
			/>
			<DatePicker
				date={date}
				setDate={setDate}
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
