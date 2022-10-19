const LOCAL = 0;
const PRODUCTION = 1;
const EBS = 2;
const mode = LOCAL;

const LOCAL_SERVER = "http://localhost:8082/";
const PRODUCTION_SERVER = "https://cost-accounting.posadskiy.com/";
const EBS_SERVER = "http://cost-accounting-prod.eu-central-1.elasticbeanstalk.com/";

const SERVER = {
  AUTH: {
    local: "http://localhost:8080/"
  },
  MONEY_ACTION: {
    local: "http://localhost:8082/"
  },
  PROJECT: {
    local: "http://localhost:8084/"
  },
  STATISTICS: {
    local: "http://localhost:8083/"
  }
}

const extractDomain = (element) => {
  let server = element.local;

  switch (mode) {
    case LOCAL: {
      server = element.local;
      break;
    }
    case PRODUCTION: {
      server = element.production;
      break;
    }
    case EBS: {
      server = element.ebs;
      break;
    }
  }
  
  return server;
}

const URL = {
  PURCHASE: {
    add: extractDomain(SERVER.MONEY_ACTION) + 'money-actions/purchase/add',
    delete: extractDomain(SERVER.MONEY_ACTION) + 'money-actions/purchase/delete',
    categories: extractDomain(SERVER.MONEY_ACTION) + 'money-actions/purchase/categories'
  },
  INCOME: {
    add: extractDomain(SERVER.MONEY_ACTION) + 'money-actions/income/add',
    delete: extractDomain(SERVER.MONEY_ACTION) + 'money-actions/income/delete',
    categories: extractDomain(SERVER.MONEY_ACTION) + 'money-actions/income/categories'
  },
  PROJECT_PURCHASE: {
    add: extractDomain(SERVER.PROJECT) + 'project/purchase/add',
    delete: extractDomain(SERVER.PROJECT) + 'project/purchase/delete',
  },
  PROJECT_INCOME: {
    add: extractDomain(SERVER.PROJECT) + 'project/income/add',
    delete: extractDomain(SERVER.PROJECT) + 'project/income/delete',
  },
  EVENTS: {
    month: extractDomain(SERVER.MONEY_ACTION) + 'money-actions/events/month',
  },
  USER: {
    getById: (id) => `user/${id}`,
    allInProject: 'user/allInProject',
    updateUser: 'user',
  },
  CURRENCIES: {
    all: extractDomain(SERVER.MONEY_ACTION) + 'money-actions/currency/all',
  },
  STATISTICS: {
    month: extractDomain(SERVER.STATISTICS) + 'statistics/statistics/month',
    monthForUser: extractDomain(SERVER.STATISTICS) + 'statistics/statistics/monthForUser',
    monthPurchaseTotal: extractDomain(SERVER.STATISTICS) + 'statistics/statistics/monthPurchaseTotal',
    monthIncomeTotal: extractDomain(SERVER.STATISTICS) + 'statistics/statistics/monthIncomeTotal',
    monthPurchaseTotalForUser: extractDomain(SERVER.STATISTICS) + 'statistics/statistics/monthPurchaseTotalForUser',
    monthIncomeTotalForUser: extractDomain(SERVER.STATISTICS) + 'statistics/statistics/monthIncomeTotalForUser',
    projectMonthsList: extractDomain(SERVER.STATISTICS) + 'statistics/statistics/projectMonthsList',
  },
  LOGIN: {
    login: extractDomain(SERVER.AUTH) + 'auth/login/v1/auth',
  },
};

const url = (url) => {
  return url;
}

export {
  URL,
  url,
}
