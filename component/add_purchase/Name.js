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
			<Text>Name</Text>
			<TextInput
				value={name}
				onChangeText={setName}
				placeholder="What is it?"
			/>
		</View>
	)
};

export default Name;
