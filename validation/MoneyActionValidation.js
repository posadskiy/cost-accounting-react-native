const validate = (moneyAction) => {
  const result = [
    validateCategory(moneyAction.category),
    validateName(moneyAction.name),
    validateAmount(moneyAction.amount),
    validateDate(moneyAction.date),
  ];

  return result.find(value => !value) !== false;
}

const validateCategory = (category) => {
  return !!category;
}

const validateName = (name) => {
  return !!name;
}

const validateAmount = (amount) => {
  return !!amount && amount > 0;
}

const validateDate = (date) => {
  return !!date;
}

export {
  validate,
}
