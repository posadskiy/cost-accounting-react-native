import React from 'react';
import {View,} from "react-native";
import EditableRow from "../EditableRow";

const CategoryView = (props) => {
  const {
    category: {
      id,
      name,
      emoji,
      isPurchase,
      isIncome,
    } = {},
  } = props;

  console.log(name);

  return (
    <View>
      <EditableRow
        header="Name"
        value={name}
        onPress={() => {
        }}
      />
      <EditableRow
        header="Emoji"
        value={emoji}
        onPress={() => {
        }}
      />
      <EditableRow
        header="Purchase"
        value={isPurchase}
        onPress={() => {
        }}
      />
      <EditableRow
        header="Income"
        value={isIncome}
        onPress={() => {
        }}
      />
    </View>
  )
};

export default CategoryView;
