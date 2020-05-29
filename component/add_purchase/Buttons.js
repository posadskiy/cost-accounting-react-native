import React from 'react';
import {
	Button,
	View,
} from "react-native";
import styles from "../../Styles";

const Buttons = () => {
	return (
		<View style={styles.sectionContainer}>
			<View style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
				<Button
					title="Clear"
					style={{flex: 1}}
				/>
				<Button
					title="Save"
					style={{flex: 1}}
				/>
			</View>
		</View>
	)
};

export default Buttons;
