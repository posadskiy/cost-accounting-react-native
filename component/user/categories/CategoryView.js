import React from 'react';
import {
  Alert,
  Text, TouchableHighlight,
  View,
} from "react-native";
import styles from "../../../Styles";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const CategoryView = (props) => {
  const {
    category: {
      id,
      name,
      emoji,
    } = {},
    navigate,
  } = props;
  
  return (
    <TouchableHighlight
      style={{paddingTop: 10, paddingBottom: 10}}
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={() => {
        navigate(props.category);
      }}
    >
      <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
        <Text style={styles.eventDate}>{name}</Text>
        {/*<FontAwesome5 style={{alignSelf: "center"}} color="yellow" name={emoji} size={25} />*/}
      </View>
    </TouchableHighlight>
  )
};

export default CategoryView;
