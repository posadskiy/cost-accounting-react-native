import {useEffect, useState} from "react";
import {loadProjectMonths} from "../action/statisticActions";

function useReceiveProjectMonths(userId) {
  
  const [months, setMonths] = useState([]);
  useEffect(() => {
    const receiveProjectMonths = async () => {
      const body = JSON.stringify({
        userId,
      });

      try {
        const months = await loadProjectMonths(body);
        setMonths(months);
      } catch (e) {
        console.warn(e.name + ": " + e.message);
      }
    };

    receiveProjectMonths();
  }, [months.length]);
  
  return months;
}

export default useReceiveProjectMonths;
