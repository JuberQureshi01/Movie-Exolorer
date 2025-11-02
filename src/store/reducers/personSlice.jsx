import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  info: null,
  error: null, 
};

export const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    loadperson: (state, action) => {
      state.info = action.payload;
      state.error = null;
    },
    removeperson: (state) => {
      state.info = null;
      state.error = null;
    },
    setPersonError: (state, action) => {
      state.error = action.payload;
      state.info = null;
    },
  },
});

export const { loadperson, removeperson, setPersonError } = personSlice.actions;

export default personSlice.reducer;
