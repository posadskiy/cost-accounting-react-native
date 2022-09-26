import React from 'react';
import {ScrollView, View,} from "react-native";
import CategoryView from "./CategoryView";
import styles from "../../../Styles";

const CategoryScreen = (props) => {
  const {
    route: {
      params: {
        category = {}
      } = {},
    } = {},
  } = props;

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}
    >
      <View style={styles.sectionContainer}>
        <CategoryView
          category={category}
        />
      </View>
    </ScrollView>
  )
}

export default CategoryScreen;
