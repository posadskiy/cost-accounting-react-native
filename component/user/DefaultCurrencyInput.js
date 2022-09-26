import React from 'react';
import EditableRow from "./EditableRow";

const DefaultCurrencyInput = (props) => {
  const {
    defaultCurrency,
    setDefaultCurrency,
    showModal,
  } = props;

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
