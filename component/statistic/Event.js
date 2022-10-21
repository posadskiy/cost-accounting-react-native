import React, {useContext} from 'react';
import {Alert, Text, TouchableHighlight, View} from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from "../../Styles";
import {UserContext} from "../login/Login";
import useDeletePurchaseCallback from "./hook/useDeletePurchaseCallback";
import useDeleteIncomeCallback from "./hook/useDeleteIncomeCallback";

const Event = ({event}) => {
  const user = useContext(UserContext);
  const isIncome = event.category.isIncome;
  const amount = (isIncome ? "+" : "-") + event.amount.toFixed(2) + "$";
  const moneyActionTypeString = isIncome ? "income" : "purchase";

  const deleteCallback = isIncome ? 
    useDeleteIncomeCallback(user.id, event.id) : 
    useDeletePurchaseCallback(user.id, event.id);

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
            onPress: deleteCallback,
          }
        ]
      )}
    >
      <View key={event.id || event.date} style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
      }}>
        <View style={{
          flex: 2,
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
          alignSelf: "center"
        }}>
          <FontAwesome5 style={{alignSelf: "center"}} color="yellow" name={event.category.emoji} size={25}/>
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
