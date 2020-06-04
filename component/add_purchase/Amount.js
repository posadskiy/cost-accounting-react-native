import React from 'react';
import {
	Text,
	TextInput,
	View,
} from "react-native";
import {Picker} from '@react-native-community/picker';
import styles from "../../Styles";

const Amount = ({amount, setAmount, currencies, currency, setCurrency}) => {
	return (
		<View style={styles.sectionContainer}>
			<Text style={styles.headersText}>Amount</Text>
			<TextInput
				style={styles.headersText}
				value={amount}
				onChangeText={setAmount}
				placeholder="How much?"
				placeholderTextColor="gray"
				keyboardType="decimal-pad"
				returnKeyType="done"
			/>
			<Picker
				selectedValue={currency || "BYN"}
				style={[styles.headersText, {color: "white"}]}
				itemStyle={[styles.headersText, {color: "white"}]}
				onValueChange={(itemValue, itemIndex) => setCurrency(itemValue)}
			>
				{
					currencies.map(currency => (
						<Picker.Item key={currency} label={currency} value={currency} />
					))
				}
			</Picker>
		</View>
	)
};

export default Amount;
