import {View} from "react-native";
import React from "react";

const GrayBlock = ({children}) => {
  return (
    <View style={{backgroundColor: "#333333", borderRadius: 20, marginLeft: 14, marginRight: 14, paddingLeft: 14, paddingRight: 14}}>
      {children}
    </View>
  )
}

export default GrayBlock;
