import React from 'react';
import {
	Text,
	TextInput,
	View,
} from "react-native";
import styles from "../../Styles";

const Amount = ({amount, setAmount}) => {
	return (
		<View style={styles.sectionContainerRow}>
			<TextInput
				style={[styles.headersText, {height: "100%", width: "100%"}]}
				value={amount}
				onChangeText={setAmount}
				placeholder="How much?"
				placeholderTextColor="gray"
				keyboardType="decimal-pad"
				returnKeyType="done"
			/>
		</View>
	)
};

export default Amount;
