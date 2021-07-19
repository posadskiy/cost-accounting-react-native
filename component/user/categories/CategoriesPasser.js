import React from 'react';
import {
  View,
} from "react-native";
import EditableRow from "../EditableRow";

const CategoriesPasser = (props) => {
  const {
    onPress,
    header,
  } = props;

  return (
    <EditableRow
      header={header}
      onPress={onPress}
    />
  )
};

export default CategoriesPasser;
