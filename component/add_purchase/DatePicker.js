import {useState} from 'react';
import styles from "../../Styles";
import {
	Text,
	View,
	Button,
} from "react-native";
import React from "react";
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = ({date, setDate}) => {
	const [isShow, setIsShow] = useState(false);
	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setDate(currentDate);
	};

	return (
		<View style={styles.sectionContainer}>
			<View style={{display: "flex", flexDirection: "row"}}>
				<Text style={[{alignSelf: "center"}, styles.headersText]}>Date: {date.toLocaleDateString()}</Text>
				<Button
					onPress={() => setIsShow(prevState => !prevState)}
					title={isShow ? "Done" : "Change"}
				/>
			</View>
			{isShow && (
				<DateTimePicker
					testID="dateTimePicker"
					value={date}
					mode="date"
					is24Hour={true}
					display="default"
					onChange={onChange}
					textColor="white"
				/>
			)}
		</View>
	)
}

export default DatePicker;
