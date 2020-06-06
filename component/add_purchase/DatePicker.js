import styles from "../../Styles";
import {Text, View} from "react-native";
import React from "react";
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = ({date, setDate}) => {
	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setDate(currentDate);
	};

	return (
		<View style={styles.sectionContainer}>
			<Text style={styles.headersText}>Date</Text>
			<DateTimePicker
				testID="dateTimePicker"
				value={date}
				mode="date"
				is24Hour={true}
				display="default"
				onChange={onChange}
				textColor="white"
			/>
		</View>
	)
}

export default DatePicker;
