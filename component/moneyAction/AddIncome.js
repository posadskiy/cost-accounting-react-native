import React from "react";
import MoneyAction from "./MoneyAction";

const AddIncome = ({children}) => {
  return (
    <MoneyAction mode={"INCOME"}>
      {children}
    </MoneyAction>
  )
}

export default AddIncome;
