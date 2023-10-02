import {DashboardItem} from '@components/atoms';
import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';
import {useDispatch, useSelector} from 'react-redux';
import {fetchIndicativeCBSL} from '../../../redux/slices';
import {AppDispatch, RootState} from '../../../redux/store/store';

const ExchangeRatesItem = () => {
  const dispatch: AppDispatch = useDispatch();
  const data = useSelector((state: RootState) => state.indicative.data);
  const loading = useSelector((state: RootState) => state.indicative.loading);
  // const error = useSelector((state: RootState) => state.indicative.error);

  useEffect(() => {
    dispatch(fetchIndicativeCBSL('USD'));
  }, [dispatch]);

  const customDataPoint = () => {
    return (
      <View
        style={{
          width: 10,
          height: 10,
          backgroundColor: 'white',
          borderWidth: 2,
          borderRadius: 10,
          borderColor: '#8364e8',
          bottom: -8,
        }}
      />
    );
  };
  // const data = [
  //   {value: 20, customDataPoint: customDataPoint},
  //   {value: 80, customDataPoint: customDataPoint},
  //   {value: 90, customDataPoint: customDataPoint},
  //   {value: 70, customDataPoint: customDataPoint},
  //   {value: 70, customDataPoint: customDataPoint},
  //   {value: 40, customDataPoint: customDataPoint},
  //   {value: 50, customDataPoint: customDataPoint},
  // ];

  const getAverage = () => {
    let sum = 0;
    data.map((item: any) => {
      sum += item.value;
    });
    return sum / data.length - 50;
  };

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <DashboardItem
      title="Exchange Rates"
      value={
        data.length > 0 ? `${data[data.length - 1].value.toFixed()} Rs` : 'N/A'
      }
      colors={['#696eff', '#f8acff']}>
      <Text style={styles.titleText}>USD to LKR</Text>
      <View style={styles.chartStyle}>
        {data.length > 0 ? (
          <LineChart
            data={[
              ...(data.map(item => {
                return {
                  value: item.value,
                  customDataPoint: customDataPoint,
                  label: item.date,
                  // labelComponent: ,
                };
              }) as any),
            ]}
            isAnimated
            animationDuration={1200}
            curved
            width={Dimensions.get('window').width - 10}
            height={110}
            areaChart
            // hideYAxisText
            startFillColor={'#ffffff'}
            endFillColor={'#ffffff'}
            startOpacity={0.4}
            endOpacity={0.1}
            spacing={Dimensions.get('window').width / 23}
            // noOfSections={6}
            // maxValue={200}
            yAxisColor="white"
            yAxisThickness={0}
            color={'#ffffff'}
            rulesColor="rgba(255, 255, 255, 0.3)"
            showVerticalLines
            verticalLinesHeight={120}
            verticalLinesColor="rgba(255, 255, 255, 0.3)"
            verticalLinesUptoDataPoint
            rulesThickness={1}
            thickness={3}
            dataPointsRadius={6}
            xAxisColor="transparent"
            yAxisTextStyle={{color: 'white'}}
            adjustToWidth
            hideDataPoints
            noOfSections={4}
            yAxisSide="right"
            yAxisOffset={getAverage()}
          
            yAxisLabelWidth={24}
            disableScroll
            pointerConfig={{
              pointerStripUptoDataPoint: false,
              pointerStripColor: 'lightgray',
              pointerStripWidth: 2,
              strokeDashArray: [2, 5],
              pointerColor: 'lightgray',
              radius: 4,
              pointerLabelWidth: 100,
              pointerLabelHeight: 20,
              autoAdjustPointerLabelPosition: true,
              pointerLabelComponent: (items: any) => {
                return (
                  <View
                    style={{
                      height: 60,
                      width: 100,
                      backgroundColor: '#282C3E',
                      borderRadius: 4,
                      justifyContent: 'center',
                      paddingLeft: 16,
                      // top: -50,
                    }}>
                    <Text style={{color: 'lightgray', fontSize: 12}}>
                      {items[0]?.label}
                    </Text>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>
                      {(items[0]?.value + getAverage()).toFixed(2)}
                    </Text>
                  </View>
                );
              },
            }}
          />
        ) : (
          <Text>No Data</Text>
        )}
      </View>
    </DashboardItem>
  );
};

const styles = StyleSheet.create({
  chartStyle: {
    marginTop: 2,
    marginLeft: -75,
    // marginBottom: -10,
    // backgroundColor: 'red',
  },
  titleText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 0,
  },
});

export {ExchangeRatesItem};
