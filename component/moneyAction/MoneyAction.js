import React, {useState, useEffect, useContext} from 'react';
import {
  Alert,
  ScrollView,
  RefreshControl,
} from "react-native";
import BlackModal from "../common/Modal";
import styles from "../../Styles";
import Category from "./Category";
import Name from "./Name";
import Amount from "./Amount";
import Flags from "./Flags";
import Buttons from "./Buttons";
import DatePicker from "./DatePicker";
import Currency from "./Currency";

import {
  loadPurchaseCategories,
  loadIncomeCategories,
  loadCurrencies,
  savePurchase,
  saveIncome,
  loadAllUsersInProject,
} from "../../actions/moneyActionsActions";

import {
  mapCleanProjectUsers,
  mapClearProjectUser,
} from "../../mapper/UserMapper";

import {wait} from "../../common/Utils";
import {UserContext} from "../login/Login";
import {validate} from "../../validation/MoneyActionValidation";
import {Status} from "../../common/Network";
import BetweenGrayBlocks from "../common/BetweenGrayBlocks";
import Line from "../common/Line";
import GrayBlock from "../common/GrayBlock";
import ProjectUser from "./ProjectUser";

const MoneyAction = ({mode}) => {
  const DEFAULT_CURRENCY = "RUB";
  const PURCHASE_MODE = "PURCHASE";
  const INCOME_MODE = "INCOME";
  
  const INIT_STATUS = "INIT_STATUS";
  const SAVING_STATUS = "SAVING_STATUS";
  const SAVED_STATUS = "SAVED_STATUS";
  const ERROR_STATUS = "ERROR_STATUS";

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
	const [status, setStatus] = useState(INIT_STATUS);
  const user = useContext(UserContext);
  
  const isPurchaseMode = () => mode === PURCHASE_MODE;
  const isIncomeMode = () => mode === INCOME_MODE;

	const clearData = () => {
		setCategory("");
		setName("");
		setAmount("");
		setCurrency(DEFAULT_CURRENCY);
		setDate(new Date());
		setIsPrivate(false);
		setIsSplit(false);
    clearProjectUsers();
		setIsModalVisible(false);
	}

	const onPressSplit = () => {
	  if (isSplit) {
	    onCloseModal();
	    return;
    }
	  
	  setAmountToCurrentUser();
	  onOpenModal();
  }
  
  const setSavingStatus = () => setStatus(SAVING_STATUS);
  const setSavedStatus = () => {
    setStatus(SAVED_STATUS);
    setTimeout(() => setStatus(INIT_STATUS), 2000);
  }
  const setErrorStatus = () => {
    setStatus(ERROR_STATUS);
    setTimeout(() => setStatus(INIT_STATUS), 2000);
  }
  
  const setAmountToCurrentUser = () => {
    const tempProjectUsers = JSON.parse(JSON.stringify(projectUsers));
    const currentUser = tempProjectUsers.find((projectUser) => user.id === projectUser.id);
    currentUser.amount = amount || '0';
    currentUser.isPicked = true;
    setProjectUsers(tempProjectUsers);
  }
  
  const pickUser = (userId) => {
    const tempProjectUsers = JSON.parse(JSON.stringify(projectUsers));
    const pickedUser = tempProjectUsers.find((projectUser) => userId === projectUser.id);
    pickedUser.isPicked = !pickedUser.isPicked;
    const pickedUsers = tempProjectUsers.filter(user => user.isPicked);
    pickedUsers.forEach(user => user.amount = (amount / pickedUsers.length).toFixed(2));
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
      anotherUser.amount = (amount - value).toFixed(2);
    }
    
    setProjectUsers(tempProjectUsers);
  }
  
  const onCloseModal = () => {
    clearProjectUsers();
    setIsSplit(false);
    setIsModalVisible(false);
  }
  
  const onApplyModal = () => {
    setIsModalVisible(false);
  }
  
  const onOpenModal = () => {
    setIsSplit(true);
    setIsModalVisible(true);
  }
  
  const clearProjectUsers = () => {
    const tempProjectUsers = JSON.parse(JSON.stringify(projectUsers));
    const clearedProjectUsers = tempProjectUsers.map(projectUsers => mapClearProjectUser(projectUsers))
    setProjectUsers(clearedProjectUsers);
  }

	const sendMoneyAction = async () => {
		const isValidated = validate(getMoneyAction());
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
      const pickedUsers = projectUsers
        .filter(user => user.isPicked)
        .map(user => ({id: user.id, amount: user.amount, success: false, error: undefined}));

      setSavingStatus()
      for (let i = 0; i < pickedUsers.length; ++i) {
        const body = getBody(pickedUsers[i].id, pickedUsers[i].amount);

        const response = isPurchaseMode() ? await savePurchase(body) : await saveIncome(body);

        if (response.status === Status.REST_SUCCESS_CODE) {
          pickedUsers[i].success = true;
        }
        
        if (response.status !== Status.REST_SUCCESS_CODE) {
          pickedUsers[i].error = {
            title: response.data.title,
            message: response.data.message,
          }
        }
      }
      
      const failedUsers = pickedUsers.filter(user => !user.success);
      
      if (failedUsers.length === 0) {
        setSavedStatus()
        clearData();
        return;
      }

      if (failedUsers.length === 1) {
        const user = failedUsers[0];
        setErrorStatus()
        alertError(user.error, getUserById(user.id));
        return;
      }

      setErrorStatus()
      const errorMessage = failedUsers.map(user => getUserById(user.id) + ': ' + user.error.message).join('\n');
      alertError({title: "Problem happened", message: errorMessage});
    }
		
		const body = getBody(user.id, amount);

    setSavingStatus()
    const response = isPurchaseMode() ? await savePurchase(body) : await saveIncome(body);
    if (response.status === Status.REST_SUCCESS_CODE) {
      setSavedStatus();
      clearData();
      return;
    }
    if (response.status === Status.REST_SERVER_ERROR_CODE) {
      setErrorStatus()
      alertError();
    }
	}
	
	const receivePurchaseCategories = async () => {
	  const categories = await loadPurchaseCategories();
	  
	  setCategories(categories);
	}

	const receiveIncomeCategories = async () => {
	  const categories = await loadIncomeCategories();
	  
	  setCategories(categories);
	}	
	
	const receiveCurrencies = async () => {
	  const currencies = await loadCurrencies();
	  
	  setCurrencies(currencies);
	}
	
	const receiveAllUsersInProject = async () => {
	  const allUsersInProject = await loadAllUsersInProject(user.id);

    setProjectUsers(mapCleanProjectUsers(allUsersInProject));
  }
	
	const getUserById = (id) => {
	  let foundUser = projectUsers.filter(user => user.id === id);
	  
	  if (foundUser.length === 0) return;
	  
	  return foundUser[0].name;
  }

  const getEntityName = () => isIncomeMode() ? "income" : "purchase";
  
	const getBody = (id, amount) => {
    return JSON.stringify({
      userId: id,
      [getEntityName()]: {
        category: category.id,
        name,
        amount: amount.replace(",", "."),
        currency,
        date,
        isPrivate,
      },
    });
  }
  
  const alertError = (error, userName) => {
	  const title = error.title || "Oh, no...";
	  let message = error.message || "Error happens, please, call to developers";
	  
	  if (!!userName) message = '[User: ' + userName + ']: ' + message;

    Alert.alert(title, message, [{text: "OK"}]);
  }

  const getMoneyAction = () => {
    return {
      category,
      name,
      amount,
      date,
      isPrivate,
      currency,
    }
  }
  
  const onSetAmount = (value) => setAmount(value.replace(",", "."));

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);

		isPurchaseMode() ? receivePurchaseCategories() : receiveIncomeCategories();
		receiveCurrencies();
    receiveAllUsersInProject();

		wait(2000).then(() => setRefreshing(false));
	}, [refreshing]);
	
	useEffect(() => {
    const receiveCategories = async () => {
      const categories = isPurchaseMode() ? await loadPurchaseCategories(user.id) : await loadIncomeCategories(user.id);

      setCategories(categories);
    }
	  receiveCategories();
  }, [user.id]);

	useEffect(() => {
    const receiveCurrencies = async () => {
      const currencies = await loadCurrencies();

      setCurrencies(currencies);
    };
    
    receiveCurrencies();
  }, [currencies.length]);

	useEffect(() => {
	  const receiveAllInProject = async () => {
	    const allUsersInProject = await loadAllUsersInProject(user.id);

      setProjectUsers(mapCleanProjectUsers(allUsersInProject));
    };
	  
	  receiveAllInProject();
  }, [projectUsers.length]);
	
	const pickedProjectUsers = projectUsers.filter(projectUser => projectUser.isPicked).map(projectUser => projectUser.name + ": " + projectUser.amount + " ");

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
      <BlackModal
        isModalVisible={isModalVisible}
        onApplyModal={onApplyModal}
        onCloseModal={onCloseModal}
      >
          {
            projectUsers.map(projectUser => (
              <ProjectUser
                key={projectUser.id}
                onSwitchPress={() => pickUser(projectUser.id)}
                onTextChange={(value) => onChangeSplitAmount(projectUser.id, value)}
                projectUser={projectUser}
              />
            ))
          }
      </BlackModal>
      <GrayBlock>
        <Category
          categories={categories}
          category={category}
          setCategory={setCategory}
        />
      </GrayBlock>
      <BetweenGrayBlocks />
      <GrayBlock>
        <Name
          name={name}
          setName={setName}
        />
        <Line />
        <Amount
          amount={amount}
          setAmount={onSetAmount}
        />
      </GrayBlock>
      <BetweenGrayBlocks />
      <GrayBlock>
        <Currency
          currencies={currencies}
          currency={currency}
          setCurrency={setCurrency}
        />
        <Line />
        <DatePicker
          date={date}
          setDate={setDate}
        />
      </GrayBlock>
      <BetweenGrayBlocks />
      <GrayBlock>
        <Flags
          isPrivate={isPrivate}
          setIsPrivate={setIsPrivate}
          isSplit={isSplit}
          onPressSplit={onPressSplit}
          pickedProjectUsers={pickedProjectUsers}
        />
      </GrayBlock>
      <BetweenGrayBlocks />
      <Buttons
        onClick={sendMoneyAction}
        isEnabled={validate(getMoneyAction())}
        status={status}
      />
		</ScrollView>
	)
};

export default MoneyAction;
