import {Switch, Text, TextInput, View} from "react-native";
import styles from "../../Styles";
import React from "react";

const ProjectUser = ({projectUser, onSwitchPress, onTextChange}) => {
  return (
    <View key={projectUser.id} style={{display: "flex", flexDirection: "row"}}>
      <Text style={[{flex: 1}, styles.headersText]}>{projectUser.name}</Text>
      <TextInput
        style={[{flex: 1}, styles.headersText]}
        value={projectUser.amount}
        onChangeText={onTextChange}
        placeholder="How much?"
        placeholderTextColor="gray"
        keyboardType="decimal-pad"
        returnKeyType="done"
      />
      <Switch
        style={{flex: 1}}
        onValueChange={onSwitchPress}
        value={projectUser.isPicked}
      />
    </View>
  )
}

export default ProjectUser;
