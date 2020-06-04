import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';

import styles from './Styles';
import AddPurchase from "./component/add_purchase/AddPurchase";

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{height: "100%"}}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <AddPurchase />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;
