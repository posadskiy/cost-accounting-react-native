import {Alert} from "react-native";
import {useEffect, useState} from "react";
import {loadStatisticsMonths} from "../action/statisticActions";

function useReceiveCurrentMonthStatistics(month, userId) {
  const monthNames = [
    "January", "February", "March", "April", "May",
    "June", "July", "August", "September", "October",
    "November", "December"
  ];
  const monthName = month.split(" ")[0];
  const yearName = month.split(" ")[1];

  const body = JSON.stringify({
    userId,
    year: yearName,
    month: monthNames.indexOf(monthName) + 1,
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
