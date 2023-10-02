import {DashboardItem} from '@components/atoms';
import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {LineChartBicolor} from 'react-native-gifted-charts';

const GDPItem = () => {
  const customDataPoint = () => {
    return (
      <View
        style={{
          width: 15,
          height: 15,
          backgroundColor: 'white',
          borderWidth: 3,
          borderRadius: 10,
          borderColor: '#f44c7d',
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
  ];

  return (
    <DashboardItem
      title="Economic Growth"
      colors={['#ff0f7b', '#f89b29']}
      direction="vertical">
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <Text style={styles.numberText}>GDP</Text>
          <Text style={styles.valueText}>-11.5%</Text>
        </View>
      </View>
      <View style={styles.chartWrapper}>
        <LineChartBicolor
          data={data as any}
          isAnimated={true}
          curved
          width={Dimensions.get('window').width * 0.5}
          height={110}
          areaChart
          hideAxesAndRules
          startFillColor={'#fff95b'}
          endFillColor={'#fff95b'}
          startOpacity={0.4}
          endOpacity={0.2}
          spacing={62}
          color={'#fff95b'}
          rulesColor="#ffffff"
          // backgroundColor="#414141"
          // rulesType="dash"
          // rulesThickness={1}
          // horizontalRulesStyle={{borderColor: '#ffffff', opacity: 0.5}}
          thickness={2}
          dataPointsColor="#f44c7d"
          dataPointsRadius={6}
        />
      </View>
    </DashboardItem>
  );
};

const styles = StyleSheet.create({
  numberText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: 4,
    marginLeft: 4,
    marginTop: 2,
  },
  valueText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8711c1',
    paddingHorizontal: 4,
    marginLeft: 4,
    marginTop: -5,
  },

  chartStyle: {
    width: '45%',
    height: 110,
    marginTop: 8,
    backgroundColor: 'blue',
  },
  chartWrapper: {
    // backgroundColor: 'blue',
    marginLeft: -75,
  },
  valueText2: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f55a9b',
    paddingHorizontal: 4,
    marginLeft: 4,
  },
  suffixText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: 4,
    marginTop: 12,
  },
  container: {
    flexDirection: 'row',
  },
  wrapper: {
    marginTop: 8,
    paddingHorizontal: 12,
  },
});

export {GDPItem};
