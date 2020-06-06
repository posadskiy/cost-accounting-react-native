import React, {useState} from 'react';
import styles from "../../Styles";
import {
	Button,
	Text,
	View
} from "react-native";
import {Picker} from "@react-native-community/picker";

const Currency = ({currency, setCurrency, currencies}) => {
	const [isShow, setIsShow] = useState(false);

	return (
		<View style={styles.sectionContainer}>
			<View style={{display: "flex", flexDirection: "row"}}>
				<Text style={[{alignSelf: "center"}, styles.headersText]}>Currency: {currency}</Text>
				<Button
					onPress={() => setIsShow(prevState => !prevState)}
					title={isShow ? "Done" : "Change"}
				/>
			</View>
			{isShow && (
				<Picker
					selectedValue={currency}
					style={[styles.headersText, {color: "white"}]}
					itemStyle={[styles.headersText, {color: "white"}]}
					onValueChange={setCurrency}
				>
					{
						currencies.map(currency => (
							<Picker.Item key={currency} label={currency} value={currency} />
						))
					}
				</Picker>
			)}
		</View>
	)
}

export default Currency;
