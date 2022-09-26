import React from 'react';
import {Text, TextInput, View,} from "react-native";
import BlackModal from "./Modal";
import styles from "../../Styles";

const EditableFieldModal = ({isVisible, setIsVisible, onChangeText, header, text, setText, placeholder = ""}) => {

  const onApplyModal = () => {
    setIsVisible(false);
  }
  const onCloseModal = () => {
    setIsVisible(false);
  }
  
  const onChangeTextEvent = (text) => {
    onChangeText.setText(text);
    setText(text);
  }

  return (
    <BlackModal
      isModalVisible={isVisible}
      onApplyModal={onApplyModal}
      onCloseModal={onCloseModal}
    >
      <View>
        <Text style={styles.headersText}>{header}</Text>
        <TextInput
          style={styles.headersText}
          value={text}
          onChangeText={onChangeTextEvent}
          placeholder={placeholder}
          placeholderTextColor="gray"
          returnKeyType="done"
        />
      </View>
    </BlackModal>
  )
};

export default EditableFieldModal;
