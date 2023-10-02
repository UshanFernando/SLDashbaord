import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {loadMonthlyIndicative} from '@services/';
import ICBSLExchangeRatesData from '../../../services/ExchangeRates/ICBSLExchangeRatesData.interface';
import store, {RootState} from '../../store/store';

interface DataPoint {
  date: string;
  value: number;
}

interface IndicativeState {
  data: DataPoint[];
  loading: boolean;
  error: string | null;
  cache: {[currency: string]: DataPoint[]};
}

const initialState: IndicativeState = {
  data: [],
  loading: false,
  error: null,
  cache: {USD: []},
};

export const fetchIndicativeCBSL = createAsyncThunk<
  DataPoint[],
  string,
  {state: RootState}
>('indicative/loadIndicative', async (currency, {getState}) => {
  const state = getState();
  const cache = state.indicative.cache;
  const cacheKey = `${currency}-${new Date().toISOString().split('T')[0]}`;

  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  try {
    return await loadMonthlyIndicative(currency);
  } catch (error) {
    console.log('Error fetching from CBSL');
    console.log(error);
    throw error;
  }
});

const indicativeSlice = createSlice({
  name: 'indicative',
  initialState,
  reducers: {
    updateCache: (
      state,
      action: PayloadAction<{cacheKey: string; data: DataPoint[]}>,
    ) => {
      const {cacheKey, data} = action.payload;
      state.cache[cacheKey] = data;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchIndicativeCBSL.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchIndicativeCBSL.fulfilled,
        (state, action: PayloadAction<DataPoint[]>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(fetchIndicativeCBSL.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default indicativeSlice.reducer;
