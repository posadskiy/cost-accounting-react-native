import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Statistic from "../statistic/Statistic";
import Chart from "../chart/Chart";
import UserScreen from "../user/UserScreen";
import AddPurchase from "../moneyAction/AddPurchase";
import AddIncome from "../moneyAction/AddIncome";
import UserApp from "../user/UserApp";

const Tab = createBottomTabNavigator();

FontAwesome5.getStyledIconSet('brand').loadFont();
FontAwesome5.getStyledIconSet('light').loadFont();
FontAwesome5.getStyledIconSet('regular').loadFont();
FontAwesome5.getStyledIconSet('solid').loadFont();
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
						<FontAwesome5 name="cart-plus" size={size} color={color} />
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
						<FontAwesome5 name="money-bill-wave" size={size} color={color} />
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
						<FontAwesome5 name="align-justify" size={size} color={color} />
					),
				}}
			/>
			<Tab.Screen
				name="Chart"
				component={Chart}
				options={{
					tabBarLabel: 'Chart',
					tabBarIcon: ({ color, size }) => (
						<FontAwesome5 name="chart-pie" size={size} color={color} />
					),
				}}
			/>
			<Tab.Screen
        style={{backgroundColor: "black", color: "white"}}
				name="Me"
				component={UserApp}
				options={{
					tabBarLabel: 'Me',
					tabBarIcon: ({ color, size }) => (
						<FontAwesome5 name="user" size={size} color={color} />
					),
				}}
			/>
		</Tab.Navigator>
	)
}

export default Menu;
