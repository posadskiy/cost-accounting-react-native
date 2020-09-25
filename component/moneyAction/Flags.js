import React from 'react';
import {
	Switch,
	Text,
	View,
} from "react-native";
import styles from "../../Styles";

const Flags = ({isPrivate, setIsPrivate, isSplit, onPressSplit, pickedProjectUsers}) => {
  const isPrivateImplemented = false;

	return (
		<View style={[styles.sectionContainerRow, {flexDirection: "row"}]}>
      <View style={{flex: 1, display: "flex", flexDirection: "row", justifyContent: "space-between", height: "100%", alignItems: "center"}}>
        <Text style={styles.headersText}>Split</Text>
        {isSplit && (<Text style={styles.smallText}>{pickedProjectUsers}</Text>)}
        <Switch
          onValueChange={onPressSplit}
          value={isSplit}
        />
      </View>
      {
        isPrivateImplemented && (
          <View style={{flex: 1}}>
            <Text style={styles.headersText}>Private</Text>
            <Switch
              onValueChange={setIsPrivate}
              value={isPrivate}
            />
          </View>
        )
      }
		</View>
	)
};

export default Flags;
