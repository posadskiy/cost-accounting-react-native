import React from 'react';
import {
  View,
} from "react-native";
import CategoriesView from "./CategoriesView";
import {UserContext} from "../../login/Login";

const CategoriesScreen = (props) => {
  const {
    route: {
      name,
    } = {},
  } = props;

  const getCategoriesByType = (type, user) => {
    if ('PurchaseCategoriesScreen' === type) return user.purchaseCategories;
    if ('IncomeCategoriesScreen' === type) return user.incomeCategories;
  }

  return (
    <UserContext.Consumer>
      {
        user => {
          const categories = getCategoriesByType(name, user);
          return (
          <CategoriesView
            categories={categories}
          />
        )}
      }
    </UserContext.Consumer>
  )
};

export default CategoriesScreen;
