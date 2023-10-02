import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  ExchangeRatesItem,
  GDPItem,
  InflationDashboardItem,
  IntrestRatesItem,
} from '@components/molecules';

const Dashboard = ({navigation}: any) => {
  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.backgroundStyle}>
        <Text style={styles.title}>Dashboard</Text>
        <InflationDashboardItem />
        <View style={{flexDirection: 'row'}}>
          <IntrestRatesItem />
          <GDPItem />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ExchangeScreen');
          }}>
          <ExchangeRatesItem />
        </TouchableOpacity>
        <View style={{height: 100}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
  },
  backgroundStyle: {
    backgroundColor: '#212121',
    padding: 8,
    height: Dimensions.get('window').height,
    paddingBottom: 12,
  },
  chartStyle: {
    marginTop: 8,
  },
});
