const mapPurchaseStatistics = (statistics) => {
  const amounts = [];
  const todayLimits = [];
  const limits = [];
  const resultCategories = [];
  const categories = statistics.purchaseCategories;
  const date = new Date();
  const daysInMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  Object.keys(categories).map(key => {
    const category = categories[key];
    amounts.push(category.amount);
    todayLimits.push(category.limit * (date.getDate() / daysInMonth));
    limits.push(category.limit);
    resultCategories.push(category.category.name);
  })

  return [amounts, todayLimits, limits, resultCategories];
}

export default mapPurchaseStatistics;
