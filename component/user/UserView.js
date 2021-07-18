import React, {useState} from 'react';
import DefaultCurrencyInput from "./DefaultCurrencyInput";
import Button from "../common/Button";
import NameInput from "./NameInput";
import {saveUser} from "../../actions/userActions";

const UserView = (props) => {
  const {
    user: {
      id,
      name,
      defaultCurrency,
    } = {},
    showModal,
  } = props;

  const [newDefaultCurrency, setNewDefaultCurrency] = useState(defaultCurrency);
  const [newName, setNewName] = useState(name);

  const updateUser = async () => {
    const body = {
      id,
      name: newName,
      defaultCurrency: newDefaultCurrency,
    }

    await saveUser(body);
  }

  return (
    <>
      <NameInput
        name={newName}
        setName={setNewName}
        showModal={showModal}
      />
      <DefaultCurrencyInput
        defaultCurrency={newDefaultCurrency}
        setDefaultCurrency={setNewDefaultCurrency}
        showModal={showModal}
      />
      <Button
        text="Save"
        onPress={updateUser}
        isEnabled={true}
      />
    </>
  )
};

export default UserView;
