import React, {useContext, useCallback} from 'react';
import {Text, View, TouchableHighlight, Alert} from "react-native";
import styles from "../../Styles";
import {URL, url} from '../../common/URL';
import axios from "axios";
import {UserContext} from "../login/Login";

const Event = ({event}) => {
  const user = useContext(UserContext);
  const isIncome = event.category.isIncome;
  const amount = (isIncome ? "+" : "-") + event.amount.toFixed(2) + "$";
  const moneyActionTypeString = isIncome ? "income" : "purchase";

  const deleteEvent = useCallback(() => {
    const body = JSON.stringify({
      userId: user.id,
      purchaseId: event.id,
      incomeId: event.id,
    });

    axios.post(url(isIncome ? URL.INCOME.delete: URL.PURCHASE.delete), body, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then(response => alert("Deleted"))
      .catch(error => console.log(error));
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
        <View style={{flex: 2, display: "flex",flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
          alignSelf: "center"}}>
          <Text style={styles.eventEmoji}>{event.category.emoji}</Text>
        </View>
        <View style={{flex: 13, display: "flex", flexDirection: "column"}}>
          <Text style={styles.eventName}>{event.name}</Text>
          <Text style={styles.eventCategory}>{event.category.name}</Text>
        </View>
        <View style={{flex: 4}}>
          <Text style={isIncome ? styles.incomeTextRight : styles.purchaseTextRight}>{amount}</Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}

export default Event;
