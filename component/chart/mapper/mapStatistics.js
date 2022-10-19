function mapStatistics(statistics) {
  const purchaseCategories = [];
  const incomeCategories = [];
  Object.keys(statistics.purchaseCategories).map(key => purchaseCategories.push(statistics.purchaseCategories[key]));
  Object.keys(statistics.incomeCategories).map(key => incomeCategories.push(statistics.incomeCategories[key]));

  const purchasesTotal = purchaseCategories.reduce((total, value) => total + value.amount, 0).toFixed();
  const incomesTotal = incomeCategories.reduce((total, value) => total + value.amount, 0).toFixed();
  const purchasesLimit = purchaseCategories.reduce((total, value) => total + value.limit, 0).toFixed();
  
  return [purchaseCategories, incomeCategories, purchasesTotal, purchasesLimit, incomesTotal];
}

export default mapStatistics;
