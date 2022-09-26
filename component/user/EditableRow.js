import React from 'react';

import {Pressable, Text, View} from "react-native";
import styles from "../../Styles";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const EditableRow = ({header, value, onPress}) => {
  console.log(header, value, onPress);
  return (
    <Pressable onPress={onPress} style={{display: "flex", flexDirection: "row", padding: 5}}>
      <Text style={[{flex: 1}, styles.headersText]}>{header}</Text>
      <View style={{flex: 1, display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
        <Text style={styles.generalTextRight}>{value}</Text>
        <FontAwesome5 style={{alignSelf: "center", paddingLeft: 5}} color="white" name="angle-right" size={25}/>
      </View>
    </Pressable>
  )
}

export default EditableRow;
