import React, {useState} from 'react';
import {
	View,
} from "react-native";
import styles from "../../Styles";
import Category from "./Category";
import Name from "./Name";
import Amount from "./Amount";
import Flags from "./Flags";
import Buttons from "./Buttons";

/**
 * Category icons. Should be replaced to icons getting from back-end
 * @type {{}[]}
 */
const icons = [
	{
		id: 0,
		name: "Food",
		icon: "shopping_trolley",
	},
	{
		id: 1,
		name: "Cafe",
		icon: "knife_fork_plate",
	},
	{
		id: 2,
		name: "Office",
		icon: "department_store",
	},
	{
		id: 3,
		name: "Transport",
		icon: "bus",
	},
	{
		id: 4,
		name: "Fun",
		icon: "tada",
	},
	{
		id: 5,
		name: "Travel",
		icon: "earth_africa",
	},
	{
		id: 6,
		name: "Medicine",
		icon: "pill",
	},
	{
		id: 7,
		name: "Clothes",
		icon: "shopping_bags",
	},
	{
		id: 8,
		name: "Phone",
		icon: "telephone_receiver",
	},
	{
		id: 9,
		name: "Medicine",
		icon: "pill",
	},
	{
		id: 10,
		name: "Clothes",
		icon: "shopping_bags",
	},
	{
		id: 11,
		name: "Phone",
		icon: "telephone_receiver",
	},
];

const AddPurchase = () => {
	const [category, setCategory] = useState("");
	const [name, setName] = useState("");
	const [amount, setAmount] = useState("");
	const [isPrivate, setIsPrivate] = useState(false);

	return (
		<View style={styles.body}>
			<Category
				icons={icons}
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
			<Flags
				isPrivate={isPrivate}
				setIsPrivate={setIsPrivate}
			/>
			<Buttons />
		</View>
	)
};

export default AddPurchase;
