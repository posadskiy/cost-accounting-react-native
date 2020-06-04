import React from 'react';
import {
	Text,
	TextInput,
	View,
} from "react-native";
import styles from "../../Styles";

const Name = ({name, setName}) => {
	return (
		<View style={styles.sectionContainer}>
			<Text style={styles.headersText}>Name</Text>
			<TextInput
				style={styles.headersText}
				value={name}
				onChangeText={setName}
				placeholder="What is it?"
				placeholderTextColor="gray"
				returnKeyType="done"
			/>
		</View>
	)
};

export default Name;
