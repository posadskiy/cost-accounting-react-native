import React from 'react';
import {
  Text,
  TouchableHighlight,
} from "react-native";
import styles from "../../Styles";

const Buttons = ({onClick}) => {
	return (
    <TouchableHighlight onPress={onClick} style={{backgroundColor: "#3333dd", borderRadius: 20, marginLeft: 14, marginRight: 14, padding: 14}}>
      <Text style={styles.buttonTextCenter}>Save</Text>
    </TouchableHighlight>
	)
};

export default Buttons;
