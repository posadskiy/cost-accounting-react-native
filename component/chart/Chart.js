import React, {useContext, useState} from 'react';
import {Text, View,} from "react-native";
import styles from "../../Styles";
import {Picker} from "@react-native-picker/picker";
import BlackModal from "../common/Modal";
import Button from "../common/Button";
import {UserContext} from "../login/Login";
import StatisticRow from "./StatisticRow";
import BetweenGrayBlocks from "../common/BetweenGrayBlocks";
import useReceiveProjectMonths from "./hook/useReceiveProjectMonths";
import useReceiveCurrentMonthStatistics from "./hook/useReceiveCurrentMonthStatistics";
import mapTotalStatistics from "./mapper/mapTotalStatistics";
import monthNames from "./const/monthNames";

const Chart = () => {
  const [isShow, setIsShow] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("Not selected");
  const user = useContext(UserContext);

  const onCloseModal = () => {
    setIsShow(false);
  }

  const onApplyModal = () => {
    setIsShow(false);

    useReceiveCurrentMonthStatistics(selectedMonth, user.id);
  }

  const onChangeSelectedMonth = (newSelectedMonth) => {
    setSelectedMonth(newSelectedMonth);
  }

  const months = useReceiveProjectMonths(user.id);
  if (!months || months.length === 0) return <View><Text style={styles.eventDate}>Statistics are not ready yet</Text></View>;

  setSelectedMonth(months[0]);
  const monthName = months[0].split(" ")[0];
  const yearName = months[0].split(" ")[1];
  const statistics = useReceiveCurrentMonthStatistics(user.id, monthNames.indexOf(monthName) + 1, yearName);
  
  if (!statistics) return <View><Text style={styles.eventDate}>Statistics are not ready yet</Text></View>;
  const [purchaseCategories, incomeCategories, purchasesTotal, purchasesLimit, incomesTotal] = mapTotalStatistics(statistics);

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
                <Picker.Item key={month} label={month} value={month}/>
              ))
            }
          </Picker>
        </BlackModal>
      </View>
      <View>
        <BetweenGrayBlocks/>
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

            return <StatisticRow key={id} category={purchaseCategory}/>
          })
        }
        <BetweenGrayBlocks/>
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
            return <StatisticRow key={id} category={incomeCategory}/>
          })
        }
      </View>
    </View>
  )
};

export default Chart;
