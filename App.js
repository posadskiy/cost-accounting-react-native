import React from 'react';
import {
	View,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import AddPurchase from "./component/add_purchase/AddPurchase";
import styles from "./Styles";

const App = () => {
  return (
    <>
	    <StatusBar barStyle="light-content"/>
      <View style={styles.body}>
	      <SafeAreaView style={{height: "100%"}}>
          <AddPurchase />
	      </SafeAreaView>
      </View>
    </>
  );
};

export default App;
