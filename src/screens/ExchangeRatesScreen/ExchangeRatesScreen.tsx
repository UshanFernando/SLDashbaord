import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {LineGraph} from 'react-native-graph';
import {Dimensions} from 'react-native';
import {hapticFeedback} from '@utils/HapticFeedback';
import SmoothPicker from 'react-native-smooth-picker';
import {BankItem} from '@components/atoms';
import {AppDispatch, RootState} from '../../redux/store/store';
import {useDispatch, useSelector} from 'react-redux';
import {fetchIndicativeCBSL} from '../../redux/slices';
import {fetchExchangeRatesDaily} from '../../redux/slices/DailyRatesNumberLK/DailyRatesNumberLK.slice';
import {getBankData} from './logic/bankMap';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const LineGraphMemoized = React.memo(LineGraph);

const ExchangeRatesScreen = () => {
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState(new Date());
  const [currency, setCurrency] = useState<{id: string; label: string}>({
    id: 'USD',
    label: 'USD 🇺🇸',
  });

  const dispatch: AppDispatch = useDispatch();
  const {data: dataReal} = useSelector((state: RootState) => state.indicative);

  const {data: localRates, loading} = useSelector(
    (state: RootState) => state.localRates,
  );

  useEffect(() => {
    dispatch(fetchIndicativeCBSL(currency.id));
  }, [dispatch, currency.id]);

  useEffect(() => {
    console.log('loading local ', date);
    dispatch(fetchExchangeRatesDaily({currency: currency.id, date: date}));
  }, [dispatch, currency.id, date]);

  useEffect(() => {
    if (dataReal) {
      console.log('dataReal', dataReal);
      const value =
        Math.round(
          (dataReal?.[dataReal.length - 1]?.value + Number.EPSILON) * 100,
        ) / 100;
      setPrice(value);
    }
  }, [dataReal]);

  const formattedData = useMemo(
    () =>
      dataReal?.map?.(item => ({
        date: new Date(item.date),
        value: item?.value,
      })),
    [dataReal],
  );

  const resetTitle = useCallback(() => {
    console.log('reset called');
    const value =
      Math.round(
        (dataReal?.[dataReal.length - 1]?.value + Number.EPSILON) * 100,
      ) / 100;
    if (value !== price) {
      setPrice(value);
      setDate(new Date());
    }
  }, [dataReal, price]);

  const updateTitle = useCallback(
    ({value, date}: {value: number; date: Date}) => {
      console.log('update called');

      setPrice(Math.round((value + Number.EPSILON) * 100) / 100);
      setDate(date);
    },
    [],
  );

  return (
    <SafeAreaView>
      <GestureHandlerRootView style={{backgroundColor: 'white'}}>
        <View style={styles.background}>
          <Text style={styles.title}>Exchange Rates</Text>
          <Text style={styles.date}>{date.toDateString()}</Text>
          {/* <View style={{height: 300, width: 400}}> */}

          <View style={[styles.chart]}>
            <View style={styles.infoBox}>
              <Text style={styles.price}>{currency.label}</Text>
              <Text style={styles.titleCurrency}>{price} Rs</Text>
            </View>
            {formattedData?.length > 0 ? (
              <LineGraphMemoized
                points={formattedData}
                lineThickness={6}
                color="#29B6F6"
                animated={true}
                enablePanGesture={true}
                indicatorPulsating
                style={{flex: 1, paddingRight: 4}}
                enableIndicator
                panGestureDelay={0}
                gradientFillColors={['#29B6F6', 'rgba(0, 230, 118, 0.1)']}
                // enableFadeInMask
                onGestureStart={() => hapticFeedback('impactLight')}
                onPointSelected={updateTitle}
                onGestureEnd={resetTitle}
                // onTouchEnd={resetTitle}
              />
            ) : (
              <Text>Loading...</Text>
            )}
          </View>
          <View style={styles.currencyPickerWrapper}>
            <SmoothPicker
              data={[
                {id: 'AUD', label: 'AUD 🇦🇺'},
                {id: 'CAD', label: 'CAD 🇨🇦'},
                {id: 'EUR', label: 'EUR 🇪🇺'},
                {id: 'USD', label: 'USD 🇺🇸'},
                {id: 'GBP', label: 'GBP 🏴󠁧󠁢󠁥󠁮󠁧󠁿'},
                {id: 'INR', label: 'INR 🇮🇳'},
                {id: 'JPY', label: 'JPY 🇯🇵'},
                {id: 'KRW', label: 'KRW 🇰🇷'},
                {id: 'NZD', label: 'NZD 🇳🇿'},
                {id: 'RUB', label: 'RUB 🇷🇺'},
              ]}
              keyExtractor={item => `${item.id}-list`}
              initialScrollToIndex={3}
              magnet
              scrollAnimation
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              onSelected={({item}) => setCurrency(item)}
              renderItem={({item}) => (
                <Text
                  style={{
                    width: 80,
                    height: 20,
                    fontSize: 18,
                    color: currency.id === item.id ? '#212121' : '#616161',
                    fontWeight: currency.id === item.id ? '600' : '400',
                    // marginHorizontal: 4,
                  }}>
                  {item.id}
                </Text>
              )}
              horizontal
            />
          </View>
          <View
            style={{
              height: Dimensions.get('window').height - 350,
              // backgroundColor: 'grey',
            }}>
            <FlatList
              data={localRates}
              contentContainerStyle={{paddingBottom: 120}}
              refreshing={true}
              renderItem={({item: e}) => {
                return (
                  <BankItem
                    key={e.bank}
                    title={getBankData(e.bank).name}
                    colors={getBankData(e.bank).colorCodes}
                    buyValue={parseFloat(e.buying_currency).toFixed(2)}
                    sellValue={parseFloat(e.selling_currency).toFixed(2)}
                    image={getBankData(e.bank).logo}
                  />
                );
              }}
              // eslint-disable-next-line react/no-unstable-nested-components
              ListEmptyComponent={() => {
                if (loading) {
                  return <ActivityIndicator size={'large'} />;
                }
                return (
                  <View
                    style={{
                      alignContent: 'center',
                      alignItems: 'center',
                      marginTop: 20,
                    }}>
                    <Text>Data not available</Text>
                  </View>
                );
              }}
            />
          </View>
        </View>

        {/* </View> */}
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export {ExchangeRatesScreen};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#ffffff',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    marginHorizontal: 12,
    marginTop: 10,
    color: 'black',
  },
  chart: {
    width: Dimensions.get('window').width + 10,
    height: 250,
    marginLeft: -10,
  },
  date: {
    fontSize: 15,
    marginLeft: 12,
    marginTop: 2,
    color: 'black',
  },
  titleCurrency: {
    fontSize: 32,
    color: 'black',
    marginLeft: 9,
  },
  price: {
    fontSize: 22,
    color: 'black',
    marginLeft: 9,
  },
  infoBox: {
    marginLeft: 12,
    marginTop: 10,
  },
  currencyPickerWrapper: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: 'white',
  },
});
