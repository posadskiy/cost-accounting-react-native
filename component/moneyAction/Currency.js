import React, {useState} from 'react';
import styles from "../../Styles";
import {
	Text,
	View,
  TouchableHighlight,
} from "react-native";
import {Picker} from "@react-native-community/picker";
import BlackModal from "../common/Modal";

const Currency = ({currency, setCurrency, currencies}) => {
	const [isShow, setIsShow] = useState(false);

	return (
		<TouchableHighlight onPress={() => setIsShow(true)} style={styles.sectionContainerRow}>
			<View style={{display: "flex", flexDirection: "row"}}>
				<Text style={[{alignSelf: "center"}, styles.headersText]}>{currency}</Text>
			{isShow && (
			  <BlackModal 
          isModalVisible={isShow}
          setIsModalVisible={setIsShow}
          onCloseModal={() => setIsShow(false)}>
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
        </BlackModal>
			)}
      </View>
		</TouchableHighlight>
	)
}

export default Currency;
