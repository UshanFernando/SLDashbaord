import React from 'react';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import IBankItem from './BankItem.interface';

const BankItem = ({
  colors,
  title,
  buyValue = '---',
  sellValue = '---',
  image,
}: IBankItem) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={colors}
      style={styles.background}>
      <View style={styles.titleContainer}>
        <Image source={image} style={styles.image} />
        <View style={styles.children}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.valueContainer}>
            <View style={styles.valueWrapper}>
              <Text style={styles.valueLabel}>Buy:</Text>
              <Text style={styles.value}>{buyValue} RS</Text>
            </View>
            <View style={styles.valueWrapper}>
              <Text style={styles.valueLabel}>Sell:</Text>
              <Text style={styles.value}>{sellValue} RS</Text>
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 12,
    marginLeft: 18,
    lineHeight: 26,
    fontFamily: Platform.select({ios: 'Avenir', android: 'sans-serif'}),
    color: 'black',
  },
  image: {
    width: 40,
    height: 40,
    marginLeft: 4,
    borderRadius: 40,
  },

  valueWrapper: {
    flexDirection: 'row',
    marginLeft: 18,
    gap: 4,
    alignItems: 'center',
  },

  valueContainer: {
    flexDirection: 'row',
    marginTop: -2,
  },

  valueLabel: {
    fontSize: 16,
    color: 'grey',
  },

  value: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 2,
    color: 'grey',
  },
  background: {
    // backgroundColor: 'red',
    height: 65,
    width: '95%',
    borderRadius: 22,
    elevation: 4,
    margin: 8,
    overflow: 'hidden',
    alignContent: 'center',
  },
  backgroundVertical: {
    height: 220,
    width: '45%',
    borderRadius: 18,
    marginTop: 8,
    elevation: 8,
    margin: 8,
    overflow: 'hidden',
  },
  children: {
    alignSelf: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    alignItems: 'center',
    height: '100%',
  },
});

export {BankItem};
