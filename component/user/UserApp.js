import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UserScreen from "./UserScreen";
import CategoriesApp from "./categories/CategoriesApp";

const User = createStackNavigator();

const UserApp = () => {
  return (
    <User.Navigator>
      <User.Screen name="UserScreen" component={UserScreen}/>
      <User.Screen name="CategoriesScreen" component={CategoriesApp} options={{headerShown: false}}/>
    </User.Navigator>
  )
};

export default UserApp;
