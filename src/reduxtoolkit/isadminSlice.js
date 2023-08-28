import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isAdmin: null,
};

const isadminSlice = createSlice({
  name: 'isadmin',
  initialState,
  reducers: {
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
  },
});

export const {setIsAdmin} = isadminSlice.actions;
export default isadminSlice.reducer;
