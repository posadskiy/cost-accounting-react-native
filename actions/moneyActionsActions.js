import axios from "axios";
import {URL, url} from "../common/URL";
import {defaultConfig} from "../common/Config";

const loadPurchaseCategories = async (userId) => {
  const body = JSON.stringify({
    userId
  });

  const result = await axios.post(url(URL.PURCHASE.categories), body, defaultConfig);

  return result.data;
}

const loadIncomeCategories = async (userId) => {
  const body = JSON.stringify({
    userId
  });

  const result = await axios.post(url(URL.INCOME.categories), body, defaultConfig);

  return result.data;
}

const loadCurrencies = async () => {
  const result = await axios.get(url(URL.CURRENCIES.all), defaultConfig);
  
  return result.data;
}

const savePurchase = async (body) => {
  try {
    return await axios.post(url(URL.PURCHASE.add), body, defaultConfig);
  } catch (e) {
    return e.response;
  }
}

const saveIncome = async (body) => {
  try {
    return await axios.post(url(URL.INCOME.add), body, defaultConfig);
  } catch (e) {
    return e.response;
  }
}

const loadAllUsersInProject = async (userId) => {
  const body = JSON.stringify({
    id: userId
  });
  const result = await axios.post(url(URL.USER.allInProject), body, defaultConfig);
  
  return result.data;
}

export {
  loadPurchaseCategories,
  loadIncomeCategories,
  loadCurrencies,
  savePurchase,
  saveIncome,
  loadAllUsersInProject,
};
