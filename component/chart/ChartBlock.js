import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import styles from "../../Styles";
import {Grid, LineChart, XAxis, YAxis} from 'react-native-svg-charts';
import {UserContext} from "../login/Login";
import {getData, verticalContentInset, xAxisHeight} from './const/chartConfig'
import useReceiveCurrentMonthStatistics from "./hook/useReceiveCurrentMonthStatistics";
import mapPurchaseStatistics from "./mapper/mapPurchaseStatistics";

const ChartBlock = () => {
  const user = useContext(UserContext);

  const currentMonthStatistics = useReceiveCurrentMonthStatistics(user.id, new Date().getMonth() + 1, new Date().getFullYear());
  const [amounts, todayLimits, limits, categories] = mapPurchaseStatistics(currentMonthStatistics);

  const data = getData(amounts, todayLimits, limits);
  const xData = data[0].data;
  return (
    <>
      <View style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
        <Text style={[styles.generalText, {color: 'lightgreen'}]}>Current spent</Text>
        <Text style={[styles.generalText, {color: 'yellow'}]}>Limit on today</Text>
        <Text style={[styles.generalText, {color: 'red'}]}>Month limit</Text>
      </View>
      <View style={{height: 300, padding: 20, flexDirection: 'row'}}>
        <YAxis
          data={xData}
          style={{marginBottom: xAxisHeight}}
          contentInset={verticalContentInset}
          svg={{fontSize: 14, fill: 'white'}}
        />
        <View style={{flex: 1, marginLeft: 10}}>
          <LineChart
            style={{height: 200}}
            data={data}
            gridMin={0}
            contentInset={{top: 10, bottom: 10}}
            svg={{stroke: 'rgb(134, 65, 244)'}}
          >
            <Grid svg={{stroke: "white", opacity: 0.2}}/>
          </LineChart>
          <XAxis
            style={{marginHorizontal: -10}}
            data={xData}
            formatLabel={(value, index) => categories[index]}
            contentInset={{left: 10, right: 10}}
            svg={{fontSize: 14, fill: 'white'}}
          />
        </View>
      </View>
    </>
  )
}

export default ChartBlock;
