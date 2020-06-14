import React, {useContext, useCallback} from 'react';
import {Text, View, TouchableHighlight, Alert} from "react-native";
import styles from "../../Styles";
import {URL, url} from '../../common/URL';
import axios from "axios";
import {UserContext} from "../login/Login";

const Event = ({event}) => {
  const user = useContext(UserContext);
  const isIncome = event.category.isIncome;
  const amount = (isIncome ? "+" : "-") + event.amount.toFixed(2);
  const moneyActionTypeString = isIncome ? "income" : "purchase";

  const deleteEvent = useCallback(() => {
    axios.get(url(isIncome ? URL.deleteIncome(user.id, event.id) : URL.deletePurchase(user.id, event.id)), {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then(response => {})
      .catch(error => {});
  }, [event]);

  return (
    <TouchableHighlight
      style={{paddingTop: 10, paddingBottom: 10}}
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={() => Alert.alert(
        'Deleting money action',
        'Do you confirm deleting ' + moneyActionTypeString + ' ' + event.name,
        [
          {
            text: "Cancel",
            style: 'cancel',
          },
          {
            text: "Delete",
            onPress: deleteEvent,
          }
        ]
      )}
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