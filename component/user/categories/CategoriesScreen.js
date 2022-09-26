import React from 'react';
import CategoriesView from "./CategoriesView";
import {UserContext} from "../../login/Login";

const CategoriesScreen = (props) => {
  const {
    route: {
      name,
    } = {},
    navigation,
  } = props;

  const navigateOnCategoryView = (category) => {
    navigation.navigate('CategoryScreen', {category});
  }

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
              navigate={navigateOnCategoryView}
            />
          )
        }
      }
    </UserContext.Consumer>
  )
};

export default CategoriesScreen;
