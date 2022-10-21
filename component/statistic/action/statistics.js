import axios from "axios";
import {URL, url} from "../../../common/URL";
import {defaultConfig} from "../../../common/Config";

const deletePurchase = async (request) => {
  const result = await axios.post(url(URL.PURCHASE.delete), request, defaultConfig);

  return result.data;
}

const deleteIncome = async (request) => {
  const result = await axios.post(url(URL.INCOME.delete), request, defaultConfig);

  return result.data;
}

export {
  deletePurchase,
  deleteIncome,
}
