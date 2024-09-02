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
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    removeUser: (state) => {
      state.searchParams = null;
    },
    // Search 
    setSearchParams: (state, action) => {
      state.searchParams = action.payload;
    },
    clearSearchParams: (state) => {
      state.searchParams = null;
    },
  },
});

export const { setUser, removeUser, setSearchParams, clearSearchParams } = userSlice.actions;
export default userSlice;
