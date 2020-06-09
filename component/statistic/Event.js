import React from 'react';
import {Text, View, TouchableHighlight} from "react-native";
import styles from "../../Styles";

const Event = ({event}) => {
  const amount = (event.category.isIncome ? "+" : "-") + event.amount.toFixed(2);
  return (
    <TouchableHighlight
      style={{paddingTop: 10, paddingBottom: 10}}
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={() => alert('Pressed!')}
    >
      <View key={event.id || event.date} style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
        <View style={{flex: 1, display: "flex",flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
          alignSelf: "center"}}>
          <Text style={styles.eventEmoji}>{event.category.emoji}</Text>
        </View>
        <View style={{flex: 7, display: "flex", flexDirection: "column"}}>
          <Text style={styles.eventName}>{event.name}</Text>
          <Text style={styles.eventCategory}>{event.category.name}</Text>
        </View>
        <View style={{flex: 2}}>
          <Text style={styles.generalTextRight}>{amount}</Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}

export default Event;
