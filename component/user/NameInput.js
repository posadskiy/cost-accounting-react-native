import React from 'react';
import EditableRow from "./EditableRow";

const NameInput = (props) => {
  const {
    name,
    setName,
    showModal,
  } = props;

  const openNameModal = () => showModal(name, "User name", "Your name", setName);

  return (
    <EditableRow
      header="Name"
      value={name}
      setName={setName}
      onPress={openNameModal}
    />
  )
};

export default NameInput;
