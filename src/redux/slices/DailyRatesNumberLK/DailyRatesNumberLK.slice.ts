import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import IExchangeRateNumberLK from '../../../services/NumbersLK/INumbersLK.interface';
import {fetchLocalExchangeRates} from '@services/NumbersLK/numbers.service';

interface DailyLocalRatesState {
  data: IExchangeRateNumberLK[];
  loading: boolean;
  error: string | null;
}

const initialState: DailyLocalRatesState = {
  data: [],
  loading: false,
  error: null,
};

interface ILocalRatesFetch {
  currency: string;
  date: Date;
}

export const fetchExchangeRatesDaily = createAsyncThunk<
  IExchangeRateNumberLK[],
  ILocalRatesFetch
>('localRates/loadDaily', async data => {
  try {
    return await fetchLocalExchangeRates(data.currency, data.date);
  } catch (error) {
    console.log('Error fetching from NumbersLK');
    console.log(error);
    throw error;
  }
});

const localRatesSlice = createSlice({
  name: 'localRates',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchExchangeRatesDaily.pending, state => {
        console.log('fetching');
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchExchangeRatesDaily.fulfilled,
        (state, action: PayloadAction<IExchangeRateNumberLK[]>) => {
          console.log('fetching DOne');
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(fetchExchangeRatesDaily.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
        state.data = [];
        console.log('fetching Rejected');
      });
  },
});

export default localRatesSlice.reducer;
