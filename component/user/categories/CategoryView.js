import React from 'react';
import styles from "../../../Styles";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Swipeable from "react-native-swipeable";
import {Button, Text, TouchableHighlight, View} from "react-native";

const CategoryView = (props) => {
  const {
    category: {
      name,
      emoji,
    } = {},
    navigate,
  } = props;

  const rightButtons = [<TouchableHighlight><Text style={styles.generalText}>Button 1</Text></TouchableHighlight>];
  
  return (
    <Swipeable
      rightContent={
        rightButtons
      }
      style={{backgroundColor: 'black'}}
      containerStyle={{backgroundColor: 'black'}}
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={() => {
        navigate(props.category);
      }}
    >
      <View style={{display: "flex", flexDirection: "row"}}>
        <FontAwesome5 style={{alignSelf: "center"}} color="yellow" name={emoji} size={25} />
        <Text style={styles.generalText}>{name}</Text>
      </View>
    </Swipeable>
  )
};

export default CategoryView;
