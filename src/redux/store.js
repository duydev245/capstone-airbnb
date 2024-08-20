import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user.slice";

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.VITE_NODE_ENV === "doanxem",
});

export default store;
