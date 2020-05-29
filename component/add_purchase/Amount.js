import React from 'react';
import {
	Text,
	TextInput,
	View,
} from "react-native";
import styles from "../../Styles";

const Amount = ({amount, setAmount}) => {
	return (
		<View style={styles.sectionContainer}>
			<Text>Amount</Text>
			<TextInput
				value={amount}
				onChangeText={setAmount}
				placeholder="How much?"
				keyboardType="numeric"
			/>
		</View>
	)
};

export default Amount;
