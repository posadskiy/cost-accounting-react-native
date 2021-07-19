import React from 'react';
import EditableRow from "./EditableRow";

const Categories = ({ navigation, onPress }) => {
  return (
    <EditableRow
      header="Categories"
      onPress={onPress}
    />
  )
};

export default Categories;
