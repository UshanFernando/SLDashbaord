import {configureStore} from '@reduxjs/toolkit';
import indicativeReducer from '../slices/ExchangeRatesCBSL/ExchangeRatesCBSL.slice';
import localRatesReducer from '../slices/DailyRatesNumberLK/DailyRatesNumberLK.slice';

const store = configureStore({
  reducer: {
    indicative: indicativeReducer,
    localRates: localRatesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
