const LOCAL = 0;
const PRODUCTION = 1;
const EBS = 2;
const mode = LOCAL;

const LOCAL_SERVER = "http://localhost:8080/";
const PRODUCTION_SERVER = "https://cost-accounting.posadskiy.com/";
const EBS_SERVER = "http://cost-accounting-prod.eu-central-1.elasticbeanstalk.com/";
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
  USER: {
    getById: (id) => `user/${id}`,
    allInProject: 'user/allInProject',
    updateUser: 'user',
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
    projectMonthsList: 'statistics/projectMonthsList',
  },
  LOGIN: {
    login: 'auth/login/v1/auth',
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
    case EBS: {
      server = EBS_SERVER;
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
