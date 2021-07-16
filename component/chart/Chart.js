import React, {useEffect, useState, useContext} from 'react';
import {
  Alert,
  View,
  Text,
} from "react-native";
import styles from "../../Styles";
import {Picker} from "@react-native-picker/picker";
import BlackModal from "../common/Modal";
import {loadProjectMonths} from "../../actions/statisticActions";
import Button from "../common/Button";
import {UserContext} from "../login/Login";
import axios from "axios";
import {URL, url} from "../../common/URL";
import StatisticRow from "./StatisticRow";
import BetweenGrayBlocks from "../common/BetweenGrayBlocks";

const Chart = () => {
  const [isShow, setIsShow] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("Not selected");
  const [months, setMonths] = useState([]);
  const [purchaseCategories, setPurchaseCategories] = useState([]);
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [purchasesTotal, setPurchasesTotal] = useState(0);
  const [incomesTotal, setIncomesTotal] = useState(0);
  const [purchasesLimit, setPurchasesLimit] = useState(0);
  const user = useContext(UserContext);

  const onCloseModal = () => {
    setIsShow(false);
  }

  const onApplyModal = () => {
    setIsShow(false);

    receiveCurrentMonthStatistics(selectedMonth);
  }
  
  const onChangeSelectedMonth = (newSelectedMonth) => {
    setSelectedMonth(newSelectedMonth);
  }

  useEffect(() => {
    const receiveProjectMonths = async () => {
      const body = JSON.stringify({
        userId: user.id,
      });

      const months = await loadProjectMonths(body);

      setMonths(months);
      setSelectedMonth(months[0]);
      receiveCurrentMonthStatistics(months[0]);
    };

    receiveProjectMonths();
  }, [months.length]);

  const receiveCurrentMonthStatistics = (month) => {
    const monthNames = [
      "January", "February", "March", "April", "May",
      "June", "July", "August", "September", "October",
      "November", "December"
    ];
    const monthName = month.split(" ")[0];
    const yearName = month.split(" ")[1];
    
    const body = JSON.stringify({
      userId: user.id,
      year: yearName,
      month: monthNames.indexOf(monthName) + 1,
    });

    axios.post(url(URL.STATISTICS.month), body,
      {
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(result => mapStatistics(result.data))
      .catch(error => Alert.alert(error.response.data.title, error.response.data.message));
  };
  
  const mapStatistics = (statistics) => {
    const purchaseCategories = [];
    const incomeCategories = [];
    Object.keys(statistics.purchaseCategories).map(key => purchaseCategories.push(statistics.purchaseCategories[key]));
    Object.keys(statistics.incomeCategories).map(key => incomeCategories.push(statistics.incomeCategories[key]));
    setPurchaseCategories(purchaseCategories);
    setIncomeCategories(incomeCategories);
    
    const purchasesTotal = purchaseCategories.reduce((total, value) => total + value.amount, 0).toFixed();
    const incomesTotal = incomeCategories.reduce((total, value) => total + value.amount, 0).toFixed();
    const purchasesLimit = purchaseCategories.reduce((total, value) => total + value.limit, 0).toFixed();
    
    setPurchasesTotal(purchasesTotal);
    setPurchasesLimit(purchasesLimit);
    
    setIncomesTotal(incomesTotal);
  }

  return (
    <View style={{padding: 14}}>
      <Button
        text={selectedMonth}
        onPress={() => setIsShow(true)}
      />
      <View style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
        <BlackModal
          isModalVisible={isShow}
          onCloseModal={onCloseModal}
          onApplyModal={onApplyModal}
        >
          <Picker
            selectedValue={selectedMonth}
            style={[styles.headersText, {color: "white"}]}
            itemStyle={[styles.headersText, {color: "white"}]}
            onValueChange={onChangeSelectedMonth}
          >
            {
              months.map(month => (
                <Picker.Item key={month} label={month} value={month} />
              ))
            }
          </Picker>
        </BlackModal>
      </View>
      <View>
        <BetweenGrayBlocks />
        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <Text style={styles.eventDate}>Purchases</Text>
          <Text style={styles.eventDate}>{purchasesTotal} / {purchasesLimit} $</Text>
        </View>
        {
          purchaseCategories.map(purchaseCategory => {
            const {
              category: {
                id,
              } = {}
            } = purchaseCategory;

            return <StatisticRow key={id} category={purchaseCategory} />
          })
        }
        <BetweenGrayBlocks />
        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <Text style={styles.eventDate}>Incomes</Text>
          <Text style={styles.eventDate}>{incomesTotal} $</Text>
        </View>
        {
          incomeCategories.map(incomeCategory => {
            const {
              category: {
                id,
              } = {}
            } = incomeCategory;
            return <StatisticRow key={id} category={incomeCategory} />
          })
        }
      </View>
    </View>
  )
};

export default Chart;
