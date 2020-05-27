import React, {useState} from 'react';
import nodeEmoji from 'node-emoji';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
	Button,
	TextInput,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

/**
 * Category icons. Should be replaced to icons getting from back-end
 * @type {{}[]}
 */
const icons = [
	{
		id: 0,
		name: "Food",
		icon: "shopping_trolley",
	},
	{
		id: 1,
		name: "Cafe",
		icon: "knife_fork_plate",
	},
	{
		id: 2,
		name: "Office",
		icon: "department_store",
	},
	{
		id: 3,
		name: "Transport",
		icon: "bus",
	},
	{
		id: 4,
		name: "Fun",
		icon: "tada",
	},
	{
		id: 5,
		name: "Travel",
		icon: "earth_africa",
	},
	{
		id: 6,
		name: "Medicine",
		icon: "pill",
	},
	{
		id: 7,
		name: "Clothes",
		icon: "shopping_bags",
	},
	{
		id: 8,
		name: "Phone",
		icon: "telephone_receiver",
	},
];

const App: () => React$Node = () => {
	const [
		category, setCategory,
		name, setName,
		amount, setAmount,
	] = useState({category: "", name: "", amount: 0});
	
	const onChangeName = (name) => {
		setName(name);
	}
	
	const onChangeAmount = (amount) => {
		setAmount(amount);
	}

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text>Category</Text>
	            <View style={{display: "flex", flexDirection: "row"}}>
		            {
		              icons.map(icon => <Button key={icon.id} title={nodeEmoji.get(icon.icon)} />)
		            }
	            </View>
            </View>
            <View style={styles.sectionContainer}>
              <Text>Name</Text>
	            <TextInput
		            value={name}
		            onChangeText={onChangeName}
		            placeholder="What is it?"
	            />
            </View>
            <View style={styles.sectionContainer}>
              <Text>Amount</Text>
	            <TextInput
		            value={amount}
		            onChangeText={onChangeAmount}
		            placeholder="How much?"
		            keyboardType="numeric"
	            />
            </View>
            <View style={styles.sectionContainer}>
              <Text>Flags</Text>
            </View>
            <View style={styles.sectionContainer}>
	            <View style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
	              <Button
		              title="Clear"
		              style={{flex: 1}}
	              />
	              <Button
		              title="Save"
		              style={{flex: 1}}
	              />
	            </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
