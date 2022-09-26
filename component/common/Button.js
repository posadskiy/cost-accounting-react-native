import React from 'react';
import {Text, TouchableHighlight,} from "react-native";
import styles from "../../Styles";

const Button = ({text, onPress, isEnabled}) => {
  return (
    <TouchableHighlight onPress={onPress} style={{
      backgroundColor: isEnabled ? "#34C758" : "gray",
      borderRadius: 20,
      marginLeft: 14,
      marginRight: 14,
      padding: 14
    }}>
      <Text style={styles.buttonTextCenter}>{text}</Text>
    </TouchableHighlight>
  )
};

export default Button;
