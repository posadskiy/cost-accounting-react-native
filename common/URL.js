const LOCAL = 0;
const PRODUCTION = 1;
const mode = LOCAL;

const LOCAL_SERVER = "http://localhost:8080/";
const PRODUCTION_SERVER = "https://cost-accounting.posadskiy.com/";
const URL = {
	addPurchase: (userId) => `purchase/add/${userId}`,
	addIncome: (userId) => `income/add/${userId}`,
	getCurrencies: 'purchase/currencies',
	getCategories: 'category/allPurchases',
	getLastPurchases: (userId) => `statistic/${userId}/lastPurchases`,
	getLastIncomes: (userId) => `statistic/${userId}/lastIncomes`,
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
