import React from 'react';
import {
  Text,
  View,
} from "react-native";
import styles from "../../../Styles";

const CategoryView = (props) => {
  const {
    category: {
      id,
      name,
      emoji,
    },
  } = props;
  return (
    <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
      <Text style={styles.eventName}>{name}</Text>
      <Text style={styles.eventName}>{emoji}</Text>
    </View>
  )
};

export default CategoryView;
