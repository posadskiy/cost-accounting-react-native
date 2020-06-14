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

const Statistic = () => {
	const [refreshing, setRefreshing] = useState(false);
	const [events, setEvents] = useState([]);
  const user = useContext(UserContext);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);

		receiveEvents();

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
	
	const mapEvents = (events) => Object.keys(events).map((key, index) => {
    return {
      "title": createDateFromKey(key),
      "data": events[key],
    };
  })
    .reverse();

  const createDateFromKey = (key) => {
    return createTwoDigitsDateItem(+key) + "." + createTwoDigitsDateItem(new Date().getMonth()) + "." + createTwoDigitsDateItem(new Date().getFullYear());
  }
  
  const createTwoDigitsDateItem = (value) => {
    return value < 10 ? '0' + value : value;
  }

	useEffect(() => receiveEvents(), [events.length]);

  console.log(events);
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
				<Text style={styles.headersText}>Events</Text>
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
