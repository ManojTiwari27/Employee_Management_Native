import {createSlice} from '@reduxjs/toolkit';

const leaveCountSlice = createSlice({
  name: 'leaveCount',
  initialState: {
    count: 0,
    hasCount: false,
  },
  reducers: {
    increment: state => {
      state.count += 1;
      state.hasCount = true;
    },
    setCount: (state, action) => {
      state.count = action.payload;
      state.hasCount = action.payload > 0;
    },
    reset: state => {
      state.count = 0;
      state.hasCount = false;
    },
  },
});

export const {increment, setCount, reset} = leaveCountSlice.actions;
export default leaveCountSlice.reducer;
