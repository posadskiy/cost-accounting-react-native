import {deletePurchase} from "../action/statistics";
import {useCallback} from "react";

const useDeletePurchaseCallback = (userId, purchaseId) => {
  const body = JSON.stringify({
    userId,
    purchaseId,
  });

  useCallback(() => {
    const deletePurchaseMethod = async () => {
      try {
        await deletePurchase(body);
      } catch (e) {
        console.warn("useDeletePurchaseCallback: " + e.name + ": " + e.message);
      }
    }

    deletePurchaseMethod();
  })
}

export default useDeletePurchaseCallback;
