import React, {useContext, useEffect, useState} from 'react'

import {RefreshControl, ScrollView, SectionList, Text, View,} from 'react-native';
import styles from "../../Styles";
import axios from "axios";
import {URL, url} from "../../common/URL";
import {UserContext} from "../login/Login";
import Event from "./Event";

function wait(timeout) {
	return new Promise(resolve => {
		setTimeout(resolve, timeout);
	});
}

const defaultCategory = {
  amount: 0,
  limit: 0,
}

const Statistic = () => {
	const [refreshing, setRefreshing] = useState(false);
	const [events, setEvents] = useState([]);
	const [monthPurchasesTotal, setMonthPurchasesTotal] = useState(defaultCategory);
	const [monthIncomesTotal, setMonthIncomesTotal] = useState(defaultCategory);
  const [monthPurchasesTotalForUser, setMonthPurchasesTotalForUser] = useState(defaultCategory);
  const [monthIncomesTotalForUser, setMonthIncomesTotalForUser] = useState(defaultCategory);
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

	const receiveEvents = () => {
	  const body = JSON.stringify({
	    userId: user.id,
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    });

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
	  const body = JSON.stringify({
	    userId: user.id,
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    });

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
	  const body = JSON.stringify({
	    userId: user.id,
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    });

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
	  const body = JSON.stringify({
	    userId: user.id,
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    });

		axios.post(url(URL.STATISTICS.monthPurchaseTotalForUser), body,
			{
				headers: {
					'Content-Type': 'application/json'
				},
			})
			.then(result => setMonthPurchasesTotalForUser(result.data))
			.catch(() => setMonthIncomesTotalForUser(defaultCategory));
	}
	
	const receiveMonthIncomesTotalForUser = () => {
	  const body = JSON.stringify({
	    userId: user.id,
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    });

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
    return createTwoDigitsDateItem(+key) + "." + createTwoDigitsDateItem(new Date().getMonth() + 1) + "." + createTwoDigitsDateItem(new Date().getFullYear());
  }
  
  const createTwoDigitsDateItem = (value) => {
    return value < 10 ? '0' + value : value;
  }

	useEffect(() => receiveEvents(), [events.length]);
	useEffect(() => receiveMonthPurchasesTotal(), [monthPurchasesTotal.month]);
	useEffect(() => receiveMonthIncomesTotal(), [monthIncomesTotal.month]);
	useEffect(() => receiveMonthPurchasesTotalForUser(), [monthPurchasesTotalForUser.amount]);
	useEffect(() => receiveMonthIncomesTotalForUser(), [monthIncomesTotalForUser.amount]);

  const purchasesTotal = `${monthPurchasesTotalForUser.amount.toFixed(0)}$ / ${monthPurchasesTotal.amount.toFixed(0)}$ / ${monthPurchasesTotal.limit.toFixed(0)}$`;
  const incomesTotal = `${monthIncomesTotalForUser.amount.toFixed(0)}$ / ${monthIncomesTotal.amount.toFixed(0)}$`;
	return (
		<ScrollView
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
		>
			<View style={styles.sectionContainer}>
        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <Text style={[styles.headersText, {color: "lightcoral"}]}>{purchasesTotal}</Text>
          <Text style={[styles.headersText, {color: "greenyellow"}]}>{incomesTotal}</Text>
        </View>
        <SectionList
          sections={events}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Event event={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <View style={{paddingTop: 10, paddingBottom: 4}}>
              <Text style={styles.eventDate}>{title}</Text>
            </View>
          )}
        />
			</View>
			
		</ScrollView>
	)
}

export default Statistic;
