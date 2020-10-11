import React, {useState} from 'react';
import styles from "../../Styles";
import {
	Text,
	View,
  TouchableHighlight,
  Platform,
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import BlackModal from "../common/Modal";

const DatePicker = ({date, setDate}) => {
	const [isShow, setIsShow] = useState(false);
	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setDate(currentDate);
	};
	
	const onDateClick = () => {
    setIsShow(prevState => !prevState);
  }

	return (
		<TouchableHighlight onPress={onDateClick} underlayColor="#333333" style={styles.sectionContainerRow}>
			<View style={{display: "flex", flexDirection: "row"}}>
				<Text style={[{alignSelf: "center"}, styles.headersText]}>{date.toLocaleDateString()}</Text>
			{isShow && (
			  <BlackModal
          isModalVisible={isShow}
          setIsModalVisible={setIsShow}
          onCloseModal={() => setIsShow(false)}
        >
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="inline"
            onChange={onChange}
            {...(Platform.OS === 'ios' && parseFloat(Platform.Version) >= 14
              ? null
              : { textColor: "white" })} // on ios 14+ causes crash
          />
				</BlackModal>
			)}
      </View>
		</TouchableHighlight>
	)
}

export default DatePicker;
