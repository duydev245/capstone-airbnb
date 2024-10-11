import { createSlice } from '@reduxjs/toolkit';
import { getLocalStorage } from '../../utils';

const userLocalStorage = getLocalStorage('user');

const initialState = {
  currentUser: userLocalStorage,
  searchParams: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // User
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    removeUser: (state) => {
      state.currentUser = null;
    },
    // Search Params
    setSearchParams: (state, action) => {
      state.searchParams = action.payload;
    },
    clearGuestSearchParams: (state) => {
      if (state.searchParams) {
        state.searchParams.guest = '';
      }
    },
  },
});

export const { setUser, removeUser, setSearchParams, clearGuestSearchParams } = userSlice.actions;
export default userSlice;
