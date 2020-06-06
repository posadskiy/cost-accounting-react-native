import React from 'react';
import {
	View,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {
	NavigationContainer,
} from '@react-navigation/native'

const ColorTheme = {
	colors: {
		primary: 'rgb(255, 45, 85)',
		background: 'black',
		card: 'black',
		text: 'rgb(28, 28, 30)',
		border: 'rgb(199, 199, 204)',
	},
};

import Menu from "./component/menu/Menu";
import styles from "./Styles";

const App = () => {
  return (
    <>
	    <StatusBar barStyle="light-content"/>
      <View style={styles.body}>
	      <SafeAreaView style={{height: "100%"}}>
		      <NavigationContainer theme={ColorTheme}>
			      <Menu />
		      </NavigationContainer>
	      </SafeAreaView>
      </View>
    </>
  );
};

export default App;
