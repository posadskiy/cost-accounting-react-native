import React from 'react';
import {
  FlatList,
  View,
} from "react-native";
import CategoryView from "./CategoryView";

const CategoriesView = (props) => {
  const {
    categories = [],
    navigate,
  } = props;
  
  const keyExtractor = (item, index) => item.id;
  
  const renderItem = ({ item }) => (
    <CategoryView
      category={item}
      navigate={navigate}
      />
  )

  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={categories}
      renderItem={renderItem}
    />
  )
};

export default CategoriesView;
