import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ConfigState {
  theme: 'dark' | 'light';
}

const initialState: ConfigState = {
  theme: 'dark',
};

const indicativeSlice = createSlice({
  name: 'indicative',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ConfigState['theme']>) => {
      state.theme = action.payload;
    },
  },
});

export default indicativeSlice.reducer;
