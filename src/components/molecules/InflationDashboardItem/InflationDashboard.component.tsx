import {DashboardItem} from '@components/atoms';
import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {LineChartBicolor} from 'react-native-gifted-charts';

const InflationDashboardItem = () => {
  const customDataPoint = () => {
    return (
      <View
        style={{
          width: 15,
          height: 15,
          backgroundColor: 'white',
          borderWidth: 3,
          borderRadius: 10,
          borderColor: '#0072ff',
          bottom: -8,
        }}
      />
    );
  };
  const data = [
    {value: 20, customDataPoint: customDataPoint},
    {value: 80, customDataPoint: customDataPoint},
    {value: 90, customDataPoint: customDataPoint},
    {value: 70, customDataPoint: customDataPoint},
    {value: 70, customDataPoint: customDataPoint},
    {value: 40, customDataPoint: customDataPoint},
    {value: 50, customDataPoint: customDataPoint},
  ];

  return (
    <DashboardItem
      title="Inflation"
      value={'80%'}
      colors={['#0072ff', '#00c6ff']}>
      <View style={styles.chartStyle}>
        <LineChartBicolor
          data={data as any}
          isAnimated
          animationDuration={1200}
          curved
          width={Dimensions.get('window').width - 5}
          height={120}
          areaChart
          hideYAxisText
          startFillColor={'#ffffff'}
          endFillColor={'#ffffff'}
          startOpacity={0.4}
          endOpacity={0.1}
          spacing={80}
          color={'#ffffff'}
          rulesColor="#19b0ec"
          showVerticalLines
          verticalLinesHeight={120}
          verticalLinesColor="#42A5F5"
          verticalLinesUptoDataPoint
          rulesType="line"
          rulesThickness={1}
          horizontalRulesStyle={{borderColor: '#0072ff', opacity: 0.6}}
          thickness={3}
          dataPointsRadius={6}
          xAxisColor="transparent"
          yAxisColor="transparent"
        />
      </View>
    </DashboardItem>
  );
};

const styles = StyleSheet.create({
  chartStyle: {
    marginTop: 8,
    marginLeft: -75,
    // marginBottom: -10,
    // backgroundColor: 'red',
  },
});

export {InflationDashboardItem};
