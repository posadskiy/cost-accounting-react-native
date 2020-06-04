import React from 'react';
import {
	Switch,
	Text,
	View,
} from "react-native";
import styles from "../../Styles";

const Flags = ({isPrivate, setIsPrivate}) => {
	return (
		<View style={styles.sectionContainer}>
			<Text style={styles.headersText}>Private</Text>
			<Switch
				onValueChange={setIsPrivate}
				value={isPrivate}
			/>
		</View>
	)
};

export default Flags;
