import React from 'react';
import {
  View,
} from "react-native";
import CategoryView from "./CategoryView";

const CategoriesView = (props) => {
  const {
    categories = [],
  } = props;

  return (
    <>
      {
        categories.map(category => (
          <CategoryView
            key={category.id}
            category={category}
          />
        ))
      }
    </>
  )
};

export default CategoriesView;
