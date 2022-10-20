import {useEffect, useState} from "react";
import {loadStatisticsMonths} from "../action/statisticActions";

function useReceiveCurrentMonthStatistics(userId, month, year) {
  const body = JSON.stringify({
    userId,
    month,
    year,
  });

  const [statistics, setStatistics] = useState();
  useEffect(() => {
    const receiveProjectMonths = async () => {
      try {
        const statistics = await loadStatisticsMonths(body);
        setStatistics(statistics);
      } catch (e) {
        console.warn("useReceiveCurrentMonthStatistics: " + e.name + ": " + e.message);
      }
    }
    
    receiveProjectMonths();
  });
  
  return statistics;
}

export default useReceiveCurrentMonthStatistics;
