import React, {useContext, useState, useEffect} from 'react';

import {
  View,
  Text,
} from 'react-native';
import styles from "../../Styles";
import { LineChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import axios from "axios";
import {URL, url} from "../../common/URL";
import {UserContext} from "../login/Login";

const Chart = () => {
  const user = useContext(UserContext);
  const [statistics, setStatistics] = useState([]);
  const [amounts, setAmounts] = useState([]);
  const [limits, setLimits] = useState([]);
  const [todayLimits, setTodayLimits] = useState([]);
  const [categories, setCategories] = useState([]);

  const receiveCurrentMonthStatistics = () => {
    const body = JSON.stringify({
      userId: user.id,
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    });

    axios.post(url(URL.STATISTICS.month), body,
      {
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(result => mapStatistics(result.data))
      .catch(error => console.error(error));
  };
  
  const mapStatistics = (data) => {
    const amounts = [];
    const todayLimits = [];
    const limits = [];
    const resultCategories = [];
    const categories = data.purchaseCategories;
    const date = new Date();
    const daysInMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    Object.keys(categories).map(key => {
      const category = categories[key];
      amounts.push(category.amount);
      todayLimits.push(category.limit * (date.getDate() / daysInMonth));
      limits.push(category.limit);
      resultCategories.push(category.category.name);
    })
    
    setAmounts(amounts);
    setTodayLimits(todayLimits);
    setLimits(limits);
    setCategories(resultCategories);
  }

  useEffect(() => receiveCurrentMonthStatistics(), [statistics.length]);

  const data = [
    {
      data: amounts,
      svg: { stroke: 'lightgreen' },
    },
    {
      data: todayLimits,
      svg: { stroke: 'yellow' },
    },
    {
      data: limits,
      svg: { stroke: 'red' },
    }
  ];
  
  const xData = data[0].data;

  const axesSvg = { fontSize: 16, fill: 'black' };
  const verticalContentInset = { top: 10, bottom: 10 }
  const xAxisHeight = 30

  console.log(categories);
  return (
    <>
    <View style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
      <Text style={[styles.generalText, {color: 'lightgreen'}]}>Current spent</Text>
      <Text style={[styles.generalText, {color: 'yellow'}]}>Limit on today</Text>
      <Text style={[styles.generalText, {color: 'red'}]}>Month limit</Text>
    </View>
    <View style={{ height: 300, padding: 20, flexDirection: 'row' }}>
      <YAxis
        data={xData}
        style={{ marginBottom: xAxisHeight }}
        contentInset={verticalContentInset}
        svg={{ fontSize: 14, fill: 'white' }}
      />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <LineChart
          style={{ height: 200 }}
          data={data}
          gridMin={0}
          contentInset={{ top: 10, bottom: 10 }}
          svg={{ stroke: 'rgb(134, 65, 244)' }}
        >
          <Grid svg={{stroke: "white", opacity: 0.2}} />
        </LineChart>
        <XAxis
          style={{ marginHorizontal: -10 }}
          data={xData}
          formatLabel={(value, index) => categories[index]}
          contentInset={{ left: 10, right: 10 }}
          svg={{ fontSize: 14, fill: 'white' }}
        />
      </View>
    </View>
  </>
  )
}

export default Chart;
