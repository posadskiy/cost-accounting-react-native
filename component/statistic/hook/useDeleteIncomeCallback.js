import {deleteIncome, deletePurchase} from "../action/statistics";
import {useCallback} from "react";

const useDeletePurchaseCallback = (userId, incomeId) => {
  const body = JSON.stringify({
    userId,
    incomeId,
  });

  useCallback(() => {
    const deletePurchaseMethod = async () => {
      try {
        await deleteIncome(body);
      } catch (e) {
        console.warn("useDeleteIncomeCallback: " + e.name + ": " + e.message);
      }
    }

    deletePurchaseMethod();
  })
}

export default useDeletePurchaseCallback;
