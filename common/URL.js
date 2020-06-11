const LOCAL = 0;
const PRODUCTION = 1;
const mode = LOCAL;

const LOCAL_SERVER = "http://localhost:8080/";
const PRODUCTION_SERVER = "https://cost-accounting.posadskiy.com/";
const URL = {
	addPurchase: (userId) => `purchase/add/${userId}`,
	addIncome: (userId) => `income/add/${userId}`,
	getCurrencies: 'purchase/currencies',
	getPurchaseCategories: 'category/allPurchases',
	getIncomeCategories: 'category/allIncomes',
	getLastPurchases: (userId) => `statistic/${userId}/lastPurchases`,
	getLastIncomes: (userId) => `statistic/${userId}/lastIncomes`,
  deletePurchase: (userId, purchaseId) => `purchase/delete/${purchaseId}/${userId}`,
  deleteIncome: (userId, purchaseId) => `income/delete/${purchaseId}/${userId}`,
  getStatisticEvents: 'statistic/event',
	login: 'login/auth',
}

const url = (url) => {
	let server;

	switch (mode) {
		case LOCAL: {
			server = LOCAL_SERVER;
			break;
		}
		case PRODUCTION: {
			server = PRODUCTION_SERVER;
			break;
		}
		default: {
			server = LOCAL_SERVER;
			break;
		}
	}

	return server + url;
}

export {
	URL,
	url,
}
