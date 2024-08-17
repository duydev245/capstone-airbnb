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
    setUser: (state, { payload }) => {
      state.currentUser = payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice;
