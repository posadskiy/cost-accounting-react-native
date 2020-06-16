const LOCAL = 0;
const PRODUCTION = 1;
const mode = LOCAL;

const LOCAL_SERVER = "http://localhost:8080/";
const PRODUCTION_SERVER = "https://cost-accounting.posadskiy.com/";
const URL = {
  PURCHASE: {
    add: 'purchase/add',
    delete: 'purchase/delete',
    categories: 'purchase/categories'
  },
  INCOME: {
    add: 'income/add',
    delete: 'income/delete',
    categories: 'income/categories'
  },
  CURRENCIES: {
    all: 'currency/all',
  },
  STATISTICS: {
    events: 'statistics/events',
    month: 'statistics/month',
    monthForUser: 'statistics/monthForUser',
    monthPurchaseTotal: 'statistics/monthPurchaseTotal',
    monthIncomeTotal: 'statistics/monthIncomeTotal',
    monthPurchaseTotalForUser: 'statistics/monthPurchaseTotalForUser',
    monthIncomeTotalForUser: 'statistics/monthIncomeTotalForUser',
  },
  LOGIN: {
    login: 'login/auth',
  },
};

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
