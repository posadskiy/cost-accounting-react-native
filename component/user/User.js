import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import styles from "../../Styles";
import {UserContext} from "../login/Login";
import EditableFieldModal from "../common/EditableFieldModal";
import UserView from "./UserView";

const User = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalText, setModalText] = useState();
  const [modalPlaceholder, setModalPlaceholder] = useState();
  const [modalHeader, setModalHeader] = useState();
  const [modalOnChangeText, setModalOnChangeText] = useState({});

  const showModal = (text, header, placeholder, setText) => {
    console.log(text, header, placeholder, setText)
    setModalText(text);
    setModalHeader(header);
    setModalPlaceholder(placeholder);
    setModalOnChangeText({setText})
    setIsModalVisible(true);
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
        <UserContext.Consumer>
          {user => (
            <UserView
              user={user}
              showModal={showModal}
            />
          )}
        </UserContext.Consumer>
      </View>
    </ScrollView>
  )
}

export default User;
