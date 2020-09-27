import React from 'react';
import {
  Text,
  TouchableHighlight,
} from "react-native";
import styles from "../../Styles";

const Buttons = ({onClick, isEnabled, status}) => {
  const save = "Save";
  const saving = "Saving...";
  const saved = "Saved successfully!";
  const error = "Error happened...";
  const fill = "Please, fill fields";

  const getText = () => {
    if (status === "SAVED_STATUS") return saved;
    if (!isEnabled) return fill;
    
    switch (status) {
      case "INIT_STATUS": return save;
      case "SAVING_STATUS": return saving;
      case "SAVED_STATUS": return saved;
      case "ERROR_STATUS": return error;
    }
  }
  
	return (
    <TouchableHighlight onPress={onClick} style={{backgroundColor: isEnabled ? "#34C758" : "gray", borderRadius: 20, marginLeft: 14, marginRight: 14, padding: 14}}>
      <Text style={styles.buttonTextCenter}>{getText()}</Text>
    </TouchableHighlight>
	)
};

export default Buttons;
