import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import {saveUser} from "../../actions/userActions";
import styles from "../../Styles";
import {UserContext} from "../login/Login";
import EditableRow from "./EditableRow";
import Button from "../common/Button";
import EditableFieldModal from "../common/EditableFieldModal";

const User = () => {
  const user = useContext(UserContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [defaultCurrency, setDefaultCurrency] = useState(user.defaultCurrency);
  const [name, setName] = useState(user.name);
  const [modalText, setModalText] = useState();
  const [modalPlaceholder, setModalPlaceholder] = useState();
  const [modalHeader, setModalHeader] = useState();
  const [modalOnChangeText, setModalOnChangeText] = useState({});

  const openNameModal = () => showModal(name, "User name", "Your name", setName);
  const openDefaultCurrencyModal = () => showModal(defaultCurrency, "Default currency", "USD", setDefaultCurrency);

  const showModal = (text, header, placeholder, setText) => {
    setModalText(text);
    setModalHeader(header);
    setModalPlaceholder(placeholder);
    setModalOnChangeText({setText})
    setIsModalVisible(true);
  }
  
  const updateUser = async () => {
    const body = {
      id: user.id,
      name,
      defaultCurrency,
    }
    
    console.log(user);
    
    await saveUser(body);
  }
  
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}
    >
      <EditableFieldModal
        text={modalText}
        setText={setModalText}
        placeholder={modalPlaceholder}
        header={modalHeader}
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        onChangeText={modalOnChangeText}
      />
      <View style={styles.sectionContainer}>
        <EditableRow 
          header="Name"
          value={name}
          onPress={openNameModal}
        />
        <EditableRow
          header="Default currency"
          value={defaultCurrency}
          onPress={openDefaultCurrencyModal}
        />
        <Button
          text="Save"
          onPress={updateUser}
          isEnabled={true}
        />
      </View>
    </ScrollView>
  )
}

export default User;
