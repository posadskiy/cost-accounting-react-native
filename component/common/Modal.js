import React from 'react';
import Modal from 'react-native-modal';
import styles from "../../Styles";
import {Button, View} from "react-native";

const BlackModal = ({children, isModalVisible, onCloseModal, onApplyModal}) => {

  return (
    <Modal
      isVisible={isModalVisible}
      backdropColor="black"
      backdropOpacity={0.95}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}
    >
      <View style={styles.sectionContainer}>
        {children}
        <View style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
          <Button
            onPress={onCloseModal}
            title="Cancel"
            style={{flex: 1}}
          />
          <Button
            onPress={onApplyModal}
            title="Apply"
            style={{flex: 1}}
          />
        </View>
      </View>
    </Modal>
  );
}

export default BlackModal;
