import React from 'react';
import {TextInput, View,} from "react-native";
import styles from "../../Styles";

const Name = ({name, setName}) => {
  return (
    <View style={styles.sectionContainerRow}>
      <TextInput
        style={[styles.headersText, {height: "100%", width: "100%"}]}
        value={name}
        onChangeText={setName}
        placeholder="Name"
        placeholderTextColor="gray"
        returnKeyType="done"
      />
    </View>
  )
};

export default Name;
