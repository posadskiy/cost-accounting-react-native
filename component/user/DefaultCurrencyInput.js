import React, {useState} from 'react';
import {
  View,
} from "react-native";
import EditableRow from "./EditableRow";

const DefaultCurrencyInput = (props) => {
  const {
    defaultCurrency,
    setDefaultCurrency,
    showModal,
  } = props;
  
  console.log(props);
  
  const openDefaultCurrencyModal = () => showModal(defaultCurrency, "Default currency", "USD", setDefaultCurrency);

  return (
    <EditableRow
      header="Default currency"
      value={defaultCurrency}
      onPress={openDefaultCurrencyModal}
    />
  )
};

export default DefaultCurrencyInput;
