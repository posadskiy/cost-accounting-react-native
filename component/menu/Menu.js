import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import AddPurchase from "../add_purchase/AddPurchase";
import AddIncome from "../add_income/AddIncome";
import Statistic from "../statistic/Statistic";
import Chart from "../chart/Chart";
import User from "../user/User";

const Tab = createBottomTabNavigator();

Icon.loadFont();
const Menu = () => {
	return (
		<Tab.Navigator
			style={{backgroundColor: "black", color: "gray"}}
			tabBarOptions={{
				activeTintColor: 'yellow',
				inactiveTintColor: 'gray',
			}}
		>
			<Tab.Screen
				style={{backgroundColor: "black", color: "gray"}}
				name="AddPurchase"
				component={AddPurchase}
				options={{
					tabBarLabel: 'Purchase',
					tabBarIcon: ({ color, size }) => (
						<Icon name="cart-plus" size={size} color={color} />
					),
				}}
			/>
			<Tab.Screen
				style={{backgroundColor: "black", color: "gray"}}
				name="AddIncome"
				component={AddIncome}
				options={{
					tabBarLabel: 'Income',
					tabBarIcon: ({ color, size }) => (
						<Icon name="money" size={size} color={color} />
					),
				}}
			/>
			<Tab.Screen
				style={{backgroundColor: "black", color: "gray"}}
				name="Statistic"
				component={Statistic}
				options={{
					tabBarLabel: 'Statistic',
					tabBarIcon: ({ color, size }) => (
						<Icon name="align-justify" size={size} color={color} />
					),
				}}
			/>
			<Tab.Screen
				name="Chart"
				component={Chart}
				options={{
					tabBarLabel: 'Chart',
					tabBarIcon: ({ color, size }) => (
						<Icon name="pie-chart" size={size} color={color} />
					),
				}}
			/>
			<Tab.Screen
				name="Me"
				component={User}
				options={{
					tabBarLabel: 'Me',
					tabBarIcon: ({ color, size }) => (
						<Icon name="user" size={size} color={color} />
					),
				}}
			/>
		</Tab.Navigator>
	)
}

export default Menu;
