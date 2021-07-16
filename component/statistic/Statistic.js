import React, {useContext, useEffect, useState} from 'react'

import {Platform, RefreshControl, SectionList, Text, View} from 'react-native';
import styles from "../../Styles";
import axios from "axios";
import {URL, url} from "../../common/URL";
import {UserContext} from "../login/Login";
import Event from "./Event";
import BlackModal from "../common/Modal";
import DateTimePicker from "@react-native-community/datetimepicker";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

function wait(timeout) {
	return new Promise(resolve => {
		setTimeout(resolve, timeout);
	});
}

const defaultCategory = {
  amount: 0,
  limit: 0,
}

const defaultYear = new Date().getFullYear();
const defaultMonth = new Date().getMonth() + 1;

const Statistic = () => {
	const [refreshing, setRefreshing] = useState(false);
	const [events, setEvents] = useState([]);
	const [monthPurchasesTotal, setMonthPurchasesTotal] = useState(defaultCategory);
	const [monthIncomesTotal, setMonthIncomesTotal] = useState(defaultCategory);
  const [monthPurchasesTotalForUser, setMonthPurchasesTotalForUser] = useState(defaultCategory);
  const [monthIncomesTotalForUser, setMonthIncomesTotalForUser] = useState(defaultCategory);
  const [isShow, setIsShow] = useState(false);
  const [month, setMonth] = useState(defaultMonth);
  const [year, setYear] = useState(defaultYear);
  const [date, setDate] = useState(new Date());
  const user = useContext(UserContext);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);

		receiveEvents();
		receiveMonthPurchasesTotal();
		receiveMonthIncomesTotal();
		receiveMonthPurchasesTotalForUser();
		receiveMonthIncomesTotalForUser();

		wait(2000).then(() => setRefreshing(false));
	}, [refreshing]);
	
	const getBody = () => {
    return JSON.stringify({
      userId: user.id,
      year,
      month,
    });
  }

	const receiveEvents = () => {
	  const body = getBody();

		axios.post(url(URL.STATISTICS.events), body,
			{
				headers: {
					'Content-Type': 'application/json'
				},
			})
			.then(result => setEvents(mapEvents(result.data)))
			.catch(error => console.error(error));
	}

	const receiveMonthPurchasesTotal = () => {
	  const body = getBody();

		axios.post(url(URL.STATISTICS.monthPurchaseTotal), body,
			{
				headers: {
					'Content-Type': 'application/json'
				},
			})
			.then(result => setMonthPurchasesTotal(result.data))
			.catch(() => setMonthPurchasesTotal(defaultCategory));
	}
	
	const receiveMonthIncomesTotal = () => {
	  const body = getBody();

		axios.post(url(URL.STATISTICS.monthIncomeTotal), body,
			{
				headers: {
					'Content-Type': 'application/json'
				},
			})
			.then(result => setMonthIncomesTotal(result.data))
			.catch(() => setMonthIncomesTotal(defaultCategory));
	}
	
	const receiveMonthPurchasesTotalForUser = () => {
	  const body = getBody();

		axios.post(url(URL.STATISTICS.monthPurchaseTotalForUser), body,
			{
				headers: {
					'Content-Type': 'application/json'
				},
			})
			.then(result => setMonthPurchasesTotalForUser(result.data))
			.catch(() => setMonthPurchasesTotalForUser(defaultCategory));
	}
	
	const receiveMonthIncomesTotalForUser = () => {
	  const body = getBody();

		axios.post(url(URL.STATISTICS.monthIncomeTotalForUser), body,
			{
				headers: {
					'Content-Type': 'application/json'
				},
			})
			.then(result => setMonthIncomesTotalForUser(result.data))
			.catch(() => setMonthIncomesTotalForUser(defaultCategory));
	}
	
	const mapEvents = (events) => Object.keys(events).map((key, index) => {
    return {
      "title": createDateFromKey(key),
      "data": events[key],
    };
  })
    .reverse();

  const createDateFromKey = (key) => {
    return createTwoDigitsDateItem(+key) + "." + createTwoDigitsDateItem(date.getMonth() + 1) + "." + createTwoDigitsDateItem(date.getFullYear());
  }
  
  const createTwoDigitsDateItem = (value) => {
    return value < 10 ? '0' + value : value;
  }

  const onCloseModal = () => {
    setIsShow(false);
  }

  const onApplyModal = () => {
    setIsShow(false);

    receiveEvents();
    receiveMonthPurchasesTotal();
    receiveMonthIncomesTotal();
    receiveMonthPurchasesTotalForUser();
    receiveMonthIncomesTotalForUser();
  }
  
  const onChangeDate = (event, selectedDate) => {
    setDate(selectedDate);
    setYear(selectedDate.getFullYear());
    setMonth(selectedDate.getMonth() + 1);
  }

	useEffect(() => receiveEvents(), [events.length]);
	useEffect(() => receiveMonthPurchasesTotal(), [monthPurchasesTotal.month]);
	useEffect(() => receiveMonthIncomesTotal(), [monthIncomesTotal.month]);
	useEffect(() => receiveMonthPurchasesTotalForUser(), [monthPurchasesTotalForUser.amount]);
	useEffect(() => receiveMonthIncomesTotalForUser(), [monthIncomesTotalForUser.amount]);

  const purchasesTotal = `${monthPurchasesTotalForUser.amount.toFixed(0)}$ / ${monthPurchasesTotal.amount.toFixed(0)}$ / ${monthPurchasesTotal.limit.toFixed(0)}$`;
  const incomesTotal = `${monthIncomesTotalForUser.amount.toFixed(0)}$ / ${monthIncomesTotal.amount.toFixed(0)}$`;
	return (
    <SectionList
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          titleColor="white"
          title="Refreshing categories and currencies..."
        />
      }
      ListHeaderComponent={
        <>
          <Pressable onPress={() => setIsShow(true)}>
            <Text style={[styles.headersText, {color: "khaki"}]}>{date.toLocaleDateString("en-US", {year: "numeric", month:"long"})}</Text>
          </Pressable>
          {isShow && (
            <BlackModal
              isModalVisible={isShow}
              onCloseModal={onCloseModal}
              onApplyModal={onApplyModal}
            >
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChangeDate}
                {...(Platform.OS === 'ios' && parseFloat(Platform.Version) >= 14
                  ? null
                  : { textColor: "white" })} // on ios 14+ causes crash
              />
            </BlackModal>
          )}
          <View style={styles.statisticsContainer}>
            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
              <Text style={[styles.headersText, {color: "lightcoral"}]}>{purchasesTotal}</Text>
              <Text style={[styles.headersText, {color: "greenyellow"}]}>{incomesTotal}</Text>
            </View>
          </View>
        </>
      }
      sections={events}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <Event event={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <View style={{paddingTop: 10, paddingBottom: 4}}>
          <Text style={styles.eventDate}>{title}</Text>
        </View>
      )}
    />
	)
}

export default Statistic;
