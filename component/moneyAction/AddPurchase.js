import React from "react";
import MoneyAction from "./MoneyAction";

const AddPurchase = ({children}) => {
  return (
    <MoneyAction mode={"PURCHASE"}>
      {children}
    </MoneyAction>
  )
}

export default AddPurchase;
