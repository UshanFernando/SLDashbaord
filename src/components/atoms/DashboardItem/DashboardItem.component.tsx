import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import IDashboardItem from './DashboardItem.interface';

const DashboardItem = ({
  colors,
  title,
  children,
  direction = 'horizontal',
  value,
}: IDashboardItem) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={colors}
      style={
        direction === 'horizontal'
          ? styles.background
          : styles.backgroundVertical
      }>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        {value && <Text style={styles.value}>{value}</Text>}
      </View>
      <View style={styles.children}>{children}</View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginTop: 16,
    marginHorizontal: 12,
    lineHeight: 26,
    fontFamily: Platform.select({ios: 'Avenir', android: 'sans-serif'}),
  },
  background: {
    // backgroundColor: 'red',
    height: 180,
    width: '95%',
    borderRadius: 18,
    marginTop: 8,
    elevation: 8,
    margin: 8,
    overflow: 'hidden',
  },
  backgroundVertical: {
    backgroundColor: 'red',
    height: 220,
    width: '45%',
    borderRadius: 18,
    marginTop: 8,
    elevation: 8,
    margin: 8,
    overflow: 'hidden',
  },
  children: {
    // marginBottom: 12,
    // backgroundColor: 'red',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 16,
    marginHorizontal: 10,
    fontFamily: Platform.select({ios: 'Avenir', android: 'sans-serif'}),
    lineHeight: 26,
  },
});

export {DashboardItem};
