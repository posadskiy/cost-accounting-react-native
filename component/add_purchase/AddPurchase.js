import React, {useState, useEffect, useContext} from 'react';
import {
  Alert,
  ScrollView,
  RefreshControl,
  View,
  Text, TextInput, Switch, Button,
} from "react-native";
import Modal from 'react-native-modal';
import axios from 'axios';
import styles from "../../Styles";
import Category from "./Category";
import Name from "./Name";
import Amount from "./Amount";
import Flags from "./Flags";
import Buttons from "./Buttons";
import DatePicker from "./DatePicker";
import Currency from "./Currency";

import {URL, url} from '../../common/URL';
import {UserContext} from "../login/Login";

function wait(timeout) {
	return new Promise(resolve => {
		setTimeout(resolve, timeout);
	});
}

const AddPurchase = () => {
  const DEFAULT_CURRENCY = "BYN";

	const [category, setCategory] = useState("");
	const [name, setName] = useState("");
	const [amount, setAmount] = useState("");
	const [date, setDate] = useState(new Date());
	const [isPrivate, setIsPrivate] = useState(false);
	const [isSplit, setIsSplit] = useState(false);
	const [categories, setCategories] = useState([]);
	const [currencies, setCurrencies] = useState([]);
	const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
	const [projectUsers, setProjectUsers] = useState([]);
	const [refreshing, setRefreshing] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
  const user = useContext(UserContext);
	
	const clearData = () => {
		setCategory("");
		setName("");
		setAmount("");
		setCurrency(DEFAULT_CURRENCY);
		setDate(new Date());
		setIsPrivate(false);
		setIsSplit(false);
		setIsModalVisible(false);
	}
	
	const validate = () => {
		const result = [
			validateCategory(),
			validateName(),
			validateAmount(),
			validateDate(),
		];
		
		return result.find(value => !value) !== false;
	}
	
	const validateCategory = () => {
		return !!category;
	}
	
	const validateName = () => {
		return !!name;
	}
	
	const validateAmount = () => {
		return !!amount && amount > 0;
	}
	
	const validateDate = () => {
		return !!date;
	}

	const onPressSplit = () => {
	  const tempProjectUsers = JSON.parse(JSON.stringify(projectUsers));
    const currentUser = tempProjectUsers.find((projectUser) => user.id === projectUser.id);
	  currentUser.amount = amount || '0';
	  currentUser.isPicked = true;
    isSplit && tempProjectUsers.forEach(user => user.amount = '0');
    setProjectUsers(tempProjectUsers);
	  !isSplit && setIsModalVisible(!isModalVisible);
	  setIsSplit(!isSplit);
  }
  
  const pickUser = (userId) => {
    const tempProjectUsers = JSON.parse(JSON.stringify(projectUsers));
    const pickedUser = tempProjectUsers.find((projectUser) => userId === projectUser.id);
    pickedUser.isPicked = !pickedUser.isPicked;
    const pickedUsers = tempProjectUsers.filter(user => user.isPicked);
    pickedUsers.forEach(user => user.amount = '' + amount / pickedUsers.length);
    const unpickedUsers = tempProjectUsers.filter(user => !user.isPicked);
    unpickedUsers.forEach(user => user.amount = '0');
    setProjectUsers(tempProjectUsers);
  }
  
  const onChangeSplitAmount = (userId, value) => {
    const tempProjectUsers = JSON.parse(JSON.stringify(projectUsers));
    const pickedUser = tempProjectUsers.find((projectUser) => userId === projectUser.id);
    
    pickedUser.amount = '' + value;
    const pickedUsers = tempProjectUsers.filter(user => user.isPicked);
    if (pickedUsers.length === 2) {
      const anotherUser = pickedUsers.find(projectUser => pickedUser.id !== projectUser.id);
      anotherUser.amount = amount - value + '';
    }
    
    setProjectUsers(tempProjectUsers);
  }
  
  const onCloseModal = () => {
    const tempProjectUsers = JSON.parse(JSON.stringify(projectUsers));
    tempProjectUsers.forEach(projectUser => {
      projectUser.amount = '0';
      projectUser.isPicked = false;
    });
    setProjectUsers(tempProjectUsers);

    setIsSplit(false);
    setIsModalVisible(false);
  }

	const sendPurchase = () => {
		const isValidated = validate();
		if (!isValidated) {
			Alert.alert(
				"That's problem...",
				"Please, fill all field. Thank you!",
				[{
					text: "Got it!"
				}]
			);
			return;
		}

    if (isSplit) {
      const pickedUsers = projectUsers.filter(user => user.isPicked);
      pickedUsers.forEach(user => {
        const body = JSON.stringify({
          userId: user.id,
          purchase: {
            category: category.id,
            name,
            amount: user.amount.replace(",", "."),
            currency,
            date,
            isPrivate,
          },
        });
        console.log(body);

        axios.post(url(URL.PURCHASE.add),
          body,
          {
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            }
          })
          .catch(error => Alert.alert(
            "Oh, no...",
            "Error happens, please, call to developers",
            [{
              text: "OK"
            }]));
      });

      Alert.alert(
        "Saved!",
        "Thanks, your split purchase successfully saved",
        [{
          text: "OK"
        }]
      );
      clearData();
      return;
    }
		
		const body = JSON.stringify({
		  userId: user.id,
		  purchase: {
        category: category.id,
        name,
        amount: amount.replace(",", "."),
        currency,
        date,
        isPrivate,
      },
		});

    axios.post(url(URL.PURCHASE.add),
      body,
      {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      })
      .then(result => {
        Alert.alert(
            "Saved!",
            "Thanks, your purchase successfully saved",
            [{
              text: "OK"
            }]
          );
        clearData();
        }
      )
      .catch(error => Alert.alert(
        "Oh, no...",
        "Error happens, please, call to developers",
        [{
          text: "OK"
        }]));
	}
	
	const receivePurchaseCategories = () => {
	  const body = JSON.stringify({
	    userId: user.id,
    });

		axios.post(url(URL.PURCHASE.categories), body,
			{
				headers: {
					'Content-Type': 'application/json'
				},
			})
			.then(result => setCategories(result.data))
			.catch(error => console.error(error));
	}	
	
	const receiveCurrencies = () => {
		axios.get(url(URL.CURRENCIES.all),
			{
				headers: {
					'Content-Type': 'application/json'
				},
			})
			.then(result => setCurrencies(result.data))
			.catch(error => console.error(error));
	}

	const receiveAllInProject = () => {
	  const body = JSON.stringify({
      id: user.id,
    });

		axios.post(url(URL.USER.allInProject), body,
			{
				headers: {
					'Content-Type': 'application/json'
				},
			})
			.then(result => setProjectUsers(mapUsers(result.data)))
			.catch(error => console.error(error));
	}
	
	const mapUsers = (users) => {
	  return users.map(user => ({
	    id: user.id,
      name: user.name,
      amount: '0',
      isPicked: false,
    }))
  }

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);

		receivePurchaseCategories();
		receiveCurrencies();
    receiveAllInProject();

		wait(2000).then(() => setRefreshing(false));
	}, [refreshing]);
	
	useEffect(() => receivePurchaseCategories(), [categories.length]);
	useEffect(() => receiveCurrencies(), [currencies.length]);
	useEffect(() => receiveAllInProject(), [projectUsers.length]);

	return (
		<ScrollView
			contentInsetAdjustmentBehavior="automatic"
			style={styles.scrollView}
			refreshControl={
				<RefreshControl 
					refreshing={refreshing} 
					onRefresh={onRefresh}
					titleColor="white"
					title="Refreshing categories and currencies..."
				/>
			}
		>
      <Modal
        isVisible={isModalVisible}
        backdropColor="black"
        backdropOpacity={0.95}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
      >
        <View style={styles.sectionContainer}>
          {
            projectUsers.map(projectUser => (
              <View key={projectUser.id} style={{display: "flex", flexDirection: "row"}}>
                <Text style={[{flex: 1}, styles.headersText]}>{projectUser.name}</Text>
                <TextInput
                  style={[{flex: 1}, styles.headersText]}
                  value={projectUser.amount}
                  onChangeText={(value) => onChangeSplitAmount(projectUser.id, value)}
                  placeholder="How much?"
                  placeholderTextColor="gray"
                  keyboardType="decimal-pad"
                  returnKeyType="done"
                />
                <Switch
                  style={{flex: 1}}
                  onValueChange={() => pickUser(projectUser.id)}
                  value={projectUser.isPicked}
                />
              </View>
            ))
          }
          <View style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
            <Button
              onPress={onCloseModal}
              title="Cancel"
              style={{flex: 1}}
            />
            <Button
              onPress={() => setIsModalVisible(false)}
              title="Apply"
              style={{flex: 1}}
            />
          </View>
        </View>
      </Modal>
      <Category
        categories={categories}
        category={category}
        setCategory={setCategory}
      />
      <Name
        name={name}
        setName={setName}
      />
      <Amount
        amount={amount}
        setAmount={setAmount}
      />
      <Currency
        currencies={currencies}
        currency={currency}
        setCurrency={setCurrency}
      />
      <DatePicker
        date={date}
        setDate={setDate}
      />
      <Flags
        isPrivate={isPrivate}
        setIsPrivate={setIsPrivate}
        isSplit={isSplit}
        onPressSplit={onPressSplit}
      />
      {
        isSplit && (
          <View style={{paddingHorizontal: 10}}>
            <Text style={styles.smallText}>{projectUsers.filter(projectUser => projectUser.isPicked).map(projectUser => projectUser.name + ": " + projectUser.amount + " ")}</Text>
          </View>
        )
      }
      <Buttons
        save={sendPurchase}
        clear={clearData}
      />
		</ScrollView>
	)
};

export default AddPurchase;
