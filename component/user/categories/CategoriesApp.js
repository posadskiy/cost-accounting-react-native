import React from 'react';
import CategoriesTypeScreen from "./CategoriesTypeScreen";
import {createStackNavigator} from "@react-navigation/stack";
import CategoriesScreen from "./CategoriesScreen";

const Categories = createStackNavigator();

const CategoriesApp = () => {
  return (
    <Categories.Navigator>
      <Categories.Screen name="CategoriesTypeScreen" component={CategoriesTypeScreen} />
      <Categories.Screen name="PurchaseCategoriesScreen" component={CategoriesScreen} />
      <Categories.Screen name="IncomeCategoriesScreen" component={CategoriesScreen} />
    </Categories.Navigator>
  )
};

export default CategoriesApp;
