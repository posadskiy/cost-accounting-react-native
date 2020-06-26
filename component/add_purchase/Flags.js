import React from 'react';
import {
	Switch,
	Text,
	View,
} from "react-native";
import styles from "../../Styles";

const Flags = ({isPrivate, setIsPrivate, isSplit, onPressSplit}) => {
  const isPrivateImplemented = false;
	return (
		<View style={[styles.sectionContainer, {flexDirection: "row"}]}>
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
      <View style={{flex: 1}}>
			<Text style={styles.headersText}>Split</Text>
			<Switch
				onValueChange={onPressSplit}
				value={isSplit}
			/>
      </View>
		</View>
	)
};

export default Flags;
