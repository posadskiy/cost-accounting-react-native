import React from 'react';
import styles from "../../../Styles";
import {ScrollView} from "react-native";
import CategoriesPasser from "./CategoriesPasser";

const CategoriesTypeScreen = ({ navigation }) => {
  
  const goToPurchaseCategories = () => navigation.navigate('PurchaseCategoriesScreen');
  const goToIncomeCategories = () => navigation.navigate('IncomeCategoriesScreen');

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}
    >
      <CategoriesPasser
        header="Purchase"
        onPress={goToPurchaseCategories}
      />
      <CategoriesPasser
        header="Income"
        onPress={goToIncomeCategories}
      />
    </ScrollView>
  )
};

export default CategoriesTypeScreen;
