import { createSlice } from '@reduxjs/toolkit';
import { getLocalStorage } from '../../utils';

const userLocalStorage = getLocalStorage('user');

const initialState = {
  currentUser: userLocalStorage,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    removeUser: (state) => {
      state.currentUser = null;
    }
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice;
