import React, {useState} from 'react';
import styles from "../../Styles";
import {Text, TouchableHighlight, View,} from "react-native";
import {Picker} from "@react-native-picker/picker";
import BlackModal from "../common/Modal";

const Currency = ({currency, setCurrency, currencies}) => {
  const [isShow, setIsShow] = useState(false);

  const onCloseModal = () => {
    setIsShow(false);
  }

  const onApplyModal = () => {
    setIsShow(false);
  }

  return (
    <TouchableHighlight onPress={() => setIsShow(true)} underlayColor="#333333" style={styles.sectionContainerRow}>
      <View style={{display: "flex", flexDirection: "row"}}>
        <Text style={[{alignSelf: "center"}, styles.headersText]}>{currency}</Text>
        {isShow && (
          <BlackModal
            isModalVisible={isShow}
            onCloseModal={onCloseModal}
            onApplyModal={onApplyModal}
          >
            <Picker
              selectedValue={currency}
              style={[styles.headersText, {color: "white"}]}
              itemStyle={[styles.headersText, {color: "white"}]}
              onValueChange={setCurrency}
            >
              {
                currencies.map(currency => (
                  <Picker.Item key={currency} label={currency} value={currency}/>
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
