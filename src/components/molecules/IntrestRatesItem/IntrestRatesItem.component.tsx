import {DashboardItem} from '@components/atoms';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const IntrestRatesItem = () => {
  return (
    <DashboardItem
      title="Interest Rates"
      colors={['#00ee6e', '#11d3f3']}
      direction="vertical">
      <View style={styles.wrapper}>
        <Text style={styles.numberText}>Deposit Rate</Text>
        <View style={styles.container}>
          <Text style={styles.valueText}>13%</Text>
          <Text style={styles.suffixText}>Per Year</Text>
        </View>
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.numberText}>Loan Rate</Text>
        <View style={styles.container}>
          <Text style={styles.valueText2}>14%</Text>
          <Text style={styles.suffixText}>Per Year</Text>
        </View>
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
    color: '#2979FF',
    paddingHorizontal: 4,
    marginLeft: 4,
  },
  valueText2: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00695C',
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

export {IntrestRatesItem};
