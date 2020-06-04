import React from 'react';
import {
	Button,
	View,
} from "react-native";
import styles from "../../Styles";

const Buttons = ({save, clear}) => {
	return (
		<View style={styles.sectionContainer}>
			<View style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
				<Button
					onPress={clear}
					title="Clear"
					style={{flex: 1}}
				/>
				<Button
					onPress={save}
					title="Save"
					style={{flex: 1}}
				/>
			</View>
		</View>
	)
};

export default Buttons;
