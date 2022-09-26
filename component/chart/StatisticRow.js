import React from 'react';
import {Text, View,} from "react-native";
import styles from "../../Styles";

const StatisticRow = ({category}) => {
  const {
    category: {
      name,
    } = {},
    amount = 0,
    limit = 0
  } = category;

  const fixedAmount = amount.toFixed(0);
  const style = amount > limit && limit !== 0 ? styles.purchaseTextRight : styles.incomeTextRight;
  return (
    <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", padding: 5}}>
      <Text style={styles.eventCategory}>{name}</Text>
      <Text style={style}>{fixedAmount} / {limit} $</Text>
    </View>
  )
};

export default StatisticRow;
