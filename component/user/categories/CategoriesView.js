import React from 'react';
import {FlatList,} from "react-native";
import CategoryView from "./CategoryView";

const CategoriesView = (props) => {
  const {
    categories = [],
    navigate,
  } = props;

  const keyExtractor = (item) => item.id;

  const renderItem = ({item}) => (
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
