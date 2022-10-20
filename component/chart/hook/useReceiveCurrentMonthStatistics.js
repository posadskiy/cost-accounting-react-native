import {Alert} from "react-native";
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
        Alert.alert(e.response.data.title, e.response.data.message);
      }
    }
    
    receiveProjectMonths();
  });
  
  return statistics;
}

export default useReceiveCurrentMonthStatistics;
